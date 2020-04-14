DELIMITER $$
CREATE FUNCTION `ParentRole`( roleid varchar(100))
RETURNS varchar(1024)
BEGIN
	declare parentroleid nvarchar(1024);
	
	select r2.uniqueid into parentroleid from role r1
	inner join r_role_role rr on rr.child = r1.uniqueid
	inner join role r2 on r2.uniqueid = rr.parent
	where r1.uniqueid = roleid;

	return parentroleid;
END