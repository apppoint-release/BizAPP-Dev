#DROP FUNCTION IF EXISTS `NumberToWords` ;
DELIMITER $$
CREATE FUNCTION `NumberToWords`( NumberString varchar(1024))
RETURNS varchar(8000)
BEGIN
DECLARE Number Decimal (38, 0);
DECLARE inputNumber VARCHAR(38);
DECLARE outputString VARCHAR(8000);
DECLARE length INT;
DECLARE counter INT;
DECLARE loops INT;
DECLARE position INT;
DECLARE chunk CHAR(3) ;
DECLARE tensones CHAR(2);
DECLARE hundreds CHAR(1);
DECLARE tens CHAR(1);
DECLARE ones CHAR(1);
DECLARE deficit INT;
DECLARE tempOutput VARCHAR( 1000);

set Number = cast( NumberString as Decimal(38, 0));

IF Number = 0 then
    return 'Zero';

end if;

set inputNumber = cast(Number as char(38))   ;
set outputString = '' ;
set counter = 1;
set length   = LENGTH(inputNumber);

set deficit = length%3;

if deficit <> 0
then
    set deficit = 3 - deficit;
    while deficit <> 0 DO
        set inputNumber = concat( '0', inputNumber);
        set deficit = deficit - 1;
    end while;
end if;

set length   = LENGTH(inputNumber);
set position = LENGTH(inputNumber) - 2;
set loops    = LENGTH(inputNumber)/3;

IF LENGTH(inputNumber) % 3 <> 0
then
SET loops = loops + 1;
end if;

WHILE counter <= loops DO

    SET chunk = RIGHT(  SUBSTRING(inputNumber, position, 3) , 3);
  IF ( chunk <> '000' ) then
    set tensones = SUBSTRING(chunk, 2, 2) ;
        set hundreds = SUBSTRING(chunk, 1, 1) ;
    set tens = SUBSTRING(chunk, 2, 1) ;
    set ones = SUBSTRING(chunk, 3, 1) ;
  END IF;
 
    IF CAST(tensones as unsigned) <= 20 OR Ones='0'
        THEN
            (SELECT nt.word into tempOutput
                                      FROM NumbersTable as nt
                                      WHERE tensones = nt.number);

      SET outputString = concat( tempOutput ,
                      CASE counter WHEN 1 THEN ''
                       WHEN 2 THEN ' thousand ' WHEN 3 THEN ' million '
                       WHEN 4 THEN ' billion '  WHEN 5 THEN ' trillion '
                       WHEN 6 THEN ' quadrillion ' WHEN 7 THEN ' quintillion '
                       WHEN 8 THEN ' sextillion '  WHEN 9 THEN ' septillion '
                       WHEN 10 THEN ' octillion '  WHEN 11 THEN ' nonillion '
                       WHEN 12 THEN ' decillion '  WHEN 13 THEN ' undecillion '
                       ELSE '' END
                               , outputString);
    ELSE
      SET outputString = concat( ' '
                            , (SELECT nt.word
                                    FROM NumbersTable as nt
                                    WHERE concat( tens ,'0') = nt.number)
                            , '-'
                            , (SELECT nt.word
                                    FROM NumbersTable as nt
                                    WHERE concat('0', ones) = nt.number)

                            , CASE counter WHEN 1 THEN ''
                               WHEN 2 THEN ' thousand ' WHEN 3 THEN ' million '
                               WHEN 4 THEN ' billion '  WHEN 5 THEN ' trillion '
                               WHEN 6 THEN ' quadrillion ' WHEN 7 THEN ' quintillion '
                               WHEN 8 THEN ' sextillion '  WHEN 9 THEN ' septillion '
                               WHEN 10 THEN ' octillion '  WHEN 11 THEN ' nonillion '
                               WHEN 12 THEN ' decillion '   WHEN 13 THEN ' undecillion '
                               ELSE '' END
                            , outputString) ;
        END IF;
  
        IF hundreds <> '0' THEN
            SET outputString = concat(
                        (SELECT nt.word FROM NumbersTable  as nt WHERE concat('0', hundreds) = nt.number)
                        , ' hundred '
                        ,outputString);                
        END IF;

    set counter = counter + 1;
    set position = position - 3 ;

END WHILE;

SET outputString = LTRIM(RTRIM(REPLACE(outputString, '  ', ' ')));
SET outputstring = CONCAT( UPPER(LEFT(outputstring, 1)) , SUBSTRING(outputstring, 2, 8000));

return outputString ;
END;