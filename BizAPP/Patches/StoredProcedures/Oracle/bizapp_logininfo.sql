create or replace
FUNCTION BIZAPP_LOGININFO_V2
(
	  loginid VARCHAR2,
	  iplow NUMBER,
	  iphigh NUMBER,
	  macid VARCHAR2,
	  tid NUMBER
)
RETURN SYS_REFCURSOR
IS
  RESULTSCURSOR SYS_REFCURSOR;
BEGIN
	
  OPEN RESULTSCURSOR FOR
  
 SELECT "u1"."uniqueid" "useruid",
		"u1"."hashedpassword",
		"u1"."salt",
		"u1"."loginid",
		"u1"."user_networkaccesskey",
		"u1"."user_accesskeyvalidity",
		"u1"."user_generatedaccesskey",
		"u1"."user_issuperuser",
		"u1"."enablemfa",
		coalesce("u1"."user_passwordchangedon", "u1"."lastmodifiedon") "passwordchangedon",
		"u1"."uniqueid",
		"user_failedattempts" "attemptsmade",
		"user_currency",
		"r1"."uniqueid" "roleuid",
		"r1"."path",
		"r1"."objecttemplate",
		"u1"."active",
		"u1"."tid",
		"s1"."name" "site",
		"c0"."companypro_name" "company",
		"c0"."active" "companyactive",
		"r1"."role_defaultapplication" "defaultapplication",
		"u1"."loginmode",
		(
			case when ((iplow is not null) OR (macid is not null)) then
			(
				select count(*) from "trustedne1" t1
			left outer join "user" "u2"
			on "u2"."uniqueid" = t1."trustednet_requestedb1"
		where
			"u2"."uniqueid" = "u1"."uniqueid" and "u2"."tid" = "u1"."tid" and
			( t1."trustednet_active" IS NULL OR t1."trustednet_active" = 1 )
			AND ( "u2"."tid" is null or t1."tid" = "u2"."tid" )
			AND ( t1."trustednet_allow" IS NULL OR t1."trustednet_allow" != 0 )
			AND ( t1."trustednet_deny" IS NULL OR t1."trustednet_deny" != 1 )
			AND ( macid IS NOT NULL OR iplow IS NOT NULL OR iphigh is NOT NULL )
			AND( 
			  ( 
				(			
					( t1."allowallusers" = 1 )
					OR ( t1."trustednet_requestedb1" = "u2"."uniqueid" )
				)
				AND
				(
					( 
					  t1."trustednet_maci1" IS NOT NULL
					  AND t1."trustednet_maci1" = macid 
					  AND
					  (
						((t1."trustednet_startipaddres1" IS NULL AND t1."trustednet_endipaddresslo" IS NULL ) OR (iplow BETWEEN t1."trustednet_startipaddres1" AND t1."trustednet_endipaddresslo"))
						AND ((t1."trustednet_startipaddres2" IS NULL AND t1."trustednet_endipaddresshi" IS NULL ) OR ( iphigh BETWEEN t1."trustednet_startipaddres2" AND t1."trustednet_endipaddresshi"))
					  )
					)
					OR 
					( 
					  t1."trustednet_maci1" IS NULL
					  AND
					  (
						((t1."trustednet_startipaddres1" IS NULL AND t1."trustednet_endipaddresslo" IS NULL ) OR (iplow BETWEEN t1."trustednet_startipaddres1" AND t1."trustednet_endipaddresslo"))
						AND ((t1."trustednet_startipaddres2" IS NULL AND t1."trustednet_endipaddresshi" IS NULL ) OR ( iphigh BETWEEN t1."trustednet_startipaddres2" AND t1."trustednet_endipaddresshi"))
					  )
					)
				)
			  ) )
			)
			else 1 end
		) "istrustednetwork",
		"u1"."preferredlocale"
		FROM "user" "u1"
		INNER JOIN "r_role_user" "r2" on "u1"."uniqueid" = "r2"."child" and "r2"."relationship" = 'Role.User'  and "r2"."tid" = "u1"."tid"
		INNER JOIN "role" "r1" ON "r2"."parent" = "r1"."uniqueid" and "r1"."tid" = "u1"."tid"
		INNER JOIN "r_site_user" "r3" on "r3"."parent" = "u1"."uniqueid" and "r3"."tid" = "u1"."tid"
		INNER JOIN "site" "s1" on "s1"."uniqueid" = "r3"."child" and "s1"."tid" = "u1"."tid"
		LEFT OUTER JOIN "r_companypro_user" "r0" ON ("r0"."parent" = "u1"."uniqueid" AND "r0"."relationship" = 'Company.Members' and "r0"."tid" = "u1"."tid")  
		LEFT OUTER JOIN "companypro" "c0" ON ("r0"."child" = "c0"."uniqueid" and "c0"."tid" = "u1"."tid")
		WHERE (NLS_UPPER("u1"."loginid") = NLS_UPPER(loginid) or NLS_UPPER("u1"."uniqueid") = NLS_UPPER(loginid)) and "u1"."tid" = tid;
		
	return RESULTSCURSOR;
END;