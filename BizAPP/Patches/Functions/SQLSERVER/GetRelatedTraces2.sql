CREATE FUNCTION getrelatedtraces2
(	
	@id nvarchar(50),
	@idType nvarchar(50),
	@idIsFrom integer,
	@maxLevel integer,
	@relationship nvarchar(50),
	@traceName nvarchar(50),
	@tid int
)
RETURNS
	@temptable TABLE 
	(
		[traceindex] bigint,
		[tracename] nvarchar(50),
		[fromid]  nvarchar(50),
		[fromtype]  nvarchar(50),
		[fromrelated] nvarchar(50),
		[fromcomment] nvarchar(250),
		[toid] nvarchar(50),
		[totype] nvarchar(50),
		[tocomment] nvarchar(250),
		[createdby] nvarchar(50),
		[level] int,
		[path] nvarchar(MAX)
	)
AS
BEGIN
		declare @idIsFromReverse INT
		set @idIsFromReverse = ( select case when @idIsFrom = 1 then 0 else 1 end )

		INSERT INTO @temptable ([traceindex], [tracename], [fromid], [fromtype], [fromcomment], [fromrelated], [toid], [totype], [tocomment], [createdby], [level], [path])
		SELECT [documentsreadbyusers].[traceindex], [documentsreadbyusers].[tracename], [documentsreadbyusers].[fromid],
			[documentsreadbyusers].[fromtype], [documentsreadbyusers].[fromcomment], [documentsreadbyusers].[fromrelated],
			[documentsreadbyusers].[toid], [documentsreadbyusers].[totype], [documentsreadbyusers].[tocomment],
			[documentsreadbyusers].[createdby], [documentsreadbyusers].[level], [documentsreadbyusers].[path]
			FROM gettraces2(@id, @idType, @idIsFrom, @maxLevel, @relationship, @traceName, @tid) AS [userswhoread]
			CROSS APPLY gettraces2([userswhoread].fromid, [userswhoread].fromtype, @idIsFromReverse, @maxLevel, @relationship, @traceName, @tid) AS [documentsreadbyusers]
	RETURN
END
GO