CREATE OR REPLACE FUNCTION FORMATDATE( dt IN DATE, format IN VARCHAR2) 
RETURN VARCHAR2 is
fmtDate nvarchar2(25);
BEGIN
  fmtDate := CASE format 
  WHEN 'MM/DD/YY'			THEN to_char(dt, 'MM/dd/yy')
  WHEN 'MM/DD/YYYY'			THEN to_char(dt, 'MM/dd/yyyy')
  WHEN 'MM-DD-YY'			THEN to_char(dt, 'MM-dd-yy')
  WHEN 'MM-DD-YYYY'			THEN to_char(dt, 'MM-dd-yyyy')
  
  WHEN 'DD/MM/YY'			THEN to_char(dt, 'dd/MM/yy')
  WHEN 'DD/MM/YYYY'			THEN to_char(dt, 'dd/MM/yyyy')
  WHEN 'DD-MM-YY'			THEN to_char(dt, 'dd-MM-yy')
  WHEN 'DD-MM-YYYY'			THEN to_char(dt, 'dd-MM-yyyy')

  WHEN 'YY/MM/DD'			THEN to_char(dt, 'yy/MM/dd')
  WHEN 'YYYY/MM/DD'			THEN to_char(dt, 'yyyy/MM/dd')
  WHEN 'YY-MM-DD'			THEN to_char(dt, 'yy-MM-dd')
  WHEN 'YYYY-MM-DD'			THEN to_char(dt, 'yyyy-MM-dd')
  WHEN 'YYYY-MM-DD HH:MI:SS'	        THEN to_char(dt, 'yyyy-MM-dd HH24:MI:SS')

  WHEN 'DD Mon YY'			THEN to_char(dt, 'dd MON yy')
  WHEN 'DD Mon YYYY'			THEN to_char(dt, 'dd MON yyyy')
  WHEN 'Mon DD, YY'			THEN to_char(dt, 'MON dd,yy')
  WHEN 'Mon DD, YYYY'			THEN to_char(dt, 'MON dd,yyyy')
  WHEN 'DD Mon YYYY HH:MI:SS'           THEN to_char(dt, 'dd MON yyyy HH24:MI:SS')
  else 'Invalid Format'
  END;
  RETURN fmtDate;
END FORMATDATE;
