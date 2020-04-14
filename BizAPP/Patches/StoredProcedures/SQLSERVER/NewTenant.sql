CREATE PROCEDURE NewShardedTenant
	@tid int,
	@siteid nvarchar(50),
	@adminUserId nvarchar(50),
	@externalUserId nvarchar(50),
	@loginId nvarchar(50),
	@email nvarchar(1024),
	@firstName nvarchar(100),
	@lastName nvarchar(100),
	@designation nvarchar(50),
	@defaultAppId nvarchar(50),
	@defaultMobileAppId nvarchar(50),
	@organization nvarchar(300),
	@websiteurl nvarchar(1024),
	@oAuthProviderName nvarchar(100),
	@oAuthUserId nvarchar(100),
	@oAuthUserName nvarchar(100),
	@setupAutoExecForPassword bit = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @error int = 1, @severity int = 16, @message nvarchar(max), 	
			@baseTenantId int = -1,
			@siteName nvarchar(50),
			@serviceuserLoginId nvarchar(50),
			@serviceuserUniqueId nvarchar(50)

	BEGIN TRANSACTION

	BEGIN TRY
		-- insert into tenant row as local copy.
		if @siteId is null
		begin
			select top 1 @siteId = uniqueid from [site] where ismaster=1 and tid=@baseTenantId
			if @siteId is null
			begin
				set @message = 'Could not find a master site record for the base tenant';
				RAISERROR (@message,16,1) 
			end
		end
		-- copy location/site details.
		print 'Getting site information'
		select @siteName = name, @serviceuserLoginId = site_serviceuserusername from [site] 
		where uniqueid = @siteid and tid = @baseTenantId
		
		print 'service user name:' + @serviceuserLoginId

		if @serviceuserLoginId is null or @serviceuserLoginId = ''
			begin
				set @message = 'Service user loginid is not specified in the site record';
				RAISERROR (@message,@severity,@error) 
			end

		-- copy site record
		print 'copying site record'
		select * into #tempsite from [site] where tid = @baseTenantId and uniqueid = @siteid
		update #tempsite set name=@siteName,displayname=@siteName,tid=@tid
		insert into [site] select * from #tempsite
		drop table #tempsite

		-- create tenant admin user
		print 'copying admin user for tenant'
		exec CreateTenantUser @baseTenantId, @tid,@adminUserId,@externalUserId,@email,@email,@firstName,@lastName,@designation,@defaultAppId,@defaultMobileAppId, @siteid,@organization,@oAuthProviderName,@oAuthUserId,@oAuthUserName, 1,1,@setupAutoExecForPassword

		-- copy service user when service user and admin user are different.
		select @serviceuserUniqueId = uniqueid from [user] where tid = @baseTenantId and loginid = @serviceuserLoginId
		if @serviceuserUniqueId <> @adminUserId
		begin
			print 'copying service user record'
			-- don't copy the company again.
			exec CreateTenantUser @baseTenantId, @tid,@serviceuserUniqueId,null,@serviceuserLoginId,@serviceuserLoginId,'serviceuser',null,@designation,@defaultAppId,@defaultMobileAppId, @siteid,@organization,null,null,null,0,0,0
		end

		-- copy system properties.
		print 'copying system properties'
		select * into #systemprops from ent_systemproperties where tid = @baseTenantId
		update #systemprops set tid = @tid
		update #systemprops set value = @siteName where name = 'SiteName'
		update #systemprops set integervalue = 0 where name = 'NextID'
		insert into ent_systemproperties select * from #systemprops
		drop table #systemprops

		-- copy idegenerator record.
		print 'copying idgenerator record'
		select * into #tempidgenerato from idgenerato where tid = @baseTenantId
		update #tempidgenerato set tid = @tid, idgenerato_incrementvalue = 0, idgenerato_lastvalue = null
		insert into idgenerato select * from #tempidgenerato
		drop table #tempidgenerato

		-- copy parameter records
		print 'copying host company name parameter'
		select p.* into #tempparameter from parameter p inner join [rule] r on r.uniqueid = p.[rule]
		where p.tid = @baseTenantId and p.parameter_name = 'name' and r.rule_nam1 = 'HostCompany'
		update #tempparameter set tid = @tid, parameter_sharedvalue = @organization
		insert into [parameter] select * from #tempparameter
		drop table #tempparameter

		-- setup websiteurl.
		if @websiteurl is not null and @websiteurl <> ''
		begin
			select p.* into #tempparameter2 from parameter p inner join [rule] r on r.uniqueid = p.[rule]
			where p.tid = @baseTenantId and p.parameter_name in ( 'Intranet', 'Internet' ) and r.rule_nam1 = 'WebsiteUrl'
			update #tempparameter2 set tid = @tid, parameter_sharedvalue = @websiteurl
			insert into [parameter] select * from #tempparameter2
			drop table #tempparameter2
		end

		-- WE ARE DONE. COMMIT.
		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		SET @message = ERROR_MESSAGE()
		set @error = ERROR_STATE()
		set @severity = ERROR_SEVERITY()
		ROLLBACK TRANSACTION
		RAISERROR (@message,@severity,@error )
	END CATCH
END