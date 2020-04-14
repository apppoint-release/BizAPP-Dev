DELIMITER $$
CREATE FUNCTION `RoleDepth`( role varchar(4000) )
RETURNS int
BEGIN
	-- Declare the return variable here
  DECLARE depth int;
  DECLARE indexvalue int;
	
	set indexvalue = LOCATE( '/', role );
	set depth = 0;

	while( indexvalue > 0 ) do
	begin
		set depth = depth + 1;
		set indexvalue = LOCATE( '/', role, indexvalue + 1 );
	end;
  end while;

	-- Return the result of the function
	RETURN depth;

END