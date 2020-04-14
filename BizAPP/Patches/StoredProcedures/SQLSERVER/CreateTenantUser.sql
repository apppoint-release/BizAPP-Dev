CREATE PROCEDURE CreateTenantUser
	@baseTenantId int,
	@tid int,
	@adminUserId nvarchar(50),
	@externalUserId nvarchar(50),
	@loginId nvarchar(50),
	@email nvarchar(1024),
	@firstName nvarchar(100),
	@lastname nvarchar(100),
	@designation nvarchar(50),
	@defaultAppId nvarchar(50),
	@defaultMobileAppId nvarchar(50),
	@siteId nvarchar(50),
	@organization nvarchar(300),
	@oAuthProviderName nvarchar(100),
	@oAuthUserId nvarchar(100),
	@oAuthUserName nvarchar(100),
	@copycompany bit = 1,
	@interactiveuser bit = 1,
	@setupAutoExecForPassword bit = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @roleId nvarchar(50), @companyId nvarchar(50), @deptId nvarchar(50),@message nvarchar(max)

	--get siteid
	if @siteId is null
	begin
		select top 1 @siteId = uniqueid from [site] where ismaster=1 and tid=@baseTenantId
		if @siteId is null
		begin
			set @message = 'Could not find a master site record for the base tenant';
			RAISERROR (@message,16,1) 
		end
	end
	-- create user
	print 'Creating new user record'
	select * into #tempuser from [user] where uniqueid=@adminUserId and tid=@baseTenantId
	update #tempuser set tid=@tid,loginid=@loginId,firstname=isnull(@firstName,@email),displayname=@email,lastname=@lastname,
		middlename=null,fullname=@firstname + (case when @lastname is null then '' else ' ' +@lastname end),emailid = @email,designation=@designation, externalidentity=@externalUserId,
		loginmode=(case when @interactiveuser=1 then 'I' else 'N' end),
		user_currency=isnull((select value from ent_systemproperties where name='enterprisecurrency' and tid=@baseTenantId),'USD'),
		createdon=getutcdate(),lastmodifiedon=getutcdate(),photoid=null

	insert into [user] select * from #tempuser
	drop table #tempuser

	-- copy employee profile
	select * into #tempprofile from [employeeprofile] where tid = @baseTenantId and us29 = @adminUserId
	update #tempprofile set tid = @tid
	insert into [employeeprofile] select * from #tempprofile
	drop table #tempprofile

	-- copy user and role relationships.
	print 'copying user and role relationships'
	select @roleId = parent from r_role_user where child = @adminUserId and tid = @baseTenantId and relationship = 'Role.User'

	insert into r_role_user(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
	select parent,parenttypeid,@adminUserId,childtypeid,relationship,[order],anchorversion,@tid from r_role_user
	where child = @adminUserId and tid = @baseTenantId and relationship = 'Role.User'

	-- copy role.
	print 'copying role record'
	select * into #temprole from [role] where uniqueid = @roleId and tid=@baseTenantId
	update #temprole set role_defaultapplication = @defaultAppId,defaultmobileapplication=@defaultMobileAppId,tid=@tid,displayname=@email,shortname=@email,objectdescription=@email
	insert into [role] select * from #temprole
	drop table #temprole

	--copy department
	select @deptId = child from r_departmen1_user where parent = @adminUserId and tid = @baseTenantId and relationship = 'User.Department'

	if @deptId is not null 
	begin
		print 'copying department'
		select * into #tempdepartment from [departmen1] where uniqueid = @deptId and tid=@baseTenantId
		update #tempdepartment set tid = @tid
		insert into [departmen1] select * from #tempdepartment
		drop table #tempdepartment	
	end

	-- copy role and responsibilities relationship.
	print 'copying role and responsibility relationships'
	insert into r_responsibi_role(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
	select parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,@tid from
	r_responsibi_role where parent = @roleId and tid = @baseTenantId

	-- copy role and role template relationships.
	print 'copying role and role template relationships'
	insert into r_objecttemp_role(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
	select parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,@tid from
	r_objecttemp_role where parent = @roleId and tid = @baseTenantId

	-- copy user and site relationships
	print 'copying user and site relationships'
	insert into r_site_user(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
	select parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,@tid from
	r_site_user where parent = @adminUserId and child = @siteId and tid = @baseTenantId and relationship = N'User.Location'

	-- copy user and department relationships
	print 'copying user and department relationships'
	if @deptId is not null
	begin
		insert into r_departmen1_user(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
		select parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,@tid from
		r_departmen1_user where parent = @adminUserId and tid = @baseTenantId and relationship = 'User.Department'
	end

	-- copy user and company relationships
	print 'copying user and company relationships'
	select @companyId = child from r_companypro_user where parent = @adminUserId and tid = @baseTenantId and relationship = 'Company.Members'

	insert into r_companypro_user(parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,tid)
	select parent,parenttypeid,child,childtypeid,relationship,[order],anchorversion,@tid from
	r_companypro_user where parent = @adminUserId and tid = @baseTenantId and relationship = 'Company.Members'

	-- copy company
	if @copycompany = 1
	begin
		print 'copy company record'
		select * into #tempcompany from [companypro] where uniqueid=@companyId and tid=@baseTenantId
		update #tempcompany set tid=@tid,companypro_name=@organization,displayname=@organization,companypro_description=@organization,
			objectdescription=@organization,enterpriseid=@organization,companypro_fax=null,olduniqueid=null,
			companypro_address=null,companypro_city=null,companypro_geostate=null,companypro_phone=null,companypro_zipcode=null,
			createdon=getutcdate(),lastmodifiedon=getutcdate(),cod2 = null
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
		values(@externalId,@externalId,'System5085',0,@tid,'Started','uid_admin','uid_adminrole','uid_admin',GETUTCDATE(),GETUTCDATE(),@oAuthUserName,@oAuthUserId,
		@oAuthProviderName,@adminUserId)
	end
	-- setup bizapp oauth.
	if @externalUserId is not null
	begin
		set @externalId = replace(newid(),'-','')
		insert into extcred(uniqueid,enterpriseid,objecttype,version,tid,state,createdby,ownerrole,lastmodifiedby,createdon,lastmodifiedon,providerusername,
		provideruserid,providername,use3,displayname)
		values(@externalId,@externalId,'System5085',0,@tid,'Started','uid_admin','uid_adminrole','uid_admin',GETUTCDATE(),GETUTCDATE(),@externalUserId,@externalUserId,
		'BizAPP',@adminUserId,'BizAPP')
	end
	-- setup auto exec for password change
	if @setupAutoExecForPassword = 1
	begin
		declare @autoExecId nvarchar(36) = replace(newid(),'-',''), @autoExecName nvarchar(100) = 'Change password for - ' + @adminUserId
		insert into autoexec( uniqueid,enterpriseid,objecttype,version,tid,state,createdby,ownerrole,lastmodifiedby,createdon,lastmodifiedon, nam4,
		targetuser,processde1,contex2,contex2_t,isblocking)
		values(@autoExecId,@autoExecId,'ESystema69f2',0,@tid,'Started', 'uid_admin','uid_adminrole','uid_admin',GETUTCDATE(),GETUTCDATE(),
		@autoExecName,@adminUserId,'ESystema73c3',@adminUserId,'UID_User',1)
	end
	print 'create tenant user ended'
END