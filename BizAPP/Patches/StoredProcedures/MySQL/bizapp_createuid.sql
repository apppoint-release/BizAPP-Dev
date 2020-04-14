DELIMITER $$
CREATE PROCEDURE `bizapp_createuid`(count INT,name varchar(20),tid int)
BEGIN

      DECLARE id INT;

      SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

      START TRANSACTION;

      update `ent_systemproperties` e1 set integervalue = integervalue + count where `e1`.`name` = name and `e1`.`tid` = tid; 

      SELECT `integervalue` - count + 1 INTO id from `ent_systemproperties` e1 where `e1`.`name` = name and `e1`.`tid` = tid;
      select id into @tempuidtable;
      select id;
      COMMIT;
END
