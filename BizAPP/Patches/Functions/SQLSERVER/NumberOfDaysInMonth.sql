CREATE FUNCTION NumberOfDaysInMonth
(
	@date AS DATE
)
RETURNS int
AS
BEGIN
RETURN DATEDIFF(day,
			DATEADD(day, 1-day(@date), @date),
			DATEADD(month, 1, DATEADD(day, 1-day(@date), @date)))
END