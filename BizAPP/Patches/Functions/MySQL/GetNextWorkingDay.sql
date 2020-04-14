DELIMITER $$
CREATE FUNCTION `GetNextWorkingDay`( date datetime, numworkingdays int )
RETURNS datetime

BEGIN
  declare newdate datetime;
  declare isholiday int;
  declare totaldays int;

set totaldays = 0 ;
set newdate = date;

while( isholiday = 1 or totaldays < numworkingdays ) 
  DO
		set newdate = date_add(newdate,INTERVAL 1 day );
		select coalesce( calendar_isholiday, calendar_isnonworkingday, 0 ) into isholiday from
		calendar where calendar_currentdate = newdate;
		if ( isholiday <> 1 ) then
			set totaldays = totaldays + 1;
    end if;
  end while;
	RETURN newdate;
END