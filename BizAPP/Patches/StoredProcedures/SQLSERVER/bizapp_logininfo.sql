CREATE PROCEDURE bizapp_logininfo_v2
	@loginid nvarchar(50), 
	@iplow bigint,
	@iphigh bigint,
	@macid nvarchar(MAX),
	@tid int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
		u.hashedpassword as hashedpassword,
		c0.[companypro_name] as 'company',
		c0.active as 'companyactive',
		(
		case when (@iplow IS NOT NULL) OR (@macid IS NOT NULL) then 
			(
				SELECT COUNT(*) FROM trustedne1 as t1
				left outer join [user] as u2
				on u2.uniqueid = t1.trustednet_requestedb1
			WHERE 
				u2.uniqueid = u1.uniqueid and u2.tid = u1.tid and
				( trustednet_active IS NULL OR trustednet_active = 1 )
				AND ( t1.tid = u2.tid )
				AND ( trustednet_allow IS NULL OR trustednet_allow != 0 )
				AND ( trustednet_deny IS NULL OR trustednet_deny != 1 )
				AND ( @macid IS NOT NULL OR @iplow IS NOT NULL OR @iphigh is NOT NULL )
				AND
				( 
				  ( 
					(	
						( allowallusers = 1 )
						OR ( trustednet_requestedb1 = u2.uniqueid )
					)
					AND
					(
						( 
						  trustednet_maci1 IS NOT NULL
						  AND trustednet_maci1 = @macid 
						  AND
						  (
							((trustednet_startipaddres1 IS NULL AND trustednet_endipaddresslo IS NULL ) OR (@iplow BETWEEN trustednet_startipaddres1 AND trustednet_endipaddresslo))
							AND ((trustednet_startipaddres2 IS NULL AND trustednet_endipaddresshi IS NULL ) OR ( @iphigh BETWEEN trustednet_startipaddres2 AND trustednet_endipaddresshi))
						  )
						)
						OR ( 
						  trustednet_maci1 IS NULL
						  AND
						  (
							((trustednet_startipaddres1 IS NULL AND trustednet_endipaddresslo IS NULL ) OR (@iplow BETWEEN trustednet_startipaddres1 AND trustednet_endipaddresslo))
							AND ((trustednet_startipaddres2 IS NULL AND trustednet_endipaddresshi IS NULL ) OR ( @iphigh BETWEEN trustednet_startipaddres2 AND trustednet_endipaddresshi))
						  )
						)
					)
				  )
				)
			)
		else 1 end
		) as istrustednetwork,
		[u1].*
		FROM dbo.IVW_bizapp_logininfo u1 with (NOEXPAND)
		inner join [user] u on u.tid = u1.tid and u.uniqueid = u1.uniqueid
		LEFT OUTER JOIN [r_companypro_user] AS [r0] ON ([r0].[parent] = [u1].[uniqueid] AND [r0].[relationship] = N'Company.Members' and r0.tid = u1.tid)  
		LEFT OUTER JOIN [companypro] AS [c0] ON ([r0].[child] = [c0].[uniqueid] and c0.tid = u1.tid)
		WHERE ([u1].[loginid] = @loginid or [u1].[uniqueid] = @loginid) and [u1].tid = @tid
END