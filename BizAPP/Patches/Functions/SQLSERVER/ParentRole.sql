CREATE FUNCTION ParentRole
(
	-- Add the parameters for the function here
	@roleid nvarchar(max),
	@tid int
)
RETURNS nvarchar(max)
AS
BEGIN
	declare @parentroleid nvarchar(max)
	
	select @parentroleid = r2.uniqueid from [role] r1
	inner join r_role_role rr on rr.child = r1.uniqueid and rr.tid = @tid
	inner join [role] r2 on r2.uniqueid = rr.parent and r2.tid = @tid
	where r1.tid = @tid and r1.uniqueid = @roleid

	return @parentroleid
END
 

