CREATE OR REPLACE
FUNCTION DIFFTIMESTAMP (timestamp1 in timestamp, timestamp2 in timestamp)  
        return number is total_secs number;  
        diff interval day(9) to second(6);  
        
    begin 
    diff := timestamp2 - timestamp1;  
    total_secs := abs(extract(second from diff) + extract(minute from diff)*60 + extract(hour from diff)*60*60 + extract(day from diff)*24*60*60);  
    return total_secs;  

END DIFFTIMESTAMP;