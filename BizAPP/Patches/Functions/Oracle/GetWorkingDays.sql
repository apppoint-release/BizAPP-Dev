create or replace FUNCTION GETWORKINGDAYS (startdate in timestamp, enddate in timestamp)  
        return number is total_days number;  
        nextstartdate1 timestamp;nextenddate timestamp;
        checkvalue number;isholiday number;
begin 

  nextstartdate1 := to_char( startdate, 'YYYY-mm-dd' );
  nextenddate := to_char( enddate, 'YYYY-mm-dd' );
  checkvalue := 1;  
  while isholiday = 1 or checkvalue = 1  LOOP
    select coalesce( "calendar_isholiday", "calendar_isnonworkingday", 0 ) into isholiday from
		"calendar" where "calendar_currentdate" = nextstartdate1;
    if isholiday = 1 then
      nextstartdate1 := nextstartdate1 + 1;
    end if;
    checkvalue := 0;
  END LOOP; 

  select COUNT(*) into total_days from "calendar" where 
  "calendar_currentdate" between nextstartdate1 and nextenddate
  and ( ("calendar_isholiday" is null or "calendar_isholiday" = 0) 
          and ("calendar_isnonworkingday" is null or "calendar_isnonworkingday" = 0 )
  );
	
  return total_days;  
END GETWORKINGDAYS;
 
