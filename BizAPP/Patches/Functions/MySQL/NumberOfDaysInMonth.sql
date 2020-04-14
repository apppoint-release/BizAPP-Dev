DELIMITER $$
CREATE FUNCTION `NumberOfDaysInMonth`( dateValue datetime )
RETURNS int

BEGIN
	declare totaldays int;

	set totaldays = -DATEDIFF(
				DATE_ADD(dateValue, INTERVAL 1-day(dateValue) DAY),
				DATE_ADD(
                DATE_ADD(dateValue, INTERVAL 1-day(dateValue) DAY),
                    INTERVAL 1 MONTH)
                );
	RETURN totaldays;
END