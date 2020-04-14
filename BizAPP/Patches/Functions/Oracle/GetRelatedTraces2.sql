create or replace
FUNCTION GETRELATEDTRACES2
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
  idIsFromReverse number;
  TYPE traceCursor is REF CURSOR;
  tc traceCursor;
  l_index number;
  type t2 is record
  (
    traceindex NUMBER(19),
    tracename nvarchar2(50),
    fromid  nvarchar2(50),
    fromtype  nvarchar2(50),
    fromrelated nvarchar2(50),
    fromcomment nvarchar2(250),
    toid nvarchar2(50),
    totype nvarchar2(50),
    tocomment nvarchar2(250),
    createdby nvarchar2(50),
    createdon timestamp,
    lvl int,
    path nvarchar2(2000)
  );
  l_t2 t2;
BEGIN
  DBMS_OUTPUT.PUT_LINE( 'Executing GetRelatedTraces2...' );
  idIsFromReverse := ( case when idIsFrom = 1 then 0 else 1 end );
 
  DBMS_OUTPUT.PUT_LINE( 'Reverse ' || idisfromreverse );
  OPEN tc FOR 'SELECT documentsreadbyusers.traceindex, documentsreadbyusers.tracename,documentsreadbyusers.fromid,
  documentsreadbyusers.fromtype, documentsreadbyusers.fromrelated, documentsreadbyusers.fromcomment,
  documentsreadbyusers.toid, documentsreadbyusers.totype, documentsreadbyusers.tocomment,
  documentsreadbyusers.createdby, current_timestamp createdon, documentsreadbyusers.lvl, documentsreadbyusers.path
  FROM TABLE( GETTRACES2(:idvalue, :idType, :idIsFrom, :maxLevel, :relationship, :traceName, :tid) ) userswhoread
  CROSS JOIN TABLE( GETTRACES2(userswhoread.fromid, userswhoread.fromtype, :idIsFromReverse, :maxLevel, :relationship, :traceName, :tid) ) documentsreadbyusers'
  USING idvalue,idType,idIsFrom,maxLevel,relationship,traceName,tid,idIsFromReverse,maxLevel,relationship,traceName,tid;
  
  l_traces := t_traces2();
  LOOP
    FETCH tc into l_t2;
    EXIT WHEN tc%NOTFOUND;
    l_traces.extend;
    l_index := l_traces.count;
    l_traces(l_index):= traces2(l_t2.traceindex,l_t2.tracename,l_t2.fromid,l_t2.fromtype,l_t2.fromrelated,l_t2.fromcomment,l_t2.toid,l_t2.totype,l_t2.tocomment,l_t2.createdby,l_t2.createdon,l_t2.lvl,l_t2.path);
  END LOOP;
  RETURN l_traces;
END;
