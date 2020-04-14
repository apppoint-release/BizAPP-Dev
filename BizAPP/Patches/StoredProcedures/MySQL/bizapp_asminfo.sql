DELIMITER $$
CREATE PROCEDURE `bizapp_asminfo`()
BEGIN
	
	SELECT `a1`.`uniqueid`,`a1`.`object_name` as 'objecttype',`a1`.`uniqueid` as 'objecttypeid',`a1`.`extends`,`a1`.`hierarchy`,`a1`.`references`,`a1`.`defaultview`,`a1`.`defaultform`,`a1`.`quickcreateform`,`a1`.`defaultquery`,`a1`.`tid` from `assembly_info` AS `a1`;
END