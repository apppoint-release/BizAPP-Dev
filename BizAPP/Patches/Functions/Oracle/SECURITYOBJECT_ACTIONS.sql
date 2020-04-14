create or replace PACKAGE SECURITYOBJECT_ACTIONS AS
  FUNCTION getscontext
  (
          userid nvarchar2,
          sourcecid nvarchar2,
          roleName nvarchar2,
          maxLevel number,
          tid number
  )
  RETURN t_array;

  FUNCTION getrscontext
  (
          userid nvarchar2,
          sourcecid nvarchar2,
          roleName nvarchar2,
          maxLevel number,
          tid number
  )
  RETURN t_array;
  
END SECURITYOBJECT_ACTIONS;