CREATE OR REPLACE
FUNCTION ROLEDEPTH
(
  rolepath varchar2
)
RETURN NUMBER
IS
  depth NUMBER;
  currentindex NUMBER;
BEGIN

        currentindex := INSTR( rolepath, '/', 1 );
	depth := 0;

	while( currentindex > 0 )
	LOOP
		depth := depth + 1;
		currentindex := INSTR( rolepath, '/', currentindex + 1 );
	END LOOP;

  RETURN depth;
END ROLEDEPTH;