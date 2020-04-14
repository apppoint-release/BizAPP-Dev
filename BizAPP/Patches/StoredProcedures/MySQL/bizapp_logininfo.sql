-- --------------------------------------------------------------------------------
-- Routine DDL
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `bizapp_logininfo`( loginid varchar(50), iplow bigint,iphigh bigint, macid varchar(1024), tid int)
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	declare rule varchar(20);
	declare trustednetwork int;
	declare tempvar varchar(20);
		
	-- set the default to -1, when no rule is allowed.
	set rule = 'password policy';

	-- Trusted check not enabled
	SET trustednetwork = 1;
	IF ( (iplow IS NOT NULL) OR (macid IS NOT NULL)) THEN
		SET trustednetwork = ( 
			SELECT COUNT(*) FROM `trustedne1` as `t1`
				left outer join `user` as `u1`
				on `u1`.`loginid` = loginid and `u1`.`uniqueid` = `t1`.`trustednet_requestedb1`
			WHERE 
				( `trustednet_active` IS NULL OR `trustednet_active` = 1 )
				AND ( `u1`.`tid` is null or `u1`.`tid` = `t1`.`tid` )
				AND ( `trustednet_allow` IS NULL OR `trustednet_allow` != 0 )
				AND ( `trustednet_deny` IS NULL OR `trustednet_deny` != 1 )
				AND ( macid IS NOT NULL OR iplow IS NOT NULL OR iphigh is NOT NULL )
				AND
				( 
				  ( 
					(	
						( `allowallusers` = 1 )
						OR ( `trustednet_requestedb1` = `u1`.`uniqueid` )
					)
					AND
					(
						( 
						  `trustednet_maci1` IS NOT NULL
						  AND `trustednet_maci1` = macid 
						  AND
						  (
							((`trustednet_startipaddres1` IS NULL AND `trustednet_endipaddresslo` IS NULL ) OR (iplow BETWEEN `trustednet_startipaddres1` AND `trustednet_endipaddresslo`))
							AND ((`trustednet_startipaddres2` IS NULL AND `trustednet_endipaddresshi` IS NULL ) OR (iphigh BETWEEN `trustednet_startipaddres2` AND `trustednet_endipaddresshi`))
						  )
						)
						OR ( 
						  `trustednet_maci1` IS NULL
						  AND
						  (
							((`trustednet_startipaddres1` IS NULL AND `trustednet_endipaddresslo` IS NULL ) OR (iplow BETWEEN `trustednet_startipaddres1` AND `trustednet_endipaddresslo`))
							AND ((`trustednet_startipaddres2` IS NULL AND `trustednet_endipaddresshi` IS NULL ) OR (iphigh BETWEEN `trustednet_startipaddres2` AND `trustednet_endipaddresshi`))
						  )
						)
					)
				  )
				)
			);
	END IF;
		
	-- select user query
	select
	t.useruid,
	t.salt,	
	t.hashedpassword,
	t.loginid,
	t.user_networkaccesskey,
	t.user_accesskeyvalidity,
	t.user_generatedaccesskey,
	t.user_issuperuser,
	t.enablemfa,
	t.tid,
	(
		CASE WHEN t.numattempts = -1 OR t.user_issuperuser = 1 THEN 1
		ELSE
				t.numattempts -
				(
					 select count( audittrail_result ) from sessionaud where 
					`user` = t.uniqueid and audittrail_auditoperation = 1 and tid = t.tid
					and audittrail_result = 0 and audittrail_audittimestamp between (CURDATE() - (t.unlockduration/60.0/24.0)) and CURDATE()
				)
		END 
	) as 'allowed',
	(	
		CASE WHEN t.user_issuperuser = 1 THEN 0
		WHEN t.expiryinterval <> -1 THEN 
			coalesce((t.expiryinterval - datediff(coalesce(t.`user_passwordchangedon`,t.`lastmodifiedon`), CURDATE() ) ),0)
		ELSE 0 
		END
	) as 'expiryinterval',
	t.unlockduration,
	t.istrustednetwork,
	t.attemptsmade,
	t.user_currency,
	t.roleuid,
	t.`path`,
	t.objecttemplate,
	t.`active`,
	t.`site`,
	t.company,
	t.defaultapplication
	from
	(
	SELECT `u1`.`uniqueid` AS `useruid`,
		`u1`.`hashedpassword`,
		`u1`.`salt`,
		`u1`.`loginid`,
		`u1`.`user_networkaccesskey`,
		`u1`.`user_accesskeyvalidity`,
		`u1`.`user_generatedaccesskey`,
		`u1`.`user_issuperuser`,
		`u1`.user_passwordchangedon,
		`u1`.lastmodifiedon,
		`u1`.uniqueid,
		-- calculate number of successful attempts left using audit entries.
		( select cast( ifnull( p.parameter_sharedvalue, '-1' ) as UNSIGNED ) from `rule` r
		inner join parameter p on p.`rule` = r.uniqueid
		where p.parameter_name = 'max login retries' and r.rule_nam1 = @rule
		and p.tid = `u1`.`tid`
		and ( r.rule_enabled = 1 or r.rule_enabled is null ) ) as 'numattempts',
		(	
			select cast( ifnull( p.parameter_sharedvalue, '-1' ) as UNSIGNED ) from `rule` r
			inner join parameter p on p.`rule` = r.uniqueid
			where p.parameter_name = 'maximum password age' and r.rule_nam1 = @rule
			and p.tid = `u1`.`tid`
			and ( r.rule_enabled = 1 or r.rule_enabled is null )
		) as `expiryinterval`,
		(select cast( ifnull( p.parameter_sharedvalue, '-1' ) as UNSIGNED ) from `rule` r
		inner join parameter p on p.`rule` = r.uniqueid
		where p.parameter_name = 'Auto unlock duration in minutes' and r.rule_nam1 = @rule
		and p.tid = `u1`.`tid`
		and ( r.rule_enabled = 1 or r.rule_enabled is null ) ) AS unlockduration,
		@trustednetwork AS `istrustednetwork`,
		`user_failedattempts` as `attemptsmade`,
		`user_currency`,
		`r1`.`uniqueid` AS `roleuid`,
		`r1`.`path`,
		`r1`.`objecttemplate`,
		`u1`.`active`,
		`u1`.`tid`,
		`s1`.`name` AS `site`,
		`c0`.`companypro_name` as `company`,
		`r1`.`role_defaultapplication` as `defaultapplication`
		FROM `user` AS `u1`
		INNER JOIN `r_role_user` AS `r2` on `u1`.`uniqueid` = `r2`.`child` and `r2`.`relationship` = 'Role.User'  and `r2`.tid = `u1`.`tid`
		INNER JOIN `role` as r1 ON `r2`.`parent` = `r1`.`uniqueid` and `r1`.tid = `u1`.`tid`
		inner join `r_site_user` as r3 on r3.parent = u1.uniqueid and r3.tid = `u1`.tid
		inner join `site` as s1 on s1.uniqueid = r3.child and s1.tid = `u1`.tid
		INNER JOIN `r_companypro_user` AS `r0` ON (`r0`.`parent` = `u1`.`uniqueid` AND `r0`.`relationship` = 'Company.Members' and `r0`.`tid` = `u1`.`tid`)  
		INNER JOIN `companypro` AS `c0` ON (`r0`.`child` = `c0`.`uniqueid` and `c0`.`tid` = `u1`.`tid`)
		WHERE (`u1`.`loginid` = loginid or `u1`.`uniqueid` = loginid)
		) t;
  END
