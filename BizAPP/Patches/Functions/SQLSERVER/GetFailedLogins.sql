CREATE FUNCTION GetFailedLogins 
(
	@allowedAttempts int,
	@unlockDuration int,
	@userId nvarchar(50),
	@tid int = -1
)
RETURNS int
AS
BEGIN
	-- Declare the return variable here
	return @allowedAttempts -
	(
		select count( audittrail_result ) from sessionaud where 
		[user] = @userId and audittrail_auditoperation = 1 and tid = @tid
		and audittrail_result = 0 and audittrail_audittimestamp between (GETUTCDATE() - (@unlockDuration/60.0/24.0)) and GETUTCDATE()
	)
END

