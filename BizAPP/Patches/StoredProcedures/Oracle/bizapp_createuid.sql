create or replace
FUNCTION bizapp_createuid
(
	numberofids NUMBER,
	propertyname VARCHAR2,
	tid NUMBER
)
RETURN NUMBER
IS
  idresult NUMBER;
  sql_block VARCHAR2(1024);
    -- since we are performing ddl actions, it needs to be on its own transaction
  pragma autonomous_transaction;
BEGIN
  if numberofids > 1 then
    sql_block := 'alter sequence "suid" increment by ' || to_char( numberofids );
    execute immediate (sql_block);
    execute immediate 'select "suid".nextval from dual' into idresult;
    execute immediate 'alter sequence "suid" increment by 1';
    idresult := idresult - numberofids + 1;
  else
   select "suid".nextval into idresult from dual;
  end if;
   RETURN idresult;
END;
