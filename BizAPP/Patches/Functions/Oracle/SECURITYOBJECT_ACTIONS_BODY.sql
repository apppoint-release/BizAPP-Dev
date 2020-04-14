create or replace
PACKAGE BODY SECURITYOBJECT_ACTIONS AS

FUNCTION getscontext
  (
        userid nvarchar2,
        sourcecid nvarchar2,
        roleName nvarchar2,
        maxLevel number,
        tid number
  ) RETURN t_array is 
      ctxType t_array := t_array();
      usrid nvarchar2(50);
      srcid nvarchar2(50);
      rname nvarchar2(50);
      maxlvl number;
  BEGIN
    DBMS_OUTPUT.PUT_LINE( 'Executing SECURITYOBJECT_ACTIONS...' );
    
    usrid := (case when userid = '' then null else userid end);
    srcid := (case when sourcecid = '' then null else sourcecid end);
    rname := (case when roleName = '' then null else roleName end);
    maxlvl := (case when maxLevel = -1 then null else maxLevel end);
    
   for i in(
    SELECT distinct tanchor."conte43" "ctx"
    FROM "securityob" tanchor
    WHERE
    tanchor."tid" = tid and ( maxlvl is null or level < maxlvl )
    start with tanchor."uniqueid" IN ( SELECT DISTINCT tanchor."uniqueid" FROM "securityob"
            WHERE
            ( usrid is null OR tanchor."us24" = usrid )
            AND ( srcid is null OR tanchor."parentcontext" = srcid )
            AND ( rname is null OR tanchor."rol2" = rname) )
    CONNECT BY NOCYCLE prior tanchor."parentcontext" = tanchor."conte43" and tanchor."parentcontext" <> tanchor."conte43"
   )
    LOOP
      ctxType.extend;
      ctxType(ctxType.count):= i."ctx";
    END LOOP;
   
    RETURN ctxType;

  END getscontext;
 
 FUNCTION getrscontext
  (
        userid nvarchar2,
        sourcecid nvarchar2,
        roleName nvarchar2,
        maxLevel number,
        tid number
  ) RETURN t_array is 
      ctxType t_array := t_array();
      usrid nvarchar2(50);
      srcid nvarchar2(50);
      rname nvarchar2(50);
      maxlvl number;
  BEGIN
    DBMS_OUTPUT.PUT_LINE( 'Executing SECURITYOBJECT_ACTIONS...' );
    
    usrid := (case when userid = '' then null else userid end);
    srcid := (case when sourcecid = '' then null else sourcecid end);
    rname := (case when roleName = '' then null else roleName end);
    maxlvl := (case when maxLevel = -1 then null else maxLevel end);
    
   for i in(
    SELECT distinct tanchor."conte43" "ctx"
    FROM "securityob" tanchor
    WHERE
    tanchor."tid" = tid and ( maxlvl is null or level < maxlvl )
    start with tanchor."uniqueid" IN ( SELECT DISTINCT tanchor."uniqueid" FROM "securityob"
            WHERE
            ( usrid is null OR tanchor."us24" = usrid )
            AND ( srcid is null OR tanchor."parentcontext" = srcid )
            AND ( rname is null OR tanchor."rol2" = rname) )
    CONNECT BY NOCYCLE tanchor."parentcontext" = prior tanchor."conte43" and tanchor."parentcontext" <> tanchor."conte43"
   )
    LOOP
      ctxType.extend;
      ctxType(ctxType.count):= i."ctx";
    END LOOP;
   
    RETURN ctxType;

  END getrscontext;
END SECURITYOBJECT_ACTIONS;
