create or replace
FUNCTION TRACEEXISTS2
( id1 IN NVARCHAR2
, id1Type IN NVARCHAR2
, id2 IN NVARCHAR2
, id2Type IN NVARCHAR2
, id1IsFrom IN NUMBER
, maxLevel IN NUMBER
, relationship IN NVARCHAR2
, traceName IN NVARCHAR2
, tid NUMBER
) RETURN NUMBER IS
  result NUMBER;
BEGIN
  result := 0;
  execute immediate 'SELECT 1 FROM TABLE( GETTRACES2( :id1, :id1Type, :id1IsFrom, :maxLevel, :relationship, :traceName, :tid ) ) t1 WHERE ( :id1IsFrom = 1 and ( t1.toid = :id2 and t1.totype = :id2Type ) ) or (:id1IsFrom = 0 AND ( t1.fromid = :id2 AND t1.fromtype = :id2Type ))' into result
  using id1, id1type, id1IsFrom,maxLevel,relationship,traceName,tid,id1IsFrom,id2, id2Type,id1IsFrom,id2, id2Type;
  RETURN result;
END TRACEEXISTS2;
