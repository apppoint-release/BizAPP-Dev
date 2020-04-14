create or replace
FUNCTION NUMBEROFDAYSINMONTH (startdate in timestamp)
        return number is total_days number;
begin 
	select last_day(startdate)-(add_months(last_day(startdate),-1)) into total_days from dual;
	return total_days;  
END NUMBEROFDAYSINMONTH;