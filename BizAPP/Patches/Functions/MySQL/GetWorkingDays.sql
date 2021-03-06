DELIMITER $$
CREATE FUNCTION `GetWorkingDays`( startdate datetime, enddate datetime )
RETURNS int
BEGIN
	declare days int;
	select COUNT(*) into days from calendar where 
	calendar_currentdate between startdate and enddate
	and ( (calendar_isholiday is null or calendar_isholiday = 0) 
		and (calendar_isnonworkingday is null or calendar_isnonworkingday = 0 ) );
	return days;
END
