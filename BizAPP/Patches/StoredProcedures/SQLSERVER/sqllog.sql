CREATE TABLE [dbo].[sqllog](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DbName] [nvarchar](20) NOT NULL,
	[Logged] [datetime] NOT NULL,
	[Url] [nvarchar](max) NOT NULL,
	[TimeInMS] [bigint] NULL,
	[Sql] [nvarchar](max) NOT NULL,
	[host] [nvarchar](300) NULL,
	CONSTRAINT [pk_sqllog] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
)
GO
CREATE INDEX IX_SQLLOG_LOGGED on [dbo].[sqllog]([Logged] desc) include( [DbName], [TimeInMS], Sql )
GO
ALTER TABLE [dbo].[sqllog] add QueryEid nvarchar(50)