CREATE PROCEDURE CreateNonTenantUser
	@newTenantId int,
	@userId nvarchar(50),
	@externalUserId nvarchar(50),
	@loginId nvarchar(50),
	@firstname nvarchar(100),
	@lastname nvarchar(100),
	@email nvarchar(1024),
	@designation nvarchar(50),
	@phone nvarchar(50),
	@defaultAppId nvarchar(50),
	@defaultMobileAppId nvarchar(50),
	@organization nvarchar(300),
	@superuser bit = 0,
	@interactiveuser bit = 1,
	@oAuthProviderName nvarchar(100),
	@oAuthUserId nvarchar(100),
	@oAuthUserName nvarchar(100),
	@useNewUserAsExternalUser bit = 0,
	@setupAutoExecForPassword bit = 0,
	@newadminId nvarchar(50) output,
	@newUser bit output
AS
BEGIN
	declare @error nvarchar(max)
	if @userId is null
	begin
		set @error = 'User id is mandatory to clone an existing user'
		raiserror(@error,16,1)
		return
	end
	-- check if reference user exists.
	if not exists( select 1 from [user] where uniqueid = @userId and tid=@newTenantId )
	begin
		set @error = 'Reference user does not exist'
		raiserror(@error,16,1)
		return
	end
	select @newadminId = uniqueid from [user] where emailid = @email and tid=@newTenantId
	if @newadminId is not null
	begin
		print 'user already exists'
		set @newUser = 0
		--set @error = 'User with the email id already exists'
		--raiserror(@error,16,1)
		return
	end
	set @newUser = 1
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
	SET NOCOUNT ON;
	DECLARE @roleId nvarchar(50), @companyId nvarchar(50), @deptId nvarchar(50),
			@newroleId nvarchar(50), @newcompanyId nvarchar(50), @newdeptId nvarchar(50),
			@newprofileId nvarchar(50), @copycompany bit = 0,
			@siteId nvarchar(50)

	select top 1 @siteId = uniqueid from [site] where ismaster=1 and tid=@newTenantId
	BEGIN TRANSACTION
	BEGIN TRY

	-- create user
	print 'Creating new user record'
	set @newadminId = replace( newid(), '-', '' )
	set @newroleId = replace( newid(), '-', '' )
	select * into #tempuser from [user] where uniqueid=@userId and tid=@newTenantId
	update #tempuser set uniqueid=@newadminId,enterpriseid=@newadminId,loginid=@loginId,firstname=@firstname,displayname=@email,
	lastname=@lastname,middlename=null,fullname=@firstname + (case when @lastname is null then '' else ' ' +@lastname end),emailid = @email,designation=@designation,user_issuperuser=@superuser,
	user_mobile=@phone,tid=@newTenantId,createdon=getutcdate(),lastmodifiedon=getutcdate(),active=1, ownerrole = @newroleId, externalidentity=@externalUserId, photoid = null,
	loginmode = (case when @interactiveuser = 1 then 'I' else 'N' end),
	user_currency=isnull((select value from ent_systemproperties where name='enterprisecurrency' and tid=@newTenantId),'USD')
	,trackingsid=null
	insert into [user] select * from #tempuser
	drop table #tempuser

	-- copy employee profile
	if exists(select 1 from information_schema.tables where table_name = 'employeeprofile')
	begin
		set @newprofileId = replace( newid(), '-', '' )
		select * into #tempprofile from [employeeprofile] where us29 = @userId and tid=@newTenantId
		update #tempprofile set us29 = @newadminId,uniqueid = @newprofileId,enterpriseid=@newprofileId,tid=@newTenantId,trackingsid=null
		insert into [employeeprofile] select * from #tempprofile
		drop table #tempprofile
	end

	-- copy user and role relationships.
	print 'copying user and role relationships'
	select @roleId = parent from r_role_user where child = @userId and relationship = 'Role.User' and tid=@newTenantId

	insert into r_role_user(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
	select @newroleId,parenttypeid,@newadminId,childtypeid,relationship,[order],anchorversion,@newTenantId from r_role_user
	where child = @userId and relationship = 'Role.User' and tid=@newTenantId
	  
	-- copy role.
	print 'copying role record'
	select * into #temprole from [role] where uniqueid = @roleId and tid=@newTenantId
	update #temprole set role_defaultapplication = @defaultAppId,defaultmobileapplication=@defaultMobileAppId,displayname=@email,
		shortname=@email,objectdescription=@email,uniqueid=@newroleId,enterpriseid=@newroleId,tid=@newTenantId,haschildroles=0,[path]='/' + @newroleId +'/',
		createdon=getutcdate(),lastmodifiedon=getutcdate(),trackingsid=null
	insert into [role] select * from #temprole
	drop table #temprole

	--copy department
	set @newdeptId = replace( newid(), '-', '' )
	select @deptId = child from r_departmen1_user where parent = @userId and relationship = 'User.Department' and tid=@newTenantId

	if @deptId is not null 
	begin
		print 'copying department'
		select * into #tempdepartment from [departmen1] where uniqueid = @deptId and tid=@newTenantId
		update #tempdepartment set uniqueid=@newdeptId,enterpriseid=@newdeptId,tid=@newTenantId,createdon=getutcdate(),lastmodifiedon=getutcdate(),trackingsid=null
		insert into [departmen1] select * from #tempdepartment
		drop table #tempdepartment	
	end

	-- copy role and responsibilities relationship.
	print 'copying role and responsibility relationships'
	insert into r_responsibi_role(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
	select @newroleId,parenttypeid,child,childtypeid,relationship,[order],anchorversion,@newTenantId from
	r_responsibi_role where parent = @roleId and tid=@newTenantId

	-- copy role and role template relationships.
	print 'copying role and role template relationships'
	insert into r_objecttemp_role(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
	select @newroleId,parenttypeid,child,childtypeid,relationship,[order],anchorversion,@newTenantId from
	r_objecttemp_role where parent = @roleId and tid=@newTenantId

	-- copy user and site relationships
	print 'copying user and site relationships'
	insert into r_site_user(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
	select @newadminId,parenttypeid,child,childtypeid,relationship,[order],anchorversion,@newTenantId from
	r_site_user where parent = @userId and child = @siteId and relationship = N'User.Location' and tid=@newTenantId

	-- copy user and department relationships
	print 'copying user and department relationships'
	if @deptId is not null
	begin
		insert into r_departmen1_user(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
		select @newadminId,parenttypeid,child,childtypeid,relationship,[order],anchorversion,@newTenantId from
		r_departmen1_user where parent = @userId and relationship = 'User.Department' and tid=@newTenantId
	end

	-- copy user and company relationships
	-- check if the organization is null
	if @organization is null
	begin
		--if @newTenantId > -1
		--begin
			-- get the organization from the current tenant.
		--	select @newcompanyId = child from r_companypro_user where parent = @userId and relationship = 'Company.Members' and tid=@newTenantId
		--end
		set @copycompany = 0
	end
	else
	begin
		print 'copying user and company relationships'
		-- check if the company with the same name already exists.
		select @companyId = uniqueid from companypro where companypro_name = @organization and tid=@newTenantId
		set @newcompanyId = @companyId
		if @companyId is null
		begin
			set @newcompanyId = replace( newid(), '-', '' )
			select @companyId = child from r_companypro_user where parent = @userId and relationship = 'Company.Members' and tid=@newTenantId
			set @copycompany = 1
		end

		insert into r_companypro_user(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
		select @newadminId,parenttypeid,@newcompanyId,childtypeid,relationship,[order],anchorversion,@newTenantId from
		r_companypro_user where parent = @userId and relationship = 'Company.Members' and tid=@newTenantId
	end

	-- copy company
	if @copycompany = 1
	begin
		print 'copy company record'
		select * into #tempcompany from [companypro] where uniqueid=@companyId and tid=@newTenantId
		update #tempcompany set uniqueid=@newcompanyId,enterpriseid=@newcompanyId,companypro_name=@organization,displayname=@organization,companypro_description=@organization,
			objectdescription=@organization,companypro_fax=null,olduniqueid=null,
			companypro_address=null,companypro_city=null,companypro_geostate=null,companypro_phone=null,companypro_zipcode=null,tid=@newTenantId,
			createdon=getutcdate(),lastmodifiedon=getutcdate(),cod2 = null,trackingsid=null
		insert into [companypro] select * from #tempcompany
		drop table #tempcompany
	end

	declare @externalId nvarchar(36)
	-- setup oauth.. create a new external credential record, if it does not exist.
	if @oAuthProviderName is not null and @oAuthUserId is not null and @oAuthUserName is not null
	begin
		set @externalId = replace(newid(),'-','')
		insert into extcred(uniqueid,enterpriseid,objecttype,version,tid,state,createdby,ownerrole,lastmodifiedby,createdon,lastmodifiedon,providerusername,
		provideruserid,providername,use3)
		values(@externalId,@externalId,'System5085',0,@newTenantId,'Started','uid_admin','uid_adminrole','uid_admin',GETUTCDATE(),GETUTCDATE(),@oAuthUserName,@oAuthUserId,
		@oAuthProviderName,@newadminId)
	end
	-- setup bizapp oauth.
	if @externalUserId is null and @useNewUserAsExternalUser = 1
		set @externalUserId = @newadminId -- to handle apphub use cases
		
	if @externalUserId is not null
	begin
		set @externalId = replace(newid(),'-','')
		insert into extcred(uniqueid,enterpriseid,objecttype,version,tid,state,createdby,ownerrole,lastmodifiedby,createdon,lastmodifiedon,providerusername,
		provideruserid,providername,use3,displayname)
		values(@externalId,@externalId,'System5085',0,@newTenantId,'Started','uid_admin','uid_adminrole','uid_admin',GETUTCDATE(),GETUTCDATE(),@externalUserId,@externalUserId,
		'BizAPP',@newadminId,'BizAPP')
	end
	-- setup auto exec for password change
	if @setupAutoExecForPassword = 1
	begin
		declare @autoExecId nvarchar(36) = replace(newid(),'-',''), @autoExecName nvarchar(100) = 'Change password for - ' + @newadminId
		insert into autoexec( uniqueid,enterpriseid,objecttype,version,tid,state,createdby,ownerrole,lastmodifiedby,createdon,lastmodifiedon, nam4,
		targetuser,processde1,contex2,contex2_t,isblocking)
		values(@autoExecId,@autoExecId,'ESystema69f2',0,@newTenantId,'Started','uid_admin','uid_adminrole','uid_admin',GETUTCDATE(),GETUTCDATE(),
		@autoExecName,@newadminId,'ESystema73c3',@newadminId,'UID_User',1)
	end
	COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		SET @error = ERROR_MESSAGE()
		ROLLBACK TRANSACTION
		RAISERROR (@error,16,1 )
		RETURN
	END CATCH
	print 'create user ended'
END