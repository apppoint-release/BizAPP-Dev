CREATE PROCEDURE DeleteShardedTenant
	@tid int
AS
BEGIN
	SET NOCOUNT ON;
	-- find all tables that have tid column.
    DECLARE @tableName NVARCHAR(100);
	DECLARE cur cursor FAST_FORWARD FOR 
	Select distinct quotename(table_name) from INFORMATION_SCHEMA.COLUMNS where column_name = 'tid'

	OPEN cur
	FETCH NEXT FROM cur INTO @tableName

	WHILE @@FETCH_STATUS <> -1
	BEGIN
		IF @@FETCH_STATUS <> -2
		BEGIN
			DECLARE @statement NVARCHAR(200);
			SET @statement = 'DELETE FROM ' + @tableName + ' where tid=' + cast(@tid as nvarchar)
			execute sp_executesql @statement;
		END
		FETCH NEXT FROM cur INTO @tableName
	END
	CLOSE cur
	DEALLOCATE cur
END