CREATE FUNCTION getrscontext
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

	WITH rscontext([context], [parentcontext], [level], [path])
	AS
	(
		SELECT tanchor.[securitycontext], tanchor.[securityparentcontext], 0 AS [level],
			CAST( '/' + tanchor.[securitycontext] + '/'  AS nvarchar(MAX) ) as "path"
		FROM securityob AS tanchor
		WHERE
			tanchor.tid = @tid and
			tanchor.[securitycontext] IN ( SELECT DISTINCT [securitycontext] FROM securityob
					WHERE
					( @userid is null OR [us24] = @userid )
					AND ( @sourcecid is null OR [securityparentcontext] = @sourcecid )
					AND ( @roleName is null OR [rol2] = @roleName) )
			
		UNION all

		SELECT so.[securitycontext], so.[securityparentcontext], rc.[level] + 1 as [level],
			CAST( rc.[path] + so.[securitycontext] + '/' AS nvarchar(MAX) ) as "path"
		FROM securityob AS so
		inner join rscontext rc ON
			so.tid = @tid
			AND ( rc.[parentcontext] = so.[securitycontext] )
			AND ( @roleName is null OR so.[rol2] = @roleName )
			AND ( @sourcecid is null OR rc.[parentcontext] = @sourcecid )
			AND ( @maxLevel IS NULL OR rc.[level] < @maxLevel )
	)
	INSERT INTO @temptable ([context])
		SELECT DISTINCT [context] FROM rscontext
	OPTION (MAXRECURSION 10);
	RETURN
END