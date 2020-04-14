create or replace FUNCTION BIZAPP_ASMINFO
RETURN SYS_REFCURSOR
IS
 RESULTSCURSOR SYS_REFCURSOR;
BEGIN

  DBMS_OUTPUT.PUT_LINE( 'Executing BIZAPP_ASMINFO_F...' );

  OPEN RESULTSCURSOR FOR
    SELECT a1."uniqueid", a1."object_name" "objecttype", a1."uniqueid" "objecttypeid", a1."extends", a1."hierarchy", a1."references", a1."defaultview", a1."defaultform", a1."quickcreateform", a1."defaultquery" from "assembly_info" a1;
  RETURN RESULTSCURSOR;
END;
