create or replace function bizapp_gettraces 
(
  idvalue VARCHAR2,
  idtype VARCHAR2,
  idisfrom INTEGER,
  tid INTEGER
)
RETURN SYS_REFCURSOR
IS
 RESULTSCURSOR SYS_REFCURSOR;
begin
  
   DBMS_OUTPUT.PUT_LINE( 'Executing bizapp_gettraces...' );

  IF ( idisfrom = 1 ) THEN
  BEGIN
    OPEN RESULTSCURSOR FOR
      SELECT "from", "fromtype", "to", "totype", level, "issuspicious"
        FROM "ent_traces" "troot"
        START WITH "troot"."from" = idvalue and "troot"."fromtype" = idtype and "troot"."tid" = tid
        CONNECT BY PRIOR "troot"."to" = "from" and "troot"."totype" = "fromtype"
        order by level;
  END;
  ELSE
    OPEN RESULTSCURSOR FOR
      SELECT "from", "fromtype", "to", "totype", level, "issuspicious"
        FROM "ent_traces" "troot"
        START WITH "troot"."to" = idvalue and "troot"."totype" = idtype and "troot"."tid" = tid
        CONNECT BY PRIOR "troot"."from" = "to" and "troot"."fromtype" = "totype"
        order by level;
  END IF;
  return RESULTSCURSOR;
  
end bizapp_gettraces;