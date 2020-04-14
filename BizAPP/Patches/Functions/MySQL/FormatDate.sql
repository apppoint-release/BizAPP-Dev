DELIMITER $$

CREATE FUNCTION `FormatDate` (dt datetime,format nvarchar(20))
RETURNS nvarchar(25)
BEGIN

declare fmtDate nvarchar(25);

set fmtDate = case format 
	WHEN 'MM/DD/YY'				THEN DATE_FORMAT(dt, '%m/%d/%y')
	WHEN 'MM/DD/YYYY'			THEN DATE_FORMAT(dt, '%m/%d/%Y')
	WHEN 'MM-DD-YY'				THEN DATE_FORMAT(dt, '%m-%d-%y')
	WHEN 'MM-DD-YYYY'			THEN DATE_FORMAT(dt, '%m-%d-%Y')
	
	WHEN 'DD/MM/YY'				THEN DATE_FORMAT(dt, '%d/%m/%y')
	WHEN 'DD/MM/YYYY'			THEN DATE_FORMAT(dt, '%d/%m/%Y')
	WHEN 'DD-MM-YY'				THEN DATE_FORMAT(dt, '%d-%m-%y')
	WHEN 'DD-MM-YYYY'			THEN DATE_FORMAT(dt, '%d-%m-%Y')

	WHEN 'YY/MM/DD'				THEN DATE_FORMAT(dt, '%y/%m/%d')
	WHEN 'YYYY/MM/DD'			THEN DATE_FORMAT(dt, '%Y/%m/%d')
	WHEN 'YY-MM-DD'				THEN DATE_FORMAT(dt, '%y-%m-%d')
	WHEN 'YYYY-MM-DD'			THEN DATE_FORMAT(dt, '%Y-%m-%d')
	WHEN 'YYYY-MM-DD HH:MI:SS'	THEN DATE_FORMAT(dt, '%Y-%m-%d %T')

	WHEN 'DD Mon YY'			THEN DATE_FORMAT(dt, '%d %b %y')
	WHEN 'DD Mon YYYY'			THEN DATE_FORMAT(dt, '%d %b %Y')
	WHEN 'Mon DD, YY'			THEN DATE_FORMAT(dt, '%b %d, %y')
	WHEN 'Mon DD, YYYY'			THEN DATE_FORMAT(dt, '%b %d, %Y')
	WHEN 'DD Mon YYYY HH:MI:SS' THEN DATE_FORMAT(dt, '%d %b %Y %T')
ELSE 'Invalid Format' 
END;

RETURN fmtDate;
END