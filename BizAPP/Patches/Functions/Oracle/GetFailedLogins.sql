create or replace
FUNCTION GETFAILEDLOGINS
(
      allowedAttempts number,
      unlockDuration number,
      userId varchar2,
      tid number
)
RETURN NUMBER IS
  total NUMBER;
BEGIN
  
    select count( "audittrail_result" ) into total from "sessionaud" where 
    "user" = userId and "audittrail_auditoperation" = 1 and "tid" = tid
    and "audittrail_result" = 0 and "audittrail_audittimestamp" between 
    to_date((SYS_EXTRACT_UTC(systimestamp) - (unlockduration/60/24)),'YYYY-mm-dd HH24:MI:SS') and to_date(SYS_EXTRACT_UTC(systimestamp),'YYYY-mm-dd HH24:MI:SS');
  
    return allowedAttempts - total;
  RETURN total;
END GETFAILEDLOGINS;