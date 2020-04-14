CREATE FUNCTION traceexists2
(
	@id1 nvarchar(MAX),
	@id1Type nvarchar(MAX),
	@id2 nvarchar(MAX),
	@id2Type nvarchar(MAX),
	@id1IsFrom integer,
	@maxLevel integer,
	@relationship nvarchar(MAX),
	@traceName nvarchar(MAX),
	@tid int
)
RETURNS
	INTEGER
AS
BEGIN
	DECLARE @result INTEGER

	SET @result =
	CASE WHEN EXISTS(
		SELECT * FROM [dbo].gettraces2( @id1, @id1Type, @id1IsFrom, @maxLevel, @relationship, @traceName, @tid ) AS t1
		WHERE
			( @id1IsFrom = 1 AND ( t1.toid = @id2 AND t1.totype = @id2Type ) ) OR
			( @id1IsFrom = 0 AND ( t1.fromid = @id2 AND t1.fromtype = @id2Type ) )
		) THEN 1
	ELSE 0
	END
	RETURN @result
END
GO