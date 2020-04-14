declare
  nextid number(11);
  sqltext varchar2(2000);
begin
  select "integervalue" into nextid from "ent_systemproperties" where "name" = 'NextID';
  sqltext:= 'create sequence "suid" INCREMENT BY 1 START WITH '|| nextid || ' ORDER NOCYCLE NOCACHE';
  DBMS_OUTPUT.PUT_LINE (sqltext );
  EXECUTE IMMEDIATE sqltext;
end;