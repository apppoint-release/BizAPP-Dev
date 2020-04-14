CREATE PROCEDURE PartitionSpaceUsed 
AS
BEGIN
	SET NOCOUNT ON;

    select * from
	(
		select 
		p.partition_number as PartitionNumber
		,sum(p.used_page_count * 8 /1024.0) AS 'UsedPages_MB'
		,sum(p.in_row_data_page_count * 8 /1024.0) AS 'DataPages_MB'
		,sum(p.reserved_page_count * 8 /1024.0) AS 'ReservedPages_MB'
		FROM sys.dm_db_partition_stats p
		where p.used_page_count > 0
		group by p.partition_number
	)t order by t.PartitionNumber

END