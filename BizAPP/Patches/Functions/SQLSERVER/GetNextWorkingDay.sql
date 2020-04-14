CREATE FUNCTION GetNextWorkingDay
(
	@date datetime, @numworkingdays int
)
RETURNS datetime
AS
BEGIN
	declare @newdate datetime, @isholiday int, @totaldays int

set @totaldays = 0 
set @newdate = @date

while( @isholiday = 1 or @totaldays < @numworkingdays )
	begin
		set @newdate = DATEADD( day, 1, @newdate )
		select @isholiday = coalesce( calendar_isholiday, calendar_isnonworkingday, 0 ) from
		calendar where calendar_currentdate = @newdate
		if ( @isholiday <> 1 )
			set @totaldays = @totaldays + 1
	end
	RETURN @newdate
END


