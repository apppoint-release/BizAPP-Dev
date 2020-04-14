CREATE OR REPLACE
FUNCTION CONVERTFROMTIMESPAN (timespan in number , unit in VARCHAR2) RETURN NUMBER is ret NUMBER(19,0);
BEGIN
	ret := case unit
		WHEN 'Day' THEN  timespan/864000000000 
		WHEN 'Hour' THEN   timespan/36000000000 
		WHEN 'Minute' THEN timespan/600000000
		WHEN 'Second' THEN timespan/10000000  
		WHEN 'Millisecond' THEN timespan/10000 
		end;

	RETURN ret;
END;