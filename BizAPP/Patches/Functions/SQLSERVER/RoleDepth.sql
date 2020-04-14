CREATE FUNCTION RoleDepth
(
	-- Add the parameters for the function here
	@role nvarchar(4000)
)
RETURNS int
AS
BEGIN
	-- Declare the return variable here
	DECLARE @depth int, @index int
	
	set @index = charindex( '/', @role )
	set @depth = 0

	while( @index > 0 )
	begin
		set @depth = @depth + 1
		set @index = charindex( '/', @role, @index + 1 )
	end

	-- Return the result of the function
	RETURN @depth

END

