create type traces2 IS OBJECT
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