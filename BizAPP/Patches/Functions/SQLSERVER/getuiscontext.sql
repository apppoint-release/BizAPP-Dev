CREATE FUNCTION getuiscontext
(
	@userid nvarchar(50),
	@sourcecid nvarchar(50),
	@roleName nvarchar(50),
	@maxLevel integer,
	@tid integer
)
RETURNS
	@temptable TABLE
	(
		[context] nvarchar(50)
	)
AS
BEGIN
	SET @userid = (CASE WHEN @userid = '' THEN null ELSE @userid END);
	SET @sourcecid = (CASE WHEN @sourcecid = '' THEN null ELSE @sourcecid END);
	SET @roleName = (CASE WHEN @roleName = '' THEN null ELSE @roleName END);
	SET @maxLevel = (CASE WHEN @maxLevel = -1 THEN null ELSE @maxLevel END);

	WITH scontext([uniqueid], [context], [parentcontext], [level], [path])
	AS
	(
		SELECT tanchor.[uniqueid], tanchor.[conte43], tanchor.[parentcontext], 0 AS [level],
			CAST( ( '/' + tanchor.[parentcontext] + '/' + tanchor.[conte43] ) AS nvarchar(MAX) ) as "path"
			
		FROM securityob AS tanchor
		WHERE
			tanchor.tid = @tid and
			tanchor.[uniqueid] IN ( SELECT DISTINCT [uniqueid] FROM securityob
				WHERE
				( @userid is null OR [us24] = @userid )
				AND ( @sourcecid is null OR [parentcontext] = @sourcecid )
				AND ( @roleName is null OR [rol2] = @roleName) )
			
		UNION all
			
		SELECT trecurse.[uniqueid], trecurse.[conte43], trecurse.[parentcontext], [level] + 1,
			CAST( ( scontext.[path] + '/' + trecurse.[conte43]) AS nvarchar(MAX) ) as "path"
			
		FROM securityob AS trecurse
		JOIN scontext ON
			trecurse.tid = @tid
			AND trecurse.[uniqueid] != scontext.[uniqueid]
			AND ( trecurse.[parentcontext] = scontext.[context] )
			AND ( @roleName is null OR [rol2] = @roleName )
			AND ( @maxLevel IS NULL OR scontext.[level] < @maxLevel )
	)
	INSERT INTO @temptable ([context])
		SELECT DISTINCT [context] FROM scontext
	OPTION (MAXRECURSION 10);
	RETURN
END

