CREATE FUNCTION FormatDate
(
	@date datetime, @format VARCHAR(25)
)
RETURNS VARCHAR(33)
AS
BEGIN
	-- Add the T-SQL statements to compute the return value here
	RETURN CASE @format
	WHEN 'DD' THEN CAST(DATENAME(day, @date) AS NVARCHAR(2))
	WHEN 'MM' THEN CAST(MONTH(@date) AS NVARCHAR(2))
	WHEN 'MMM' THEN CAST(DATENAME(month, @date) AS NVARCHAR(3))
	WHEN 'YY' THEN CAST(DATENAME(year, @date) AS NVARCHAR(2))
	WHEN 'YYYY' THEN CAST(DATENAME(year, @date) AS NVARCHAR(4))
	WHEN 'h' THEN CAST((CASE WHEN (DATENAME(hour, @date)%12=0) THEN 12 ELSE DATENAME(hour, @date)%12 END) AS NVARCHAR(2))
	WHEN 'hh' THEN CAST(DATENAME(hour, @date) AS NVARCHAR(2))
	WHEN 'n' THEN CAST(DATENAME(minute, @date) AS VARCHAR(2))
	WHEN 'nn' THEN RIGHT('0' + CAST(DATENAME(minute, @date) AS VARCHAR(2)), 2)
	WHEN 'ss' THEN RIGHT('0' + CAST(DATENAME(second, @date) AS NVARCHAR(2)), 2)
	WHEN 'tt' THEN RIGHT(CONVERT(CHAR(20), @date, 22), 2)

	-- some more most used formats
	WHEN 'dd-MM-yyyy' THEN CAST(DATENAME(day, @date) AS NVARCHAR(2)) + '-' + CAST(MONTH(@date) AS NVARCHAR(2)) + '-' + CAST(DATENAME(year, @date) AS NVARCHAR(4))
	WHEN 'dd-MMM-yyyy' THEN CAST(DATENAME(day, @date) AS NVARCHAR(2)) + '-' + CAST(DATENAME(month, @date) AS NVARCHAR(3)) + '-' + CAST(DATENAME(year, @date) AS NVARCHAR(4))
	WHEN 'dd-MMM-yyyy hh:nn' THEN CAST(DATENAME(day, @date) AS NVARCHAR(2)) + '-' + CAST(DATENAME(month, @date) AS NVARCHAR(3)) + '-' + CAST(DATENAME(year, @date) AS NVARCHAR(4))
		+ ' ' + CAST(DATENAME(hour, @date) AS NVARCHAR(2)) + ':' + RIGHT('0' + CAST(DATENAME(minute, @date) AS VARCHAR(2)), 2)
	WHEN 'dd-MMM-yyyy hh:nn:ss' THEN CAST(DATENAME(day, @date) AS NVARCHAR(2)) + '-' + CAST(DATENAME(month, @date) AS NVARCHAR(3)) + '-' + CAST(DATENAME(year, @date) AS NVARCHAR(4))
		+ ' ' + CAST(DATENAME(hour, @date) AS NVARCHAR(2)) + ':' + RIGHT('0' + CAST(DATENAME(minute, @date) AS VARCHAR(2)), 2) + ':' + RIGHT('0' + CAST(DATENAME(second, @date) AS NVARCHAR(2)), 2)
	WHEN 'hh:nn' THEN CAST(DATENAME(hour, @date) AS NVARCHAR(2)) + ':' + RIGHT('0' + CAST(DATENAME(minute, @date) AS VARCHAR(2)), 2)
	-- fallback for above...
	WHEN 'dd-MMM-yyyy hh:nn tt' THEN CAST(DATENAME(day, @date) AS NVARCHAR(2)) + '-' + CAST(DATENAME(month, @date) AS NVARCHAR(3)) + '-' + CAST(DATENAME(year, @date) AS NVARCHAR(4))
		+ ' ' + CAST(DATENAME(hour, @date) AS NVARCHAR(2)) + ':' + RIGHT('0' + CAST(DATENAME(minute, @date) AS VARCHAR(2)), 2)
	WHEN 'dd-MMM-yyyy hh:nn:ss tt' THEN CAST(DATENAME(day, @date) AS NVARCHAR(2)) + '-' + CAST(DATENAME(month, @date) AS NVARCHAR(3)) + '-' + CAST(DATENAME(year, @date) AS NVARCHAR(4))
		+ ' ' + CAST(DATENAME(hour, @date) AS NVARCHAR(2)) + ':' + RIGHT('0' + CAST(DATENAME(minute, @date) AS VARCHAR(2)), 2) + ':' + RIGHT('0' + CAST(DATENAME(second, @date) AS NVARCHAR(2)), 2)
	WHEN 'hh:nn tt' THEN CAST(DATENAME(hour, @date) AS NVARCHAR(2)) + ':' + RIGHT('0' + CAST(DATENAME(minute, @date) AS VARCHAR(2)), 2)

	WHEN 'dd-MMM-yyyy h:nn tt' THEN CAST(DATENAME(day, @date) AS NVARCHAR(2)) + '-' + CAST(DATENAME(month, @date) AS NVARCHAR(3)) + '-' + CAST(DATENAME(year, @date) AS NVARCHAR(4))
		+ ' ' + CAST((CASE WHEN (DATENAME(hour, @date)%12=0) THEN 12 ELSE DATENAME(hour, @date)%12 END) AS NVARCHAR(2)) + ':' + RIGHT('0' + CAST(DATENAME(minute, @date) AS VARCHAR(2)), 2) + ' ' + RIGHT(CONVERT(CHAR(20), @date, 22), 2)
	WHEN 'dd-MMM-yyyy h:nn:ss tt' THEN CAST(DATENAME(day, @date) AS NVARCHAR(2)) + '-' + CAST(DATENAME(month, @date) AS NVARCHAR(3)) + '-' + CAST(DATENAME(year, @date) AS NVARCHAR(4))
		+ ' ' + CAST((CASE WHEN (DATENAME(hour, @date)%12=0) THEN 12 ELSE DATENAME(hour, @date)%12 END) AS NVARCHAR(2)) + ':' + RIGHT('0' + CAST(DATENAME(minute, @date) AS VARCHAR(2)), 2) + ':' + RIGHT('0' + CAST(DATENAME(second, @date) AS NVARCHAR(2)), 2) + ' ' + RIGHT(CONVERT(CHAR(20), @date, 22), 2)
	WHEN 'h:nn tt' THEN CAST((CASE WHEN (DATENAME(hour, @date)%12=0) THEN 12 ELSE DATENAME(hour, @date)%12 END) AS NVARCHAR(2)) + ':' + RIGHT('0' + CAST(DATENAME(minute, @date) AS VARCHAR(2)), 2) + ' ' + RIGHT(CONVERT(CHAR(20), @date, 22), 2)

	WHEN 'MM/DD/YY'				THEN CONVERT(VARCHAR(8), @date, 1)
	WHEN 'MM/DD/YYYY'			THEN CONVERT(VARCHAR(10), @date, 101)
	WHEN 'MM-DD-YY'				THEN CONVERT(VARCHAR(8), @date, 10)
	WHEN 'MM-DD-YYYY'			THEN CONVERT(VARCHAR(10), @date, 110)
	
	WHEN 'DD/MM/YY'				THEN CONVERT(VARCHAR(8), @date, 3)
	WHEN 'DD/MM/YYYY'			THEN CONVERT(VARCHAR(10), @date, 103)
	WHEN 'DD-MM-YY'				THEN CONVERT(VARCHAR(8), @date, 5)
	WHEN 'DD-MM-YYYY'			THEN CONVERT(VARCHAR(10), @date, 105)

	WHEN 'YY/MM/DD'				THEN CONVERT(VARCHAR(8), @date, 11)
	WHEN 'YYYY/MM/DD'			THEN CONVERT(VARCHAR(10), @date, 111)
	WHEN 'YY-MM-DD'				THEN SUBSTRING(CONVERT(VARCHAR(10), @date, 120), 3, 8)
	WHEN 'YYYY-MM-DD'			THEN CONVERT(VARCHAR(10), @date, 120)
	WHEN 'YYYY-MM-DD HH:MI:SS'	THEN CONVERT(VARCHAR(19), @date, 120)

	WHEN 'DD Mon YY'			THEN CONVERT(VARCHAR(11), @date, 6)
	WHEN 'DD Mon YYYY'			THEN CONVERT(VARCHAR(11), @date, 106)
	WHEN 'Mon DD, YY'			THEN CONVERT(VARCHAR(10), @date, 7)
	WHEN 'Mon DD, YYYY'			THEN CONVERT(VARCHAR(10), @date, 107)
	WHEN 'DD Mon YYYY HH:MI:SS' THEN CONVERT(VARCHAR(20), @date, 113)
	WHEN 'ISO-8601'				THEN CONVERT(VARCHAR(33), @date, 126)
	WHEN 'ISO-8601-EX'			THEN CONVERT(VARCHAR(33), @date, 127)
	ELSE 'Invalid Format'
	END
END