create or replace FUNCTION PARENTROLE( roleid IN VARCHAR2, tid NUMBER ) 
RETURN VARCHAR2 
IS pid VARCHAR2(100);
BEGIN
 	SELECT r2."uniqueid" 
  INTO pid 
  from "role" r1
  inner join "r_role_role" rr on rr."child" = r1."uniqueid" and rr."tid" = tid
	inner join "role" r2 on r2."uniqueid" = rr."parent" and r2."tid" = tid
	where r1."uniqueid" = roleid and r1."tid" = tid;
	return( pid );
END PARENTROLE;
