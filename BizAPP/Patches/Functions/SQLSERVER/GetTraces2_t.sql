CREATE FUNCTION gettraces2_t
(
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
		[createdon] datetime,
		[level] int,
		[path] nvarchar(MAX)
	)
AS
BEGIN
	IF ( @idIsFrom = 1 )
	BEGIN
		WITH traces([traceindex], [tracename], [from], [fromtype], [fromcomment], [fromrelated], [to], [totype], [tocomment], [createdby], [createdon],[level], [path]) 
		AS
		(
			SELECT tanchor.[traceindex], tanchor.[tracename], tanchor.[from], tanchor.[fromtype], tanchor.[fromcomment], tanchor.[fromrelated], tanchor.[to], tanchor.[totype], tanchor.[tocomment], tanchor.[createdby], tanchor.[createdon],0 AS [level], 
			CAST( ( '/' + tanchor.[from] + ':' + tanchor.[fromtype] + '/' + tanchor.[to] + ':' + tanchor.[totype] ) AS nvarchar(MAX) ) as "path"
			FROM ent_traces AS tanchor
			WHERE
				tanchor.tid = @tid
				and tanchor.[fromtype] = @idtype
				AND ( @traceName IS NULL OR @traceName = '' OR tanchor.[tracename] = @traceName )
			
			UNION all
			
			SELECT trecurse.[traceindex], trecurse.[tracename], trecurse.[from], trecurse.[fromtype], trecurse.[fromcomment], trecurse.[fromrelated], trecurse.[to], trecurse.[totype], trecurse.[tocomment], trecurse.[createdby], trecurse.[createdon],[level] + 1, 
			CAST( ( traces.[path] + '/' + trecurse.[to] + ':' + trecurse.[totype]) AS nvarchar(MAX) ) as "path"
			FROM ent_traces AS trecurse
			JOIN traces ON
				trecurse.tid = @tid
				and trecurse.[traceindex] != traces.[traceindex]
				AND trecurse.[from] = traces.[to] AND trecurse.[fromtype] = traces.[totype] AND ( @maxLevel IS NULL OR traces.[level] < @maxLevel )
				AND traces.[from] != trecurse.[to] AND traces.[fromtype] != trecurse.[totype]
		)
		INSERT INTO @temptable ([traceindex], [tracename], [fromid], [fromtype], [fromcomment], [fromrelated], [toid], [totype], [tocomment], [createdby], [createdon], [level], [path]) 
			SELECT DISTINCT [traceindex], [tracename], [from], [fromtype], [fromcomment], [fromrelated], [to], [totype], [tocomment], [createdby], [createdon],[level], [path] FROM traces
				WHERE (@relationship IS NULL OR @relationship = '' OR traces.[fromrelated] = @relationship)
	END
	ELSE IF ( @idIsFrom = 0 )
	BEGIN
		WITH traces([traceindex], [tracename], [from], [fromtype], [fromcomment], [fromrelated], [to], [totype], [tocomment], [createdby], [createdon],[level], [path]) 
		AS
		(
			SELECT tanchor.[traceindex], tanchor.[tracename], tanchor.[from], tanchor.[fromtype], tanchor.[fromcomment], tanchor.[fromrelated], tanchor.[to], tanchor.[totype], tanchor.[tocomment], tanchor.[createdby], tanchor.[createdon],0 AS [level], 
			CAST( ( '/' + tanchor.[from] + ':' + tanchor.[fromtype] + '/' + tanchor.[to] + ':' + tanchor.[totype]) AS nvarchar(MAX) ) as "path"
			FROM ent_traces as tanchor
			WHERE
				tanchor.tid = @tid
				and tanchor.[totype] = @idtype
				AND ( @traceName IS NULL OR @traceName = '' OR tanchor.[tracename] = @traceName )
			
			UNION all
			
			SELECT trecurse.[traceindex], trecurse.[tracename], trecurse.[from], trecurse.[fromtype], trecurse.[fromcomment], trecurse.[fromrelated], trecurse.[to], trecurse.[totype], trecurse.[tocomment], trecurse.[createdby], trecurse.[createdon],[level] + 1, 
			CAST( ( '/' + trecurse.[from] + ':' + trecurse.[fromtype] + traces.[path] ) AS nvarchar(MAX) ) as "path"
			FROM ent_traces AS trecurse
				JOIN traces ON 
					trecurse.tid = @tid
					and trecurse.[traceindex] != traces.[traceindex]
					AND trecurse.[to] = traces.[from] AND trecurse.[totype] = traces.[fromtype] AND ( @maxLevel IS NULL OR traces.[level] < @maxLevel )
					AND traces.[to] != trecurse.[from] AND traces.[totype] != trecurse.[fromtype]
		)
		INSERT INTO @temptable ([traceindex], [tracename], [fromid], [fromtype], [fromcomment], [fromrelated], [toid], [totype], [tocomment], [createdby], [createdon],[level], [path]) 
			SELECT DISTINCT [traceindex], [tracename], [from], [fromtype], [fromcomment], [fromrelated], [to], [totype], [tocomment], [createdby], [createdon],[level], [path] FROM traces
				WHERE (@relationship IS NULL OR @relationship = '' OR [fromrelated] = @relationship)
		OPTION (MAXRECURSION 100);
	END
	ELSE
	BEGIN
		WITH traces([traceindex], [tracename], [from], [fromtype], [fromcomment], [fromrelated], [to], [totype], [tocomment], [createdby], [createdon],[level], [path]) 
		AS
		(
			SELECT tanchor.[traceindex], tanchor.[tracename], tanchor.[from], tanchor.[fromtype], tanchor.[fromcomment], tanchor.[fromrelated], tanchor.[to], tanchor.[totype], tanchor.[tocomment], tanchor.[createdby], tanchor.[createdon],0 AS [level], 
			CAST( ( '/' + tanchor.[from] + ':' + tanchor.[fromtype] + '/' + tanchor.[to] + ':' + tanchor.[totype]  ) AS nvarchar(MAX) ) as "path"
			FROM ent_traces as tanchor
			WHERE
				tanchor.tid = @tid
				and tanchor.[totype] = @idtype
				AND ( @traceName IS NULL OR @traceName = '' OR tanchor.[tracename] = @traceName )
			
			UNION all

			SELECT tanchor.[traceindex], tanchor.[tracename], tanchor.[from], tanchor.[fromtype], tanchor.[fromcomment], tanchor.[fromrelated], tanchor.[to], tanchor.[totype], tanchor.[tocomment], tanchor.[createdby], tanchor.[createdon],0 AS [level], 
			CAST( ( '/' + tanchor.[from] + ':' + tanchor.[fromtype] + '/' + tanchor.[to] + ':' + tanchor.[totype] ) AS nvarchar(MAX) ) as "path"
			FROM ent_traces AS tanchor
			WHERE
				tanchor.tid = @tid
				and tanchor.[fromtype] = @idtype
				AND ( @traceName IS NULL OR @traceName = '' OR tanchor.[tracename] = @traceName )
			
			UNION all
			
			SELECT trecurse.[traceindex], trecurse.[tracename], trecurse.[from], trecurse.[fromtype], trecurse.[fromcomment], trecurse.[fromrelated], trecurse.[to], trecurse.[totype], trecurse.[tocomment], trecurse.[createdby], trecurse.[createdon],[level] + 1, 
			CAST( ( '/' + trecurse.[from] + ':' + trecurse.[fromtype] + traces.[path] ) AS nvarchar(MAX) ) as "path"
			FROM ent_traces AS trecurse
			JOIN traces ON 
				trecurse.tid = @tid
				and trecurse.[traceindex] != traces.[traceindex] AND
				trecurse.[to] = traces.[from] AND trecurse.[totype] = traces.[fromtype]
				AND trecurse.[from] != traces.[to] AND trecurse.[fromtype] != traces.[totype]
		)
		INSERT INTO @temptable ([traceindex], [tracename], [fromid], [fromtype], [fromcomment], [fromrelated], [toid], [totype], [tocomment], [createdby], [createdon],[level], [path]) 
			SELECT DISTINCT [traceindex], [tracename], [from], [fromtype], [fromcomment], [fromrelated], [to], [totype], [tocomment], [createdby], [createdon],[level], [path] FROM traces
				WHERE (@relationship IS NULL OR @relationship = '' OR traces.[fromrelated] = @relationship)
		OPTION (MAXRECURSION 100);
	END
	RETURN
END