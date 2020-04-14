--CREATE TABLE "calendar"(
	--"dbid" number(11) NULL,
	--"enterpriseid" nvarchar2(50) NULL,
	--"uniqueid" nvarchar2(50) NOT NULL,
	--"olduniqueid" nvarchar2(50) NULL,
	--"displayname" nvarchar2(254) NULL,
	--"state" nvarchar2(50) NOT NULL,
	--"createdby" nvarchar2(50) NULL,
	--"objectdescription" nvarchar2(255) NULL,
	--"createdon" timestamp(6) NULL,
	--"lastmodifiedon" timestamp(6) NULL,
	--"ownerrole" nvarchar2(50) NULL,
	--"ownergroup" nvarchar2(50) NULL,
	--"objecttemplate" nvarchar2(50) NULL,
	--"objecttype" nvarchar2(255) NOT NULL,
	--"locked" number(11) NULL,
	--"lockedby" nvarchar2(50) NULL,
	--"hash" blob NULL,
	--"timestamp" timestamp(6) NULL,
	--"validtill" timestamp(6) NULL,
	--"processid" nvarchar2(50) NULL,
	--"version" number(11) NOT NULL,
	--"calendar_currentdate" timestamp(6) NULL,
	--"calendar_description" clob NULL,
	--"calendar_isholiday" number(11) NULL,
	--"calendar_isnonworkingday" number(11) NULL,
	--"calendar_dayoftheweek" number(11) NULL,
 --CONSTRAINT "PK_calendar_uniqueid" PRIMARY KEY ( "uniqueid" ) )

create or replace PROCEDURE FILLCALENDAR 
(
  calmaxdate timestamp default TO_DATE('2100-12-31','YYYY-mm-dd HH24:MI:SS'),
  tid int default -1
)
IS
      site varchar2(50);
      uid varchar2(50);
      maxdate timestamp;
      diffdate timestamp;
      currentdate timestamp;
      modifieddate timestamp;
      objecttype varchar2(50);
BEGIN
      modifieddate := TO_DATE( TO_CHAR( SYSDATE,'YYYY-mm-dd' ),'YYYY-mm-dd HH24:MI:SS' );
            
      select "value" into site from "ent_systemproperties" where "name" = 'SiteName' and "tid" =tid;
      select "uniqueid" into objecttype from "assembly_info" where "object_name" = 'SystemUnit.ProjectManagement.Calendar';
      
      -- Insert all records upto max date
      select nvl( max("calendar_currentdate"),to_date('2000-01-01','YYYY-mm-dd HH24:MI:SS') ) into currentdate from "calendar";
      while currentdate < calmaxdate
        loop
          uid:= bizapp_createuid(1,'NextID',tid);
          uid:= site || uid;
          INSERT INTO "calendar" ("uniqueid","state","createdby", "createdon", "lastmodifiedon", "timestamp", "ownerrole", "objecttype", "version", "calendar_currentdate", "tid") 
          VALUES (uid,'Started','uid_admin',modifieddate, modifieddate, modifieddate,'uid_adminrole',objecttype,0,currentdate, tid );
          currentdate := currentdate + 1;
        end loop;
      
      -- update with week of day.
      update "calendar" set "enterpriseid" = 'E' || "uniqueid", "displayname" = "uniqueid", "calendar_dayoftheweek" = to_char("calendar_currentdate",'D');
END FILLCALENDAR;

