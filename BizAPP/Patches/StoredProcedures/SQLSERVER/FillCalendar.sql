--CREATE TABLE [dbo].[calendar](
	--[dbid] [int] NULL,
	--[enterpriseid] [nvarchar](50) NULL,
	--[uniqueid] [nvarchar](50) NOT NULL,
	--[olduniqueid] [nvarchar](50) NULL,
	--[displayname] [nvarchar](254) NULL,
	--[state] [nvarchar](50) NOT NULL,
	--[createdby] [nvarchar](50) NULL,
	--[objectdescription] [nvarchar](255) NULL,
	--[createdon] [datetime] NULL,
	--[lastmodifiedon] [datetime] NULL,
	--[ownerrole] [nvarchar](50) NULL,
	--[ownergroup] [nvarchar](50) NULL,
	--[objecttemplate] [nvarchar](50) NULL,
	--[objecttype] [nvarchar](255) NOT NULL,
	--[locked] [int] NULL,
	--[lockedby] [nvarchar](50) NULL,
	--[hash] [image] NULL,
	--[timestamp] [timestamp] NOT NULL,
	--[validtill] [datetime] NULL,
	--[processid] [nvarchar](50) NULL,
	--[version] [int] NOT NULL,
	--[calendar_currentdate] [datetime] NULL,
	--[calendar_description] [ntext] NULL,
	--[calendar_isholiday] [int] NULL,
	--[calendar_isnonworkingday] [int] NULL,
	--[calendar_dayoftheweek] [int] NULL,
 --CONSTRAINT [PK_calendar_uniqueid] PRIMARY KEY CLUSTERED 
--(
	--[uniqueid] ASC
--)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
--)

-- =============================================
-- Author:		Saravanan
-- Create date: 23-Dec-2009
-- Description:	Create calendar entries
-- =============================================
CREATE PROCEDURE [dbo].[FillCalendar] ( @calmaxdate datetime = '21001231', @tid int = -1)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @id nvarchar(50), @site nvarchar(50), @maxdate datetime, @objecttype nvarchar(50)
	select @site = [value] from ent_systemproperties where [name] = 'SiteName' and [tid] =@tid;
	select @objecttype = uniqueid from assembly_info where object_name = 'SystemUnit.ProjectManagement.Calendar';

	SELECT @maxdate = isnull(MAX(calendar_currentdate),'20000101') FROM Calendar
	WHILE ( @maxdate < @calmaxdate ) --<'21001231'
	BEGIN

		-- get id
		set @id = NEWID()
		
		-- insert records.
		INSERT INTO Calendar (enterpriseid,uniqueid,displayname,calendar_dayoftheweek,state,createdby, createdon, lastmodifiedon, ownerrole, objecttype, version, calendar_currentdate, tid) 
		SELECT 'E' + @id, @id,@id,datepart(weekday,@maxdate),'Started','uid_admin',GetDate(),GetDate(),'uid_adminrole',@objecttype,0,@maxdate, @tid
		
		SET @maxdate = DATEADD(d, 1, @maxdate )
	END
END