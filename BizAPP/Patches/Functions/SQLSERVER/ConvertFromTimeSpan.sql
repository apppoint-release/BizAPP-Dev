CREATE FUNCTION ConvertFromTimeSpan
(
	@timespan bigint,
	@unit nvarchar(12)
)
RETURNS bigint
AS
BEGIN
	DECLARE @ret bigint
	set @ret =
	case 
		WHEN @unit = 'Day' THEN cast(@timespan/864000000000 as bigint)
		WHEN @unit = 'Hour' THEN cast(@timespan/36000000000 as bigint)
		WHEN @unit = 'Minute' THEN cast(@timespan/600000000 as bigint)
		WHEN @unit = 'Second' THEN cast(@timespan/10000000 as bigint)
		WHEN @unit = 'Millisecond' THEN cast(@timespan/10000 as bigint)
	END
	RETURN @ret
END