create or replace
FUNCTION GETNEXTWORKINGDAY (startdate in timestamp, numworkingdays in NUMBER)  
        return timestamp is 
        nextdate timestamp; 
        isholiday NUMBER;
        totaldays NUMBER;
begin 
        totaldays := 0;
        nextdate := to_char( startdate, 'YYYY-mm-dd' );
        
	while isholiday = 1 or totaldays < numworkingdays  LOOP
            nextdate := nextdate + 1;
            select coalesce( "calendar_isholiday", "calendar_isnonworkingday", 0 ) into isholiday from
		"calendar" where "calendar_currentdate" = nextdate;
            if isholiday <> 1 then
		totaldays := totaldays + 1;
            end if;
          END LOOP; 
	
	return nextdate;  
END GETNEXTWORKINGDAY;

