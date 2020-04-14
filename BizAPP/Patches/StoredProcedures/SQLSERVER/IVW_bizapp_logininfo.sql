CREATE VIEW IVW_bizapp_logininfo WITH SCHEMABINDING
AS
SELECT [u1].[uniqueid] AS "useruid",
		[u1].emailid,
		[u1].[salt],
		[u1].[loginid],
		[u1].[user_networkaccesskey],
		[u1].[user_accesskeyvalidity],
		[u1].[user_generatedaccesskey],
		[u1].[user_issuperuser],
		[u1].[enablemfa],
		coalesce([u1].user_passwordchangedon,[u1].lastmodifiedon) as passwordchangedon,
		[u1].uniqueid,
		user_failedattempts as "attemptsmade",
		"user_currency",
		[r1].[uniqueid] AS "roleuid",
		[r1].[path],
		[r1].[objecttemplate],
		[u1].[active],
		[u1].tid,
		[s1].name as 'site',
		r1.role_defaultapplication as 'defaultapplication',
		[u1].loginmode,
		[u1].preferredlocale
		FROM dbo.[user] AS "u1"
		INNER JOIN dbo.[r_role_user] AS "r2" on [u1].[uniqueid] = [r2].[child] and [r2].[relationship] = 'Role.User'  and [r2].tid = [u1].tid
		INNER JOIN dbo.[role] as r1 ON [r2].[parent] = [r1].[uniqueid] and [r1].tid = [u1].tid
		inner join dbo.[r_site_user] as r3 on r3.parent = u1.uniqueid and r3.relationship = 'User.Location' and r3.tid = u1.tid
		inner join dbo.[site] as s1 on s1.uniqueid = r3.child and s1.tid = u1.tid
GO
CREATE UNIQUE CLUSTERED INDEX IDX_bizapp_logininfo
	ON [dbo].IVW_bizapp_logininfo(tid,loginid,uniqueid)