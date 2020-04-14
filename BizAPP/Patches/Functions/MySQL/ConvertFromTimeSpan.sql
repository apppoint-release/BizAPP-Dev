DELIMITER $$
CREATE FUNCTION `ConvertFromTimeSpan`( timespan bigint, unit varchar(12) )
RETURNS bigint
BEGIN
	DECLARE ret bigint;
	set ret =
	case 
		WHEN unit = 'Day' THEN cast(timespan/864000000000 as unsigned)
		WHEN unit = 'Hour' THEN cast(timespan/36000000000 as unsigned)
		WHEN unit = 'Minute' THEN cast(timespan/600000000 as unsigned)
		WHEN unit = 'Second' THEN cast(timespan/10000000 as unsigned)
		WHEN unit = 'Millisecond' THEN cast(timespan/10000 as unsigned)
	END;
	RETURN ret;
END