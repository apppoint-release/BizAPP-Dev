create or replace
FUNCTION GETTRACES2
( 
  idvalue IN NVARCHAR2
, idType IN NVARCHAR2
, idIsFrom IN NUMBER
, maxLevel IN NUMBER
, relationship IN NVARCHAR2
, traceName IN NVARCHAR2
, tid NUMBER
) 
RETURN t_traces2
IS
  l_traces t_traces2;
  l_index number;
  pragma autonomous_transaction;
BEGIN
  DBMS_OUTPUT.PUT_LINE( 'Executing bizapp_gettraces2...' );
  --alter session set '_optimizer_connect_by_cost_based'=false;
  l_traces := t_traces2();
  IF ( idIsFrom = 1 ) THEN
  BEGIN
    FOR i IN (
      SELECT tanchor."traceindex", tanchor."tracename", tanchor."from", tanchor."fromtype", tanchor."fromrelated", tanchor."fromcomment", tanchor."to", 
      tanchor."totype", tanchor."tocomment", tanchor."createdby", tanchor."createdon", level "level"
      , '/' || connect_by_root (tanchor."from" || ':' || tanchor."fromtype") || sys_connect_by_path( tanchor."to" || ':' || tanchor."totype", '/' ) "path"
			FROM "ent_traces" tanchor
      where tanchor."tid" = tid and ( traceName IS NULL OR traceName = '' OR tanchor."tracename" = traceName ) and
      ( maxLevel IS NULL OR level < maxLevel) and (relationship IS NULL OR relationship = '' OR tanchor."fromrelated" = relationship)
			START WITH tanchor."from" = idvalue AND tanchor."fromtype" = idType and tanchor."tid" = tid
      CONNECT BY NOCYCLE tanchor."from" = PRIOR tanchor."to")
    LOOP
      l_traces.extend;
      l_index := l_traces.count;
      l_traces(l_index):= traces2(i."traceindex",i."tracename",i."from",i."fromtype",i."fromrelated",i."fromcomment",i."to",i."totype",i."tocomment",i."createdby",i."createdon",i."level",i."path");
    END LOOP;
  END;
  ELSIF ( idIsFrom = 0 ) THEN
  BEGIN
     DBMS_OUTPUT.PUT_LINE( 'Executing bizapp_gettraces using to id...' );
      FOR i IN (
      SELECT tanchor."traceindex", tanchor."tracename", tanchor."from", tanchor."fromtype", tanchor."fromrelated", tanchor."fromcomment", tanchor."to", 
      tanchor."totype", tanchor."tocomment", tanchor."createdby", tanchor."createdon", level "level"
      , '/' || connect_by_root (tanchor."to" || ':' || tanchor."totype") || sys_connect_by_path( tanchor."from" || ':' || tanchor."fromtype", '/' ) "path"
			FROM "ent_traces" tanchor
      where tanchor."tid" = tid and ( traceName IS NULL OR traceName = '' OR tanchor."tracename" = traceName ) and
      ( maxLevel IS NULL OR level < maxLevel) and (relationship IS NULL OR relationship = '' OR tanchor."fromrelated" = relationship)
			START WITH tanchor."to" = idvalue AND tanchor."totype" = idType and tanchor."tid" = tid
      CONNECT BY NOCYCLE tanchor."to" = PRIOR tanchor."from")
      LOOP
        l_traces.extend;
        l_index := l_traces.count;
        l_traces(l_index):= traces2(i."traceindex",i."tracename",i."from",i."fromtype",i."fromrelated",i."fromcomment",i."to",i."totype",i."tocomment",i."createdby",i."createdon",i."level",i."path");
      END LOOP;
  END;
  ELSIF ( idIsFrom < 0 or idIsFrom > 1 ) THEN
  begin
    DBMS_OUTPUT.PUT_LINE( 'idIsFrom < 0 or > 1' );
    -- Throw an exception
    raise_application_error( -20001, 'idIsFrom must either be 0 or 1.Other values are unsupported' );
  END;
  END IF;
  return l_traces;
END GETTRACES2;
