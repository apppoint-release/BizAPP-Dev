CREATE PROCEDURE bizapp_gettraces
	@id nvarchar(50), 
	@idType nvarchar(50),
	@idIsFrom integer,
	@traceName nvarchar(50),
	@tid int
AS
BEGIN

	IF ( @idIsFrom = 1 )
	BEGIN
		-- get all from traces
		WITH traces([tracename], [from], [fromtype], [fromrelated], [to], [totype], [level], [path]) 
		AS
		(
			SELECT tanchor.[tracename], tanchor.[from], tanchor.[fromtype], tanchor.[fromrelated], tanchor.[to], tanchor.[totype] , 0 AS [level], 
			CAST( ( '/' + tanchor.[from] + '.' + tanchor.[fromrelated] + '/' + tanchor.[to] ) AS nvarchar(MAX) ) as "path"
			FROM ent_traces AS tanchor
			WHERE
				tanchor.tid = @tid
				and tanchor.[from] = @id
				and tanchor.[fromtype] = @idtype
				and ( @traceName is null or tanchor.[tracename] = @traceName )
			
			UNION all
			
			SELECT trecurse.[tracename], trecurse.[from], trecurse.[fromtype], trecurse.[fromrelated], trecurse.[to], trecurse.[totype], [level] + 1, 
			CAST( ( traces.[path] + '/' + trecurse.[to] ) AS nvarchar(MAX) ) as "path"
			FROM ent_traces AS trecurse
			JOIN traces ON trecurse.[from] = traces.[to] AND trecurse.[fromtype] = traces.[totype] and trecurse.tid = @tid
		)
		SELECT [tracename], [from], [fromtype], [fromrelated], [to], [totype], [level], [path] FROM traces	
	END
	ELSE
	BEGIN
		-- get all to traces
		WITH traces([tracename], [from], [fromtype], [fromrelated], [to], [totype], [level], [path]) 
		AS
		(
			SELECT tanchor.[tracename], tanchor.[from], tanchor.[fromtype], tanchor.[fromrelated], tanchor.[to], tanchor.[totype], 0 AS [level], 
			CAST( ( '/' + tanchor.[from] + '.' + tanchor.[fromrelated] + '/' + tanchor.[to] ) AS nvarchar(MAX) ) as "path"
			FROM ent_traces as tanchor
			WHERE
				tanchor.tid = @tid
				and tanchor.[to] = @id
				and tanchor.[totype] = @idtype
				and ( @traceName is null or tanchor.[tracename] = @traceName )
			
			UNION all
			
			SELECT trecurse.[tracename], trecurse.[from], trecurse.[fromtype], trecurse.[fromrelated], trecurse.[to], trecurse.[totype], [level] + 1, 
			CAST( ( '/' + trecurse.[from] + '.' + trecurse.[fromrelated] + traces.[path] ) AS nvarchar(MAX) ) as "path"
			FROM ent_traces AS trecurse
			JOIN traces ON trecurse.[to] = traces.[from] AND trecurse.[totype] = traces.[fromtype] and trecurse.tid=@tid
		)
		SELECT [tracename], [from], [fromtype], [fromrelated], [to], [totype], [level], [path] FROM traces	
	END
END

