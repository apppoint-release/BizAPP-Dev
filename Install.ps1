<#
  BizAPP Install scripts. It helps to install app server or web server components and configures them.
#>
Import-Module WebAdministration

function Extract-Installer( $msiFile, $destFolder )
{
    if( !$msiFile )
    {
        $msiFile = Read-Host "Please enter the path to BizAPP MSI file"
    }
    if( !$destFolder )
    {
        $destFolder = Read-Host "Please enter the destination install folder. For e.g(D:\Program Files\BizAPP)"
    }
    if( !$msiFile -or !$destFolder )
    {
        Write-Error "One or more arguments was not specified"
	    Exit -1
    }

    # msiexec /a foo.msi TARGETDIR=C:\EXTRACT\ /qn /l*v admin_install.log

    $arguments = @(
        "/a"
        "`"$msiFile`""
	    "TARGETDIR=`"$destFolder`""
        "/qn"
	    "/L*V `"package.log`""	
    )

     Write-Verbose "Installing $msiFile....."
     $process = Start-Process -FilePath msiexec.exe -ArgumentList $arguments -Wait -PassThru
     if ($process.ExitCode -eq 0)
     {
        Write-Verbose "$msiFile has been successfully extracted"
        $installPath = Join-Path $destFolder "BizAPP"
        
        # run tools.
        $toolsPath = Join-Path $installPath "Tools\PreFetchAssemblyList.exe"
        Start-Process -FilePath $toolsPath -ArgumentList "silent `"$installPath`"" -Wait -PassThru
    } 
    else
    {
        Write-Error "Installer exit code  $($process.ExitCode) for file  $($msifile)"
	    Exit $($process.ExitCode)
    } 
}

function Install-Services( $installPath, $serviceUser, $serviceUserPwd )
{
    if( !$installPath )
    {
        $installPath = $env:BizAPPInstallPath
        if( !$installPath )
        {
           $installPath = Read-Host "Please enter the BizAPP install folder. For e.g(D:\Program Files\BizAPP)"
        }
    }
    if( !$installPath )
    {
        Write-Error "Install path was not specified"
        Exit -1
    }

    # install services
    Install-Service $installPath "BizAPP.Runtime.Registry.Host.exe" "BizAPP-$buildPrefix-RegistryService" "BizAPP-$buildPrefix-Registry" $serviceUser $serviceUserPwd 
    Install-Service $installPath "BizAPP.Runtime.ServerRole.Host.exe" "BizAPP-$buildPrefix-RoleService" "BizAPP-$buildPrefix-Roles" $serviceUser $serviceUserPwd
    Install-Service $installPath "BizAPP.Runtime.HostingAgent.exe" "BizAPP-$buildPrefix-HostingAgent" "BizAPP-$buildPrefix-Hosting Agent" $serviceUser $serviceUserPwd
    Install-Service $installPath "BizAPP.Runtime.LicenseHost.exe" "BizAPP-$buildPrefix-LicenseService" "BizAPP-$buildPrefix-LicenseService" $serviceUser $serviceUserPwd
    Install-Service $installPath "BizAPP.Runtime.SessionStateManager.exe" "BizAPP-$buildPrefix-SessionStateManager" "BizAPP-$buildPrefix-SessionStateManager" $serviceUser $serviceUserPwd
    Install-Service $installPath "BizAPP.Runtime.AutoUpdater.exe" "BizAPP-$buildPrefix-AutoUpdater" "BizAPP-$buildPrefix-AutoUpdater" $serviceUser $serviceUserPwd

    # install bootstrap.
	Install-WinService $installPath "BizAPP.BootstrapService.exe" "BizAPP-$buildPrefix-Bootstrap" "BizAPP-$buildPrefix-Bootstrap" $serviceUser $serviceUserPwd
	
	#install async service
	Install-WinService $installPath "BizAPP.AsyncServices.Host.exe" "BizAPP-$buildPrefix-AsyncService.Host" "BizAPP-$buildPrefix-AsyncService.Host" $serviceUser $serviceUserPwd
	
	# setup service dependencies if redis is required.
	$choice = Read-Host "Do you use local redis services?.(Y/N)"
    switch -Regex ( $choice )
	{
		"Y"
		{
			#install backplane services
			Install-Redis $installPath "BizAPP-$buildPrefix-BackPlane-1" 9035 redis.conf $serviceUser $serviceUserPwd
			Install-Redis $installPath "BizAPP-$buildPrefix-BackPlane-2" 9036 redis.cache.conf $serviceUser $serviceUserPwd
	
			$winPath = $env:windir	
			$winPath = Join-Path $winPath "system32\sc.exe"
			Start-Process -FilePath $winPath -WindowStyle Hidden -ArgumentList "config BizAPP-$buildPrefix-RoleService depend= `"bizapp-$buildPrefix-backplane-9036`"/`"bizapp-$buildPrefix-backplane-9035`"" -Wait -PassThru
			Start-Process -FilePath $winPath -WindowStyle Hidden -ArgumentList "config BizAPP-$buildPrefix-SessionStateManager depend= `"bizapp-$buildPrefix-backplane-9035`"" -Wait -PassThru
		}
	}
}

function Install-Redis( [ValidateNotNullorEmpty()][string]$installPath, 
                        [ValidateNotNullorEmpty()][string]$serviceName, 
                        $port, 
                        [ValidateNotNullorEmpty()][string]$confFile, 
                        $user, 
                        $pwd )
{
    $service = Get-Service $serviceName -ErrorAction SilentlyContinue
    if( !$service )
    {
        echo "$serviceName does not exist, creating it"
        $backPlanePath = Join-Path $installPath "BackPlane"
        $proc = Start-Process -FilePath "redis-server.exe" -WindowStyle hidden -WorkingDirectory $backPlanePath -ArgumentList "--service-install $confFile --service-name `"$serviceName`" --port $port --loglevel verbose" -PassThru -Wait 
        
        if( $proc.ExitCode -eq 0 -and $serviceUser -and $serviceUserPwd )
        {
            $winPath = $env:windir
            $winPath = Join-Path $winPath "system32\sc.exe"
            Start-Process -FilePath $winPath -WindowStyle Hidden -ArgumentList "config `"$serviceName`" obj= $user password= $pwd" -Wait -PassThru
        }
    }
    else
    {
        echo "$serviceName already exists"
    }
}

function Install-Service( [ValidateNotNullorEmpty()][string]$installPath, 
                            [ValidateNotNullorEmpty()][string]$serviceFile, 
                            [ValidateNotNullorEmpty()][string]$serviceName, 
                            [ValidateNotNullorEmpty()][string]$serviceDisplayName, 
                            $user, 
                            $pwd )
{
    $service = Get-Service $serviceName -ErrorAction SilentlyContinue
    If (!$service)
    {
        echo "$serviceName does not exist, creating it"
        $path = Join-Path $installPath $serviceFile
        $proc = Start-Process -FilePath $path -ArgumentList "-install `"$serviceName`" `"$serviceDisplayName`"" -Wait -PassThru
        if ($proc.ExitCode -ne 0)
        {
            Write-Error "Installer exit code  $($process.ExitCode) for service  $($serviceFile)"
        }
        else
        {
            # set user creds for the service.
            if( $user -and $pwd )
            {
                $winPath = $env:windir
                $winPath = Join-Path $winPath "system32\sc.exe"
                Start-Process -FilePath $winPath -WindowStyle Hidden -ArgumentList "config `"$serviceName`" obj= $user password= `"$pwd`"" -Wait -PassThru
            }
        }
    }
    else
    {
        echo "$serviceName already exists"
    }
}

function Install-WinService( [ValidateNotNullorEmpty()][string]$installPath, 
                            [ValidateNotNullorEmpty()][string]$serviceFile, 
                            [ValidateNotNullorEmpty()][string]$serviceName, 
                            [ValidateNotNullorEmpty()][string]$serviceDisplayName, 
                            $user, 
                            $pwd )
{
    $service = Get-Service $serviceName -ErrorAction SilentlyContinue
    If (!$service)
    {
        echo "$serviceName does not exist, creating it"
		$winPath = $env:windir
        $winPath = Join-Path $winPath "system32\sc.exe"
		
        $path = Join-Path $installPath $serviceFile
        $proc = Start-Process -FilePath $winPath -ArgumentList "create `"$serviceName`" binPath= `"$path`" DisplayName= `"$serviceDisplayName`"" -Wait -PassThru
		# set user creds for the service.
		if( $user -and $pwd )
		{
			Start-Process -FilePath $winPath -WindowStyle Hidden -ArgumentList "config `"$serviceName`" obj= $user password= `"$pwd`"" -Wait -PassThru
		}
    }
    else
    {
        echo "$serviceName already exists"
    }
}

function Remove-Services( )
{
    Remove-Service "BizAPP-$buildPrefix-Bootstrap"
    Remove-Service "BizAPP-$buildPrefix-AsyncService.Host"
    Remove-Service "BizAPP-$buildPrefix-RegistryService"
    Remove-Service "BizAPP-$buildPrefix-RoleService"
    Remove-Service "BizAPP-$buildPrefix-HostingAgent"
    Remove-Service "BizAPP-$buildPrefix-LicenseService"
    Remove-Service "BizAPP-$buildPrefix-SessionStateManager"
    Remove-Service "BizAPP-$buildPrefix-AutoUpdater"
    Remove-Service "BizAPP-$buildPrefix-BackPlane-1"
    Remove-Service "BizAPP-$buildPrefix-BackPlane-2"
}

function Remove-Service( [ValidateNotNullorEmpty()][string] $serviceName )
{
    $winPath = $env:windir
    $winPath = Join-Path $winPath "system32\sc.exe"
    $service = Get-Service $serviceName -ErrorAction SilentlyContinue
    If ( $service )
    {
        #stop service and remove them
        Stop-Service -Name "$serviceName"
        Start-Process -FilePath $winPath -WindowStyle Hidden -ArgumentList "delete `"$serviceName`"" -Wait -PassThru
    }
} 

function Setup-IIS( [ValidateNotNullorEmpty()][string] $installPath, 
                    $appPoolUser, 
                    $appPoolUserPwd )
{
    $iisAppPoolName = "BizAPP Pool"
    $iisAppPoolDotNetVersion = "v4.0"
    $iisAppName = "BizAPP"
    
	$poolPath = "IIS:\AppPools\$iisAppPoolName"
    if (!(Test-Path $poolPath -pathType container))
    {
        #create the app pool
        $appPool = New-Item $poolPath
        $appPool | Set-ItemProperty -Name "managedRuntimeVersion" -Value $iisAppPoolDotNetVersion
    }
    
    #set default site path
    $webPath = Join-Path $installPath "Webclient"
    Set-ItemProperty "IIS:\Sites\Default Web Site\" -name "physicalPath" -value $webPath
    Set-ItemProperty 'IIS:\Sites\Default Web Site' applicationPool $iisAppPoolName
	
	if( $appPoolUser -and $appPoolUserPwd )
    {
        Write-Host "Setting app pool identity to supplied user credentials"
        Set-ItemProperty IIS:\AppPools\$iisAppPoolName -name processModel -value @{userName=$appPoolUser;password=$appPoolUserPwd;identitytype=3}
    }
	# set default anonymous authentication to app pool identity.
	Set-WebConfigurationProperty -filter /system.WebServer/security/authentication/AnonymousAuthentication -name username -value "" -location "Default Web Site" -PSPath 'IIS:\' -verbose
}

function Install-GacAssemblies([ValidateNotNullorEmpty()][string]$installPath)
{
    [System.Reflection.Assembly]::Load("System.EnterpriseServices, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a")            
    $publish = New-Object System.EnterpriseServices.Internal.Publish

    $path = Join-Path $installPath "GAC\SQLite\SQLitex86\System.Data.SQLite.dll"
    $publish.GacInstall($path)

    $path = Join-Path $installPath "GAC\SQLite\SQLitex64\System.Data.SQLite.dll"
    $publish.GacInstall($path)
}

function Uninstall-GacAssemblies([ValidateNotNullorEmpty()][string]$installPath)
{
    [System.Reflection.Assembly]::Load("System.EnterpriseServices, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a")            
    $publish = New-Object System.EnterpriseServices.Internal.Publish

    $path = Join-Path $installPath "ManagedHost.dll"
    $publish.GacRemove($path)

    $path = Join-Path $installPath "GAC\SQLite\SQLitex86\System.Data.SQLite.dll"
    $publish.GacRemove($path)

    $path = Join-Path $installPath "GAC\SQLite\SQLitex64\System.Data.SQLite.dll"
    $publish.GacRemove($path)
}

function Setup-AppServer( $installPath )
{
	Install-GacAssemblies $installPath
	# run tools.
	$toolsPath = Join-Path $installPath "Tools\PreFetchAssemblyList.exe"
	Start-Process -FilePath $toolsPath -ArgumentList "silent `"$installPath`"" -Wait -PassThru
	
	$choice = Read-Host "Do you want to setup services to use another user account?.(Y/N)"
    switch -Regex ( $choice )
    {
        "Y"
        {
            $user = Read-Host "Enter user name"
			$pwd = Read-Host "Enter user password"
			
            if( !$user -or !$pwd )
            {
                Write-Error "User name or password was not entered correctly"
                Exit -1
            }
            echo "Installing services"
            Install-Services $installPath $user $pwd
        }
		"N"
		{
			Install-Services $installPath $null $null
		}
    }
	# setup powershell reg keys
	Add-PowershellRegistryKeys $installPath
	
	# install ngen assemblies.
	$choice = Read-Host "Do you want to NGen assemblies?.(Y/N)"
    switch -Regex ( $choice )
	{
		"Y"
		{
			Install-NGenAssemblies $installPath "install"
		}
	}
}

function Setup-WebServer( $installPath )
{
	Install-GacAssemblies $installPath
		
	$choice = Read-Host "Do you want to setup IIS to use another user account?.(Y/N)"
    switch -Regex ( $choice )
    {
        "Y"
        {
            $user = Read-Host "Enter user name"
			$pwd = Read-Host "Enter user password"
			
            if( !$user -or !$pwd )
            {
                Write-Error "User name or password was not entered correctly"
                Exit -1
            }
            echo "Setting up IIS"
            Setup-IIS $installPath $user $pwd
        }
		"N"
		{
			Setup-IIS $installPath $null $null
		}
    }
	# install ngen assemblies.
	$choice = Read-Host "Do you want to NGen assemblies?.(Y/N)"
    switch -Regex ( $choice )
	{
		"Y"
		{
			Install-NGenAssemblies $installPath "install"
		}
	}
}

function Setup-Prerequisites( $installPath )
{
    Install-GacAssemblies $installPath
	# run tools.
	$toolsPath = Join-Path $installPath "Tools\PreFetchAssemblyList.exe"
	Start-Process -FilePath $toolsPath -ArgumentList "silent `"$installPath`"" -Wait -PassThru
	
    $choice = Read-Host "Do you want to setup services/IIS to use another user account?.(Y/N)"
    switch -Regex ( $choice )
    {
        "Y"
        {
            $user = Read-Host "Enter user name"
			$pwd = Read-Host "Enter user password" -AsSecureString
						
            if( !$user -or !$pwd )
            {
                Write-Error "User name or password was not entered correctly"
                Exit -1
            }
			$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($pwd)
			$pwd = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
			
            echo "Installing services"
            Install-Services $installPath $user $pwd

            echo "Setting up IIS AppPool and Site"
            Setup-IIS $installPath $user $pwd
        }
		"N"
		{
			echo "Installing services"
            Install-Services $installPath $null $null

            echo "Setting up IIS AppPool and Site"
            Setup-IIS $installPath $null $null
		}
    }
	# setup powershell reg keys
	Add-PowershellRegistryKeys $installPath
	
	# install ngen assemblies.
	$choice = Read-Host "Do you want to NGen assemblies?.(Y/N)"
    switch -Regex ( $choice )
	{
		"Y"
		{
			Install-NGenAssemblies $installPath "install"
		}
	}
}

function Install-NGenAssemblies( [ValidateNotNullorEmpty()][string]$installPath, $cmd )
{
    $netFolder = [System.Runtime.InteropServices.RuntimeEnvironment]::GetRuntimeDirectory()
    $ngenPath = Join-Path $netFolder "ngen.exe"

    echo "Command:$cmd"

    $workingDir = $installPath
    $arr = Get-ChildItem -Path $workingDir -File -Include *Perpetuum* -Recurse | Select Name
	
    foreach( $item in $arr )
    {
		$name = $item.Name
        $path = Join-Path $workingDir $name
		echo "Adding $path to ngen queue"
        Start-Process -FilePath $ngenPath -WorkingDirectory "$workingDir" -WindowStyle Hidden -ArgumentList '$cmd `"$path`"' -Wait -PassThru
    }
	
    #webclient bin assemblies
    $workingDir = Join-Path $installPath "WebClient\bin"
    $arr = Get-ChildItem -Path $workingDir -File -Recurse -Exclude *App_*,*BizAPP*,*.exe*,*.config -Include *.dll | Select Name
    foreach( $item in $arr )
    {
		$name = $item.Name
        $path = Join-Path $workingDir $name
		echo "Adding $path to ngen queue"
        Start-Process -FilePath $ngenPath -WorkingDirectory "$workingDir" -WindowStyle Hidden -ArgumentList '$cmd `"$path`" /AppBase:`"$workingDir`"' -Wait -PassThru
    }
}

function Add-PowershellRegistryKeys( $installPath )
{
	$psiReg = Get-ItemProperty -Path HKLM:\SOFTWARE\Microsoft\PowerShell\1\PowerShellSnapIns -ErrorAction SilentlyContinue
	if(!$psiReg)
	{
		New-Item -Path HKLM:\SOFTWARE\Microsoft\PowerShell\1 -Name PowerShellSnapIns
	}
	$psReg = Get-ItemProperty -Path HKLM:\SOFTWARE\Microsoft\PowerShell\1\PowerShellSnapIns\BizAPPCmdlets -ErrorAction SilentlyContinue
	if( !$psReg )
	{
		New-Item -Path HKLM:\SOFTWARE\Microsoft\PowerShell\1\PowerShellSnapIns -Name BizAPPCmdlets
		$path = "HKLM:\SOFTWARE\Microsoft\PowerShell\1\PowerShellSnapIns\BizAPPCmdlets"
		New-ItemProperty -Path $path -Name "PowerShellVersion" -Value "3.0"
		New-ItemProperty -Path $path -Name "Vendor" -Value "AppPoint Software Solutions"
		New-ItemProperty -Path $path -Name "Description" -Value "BizAPP PowerShell commands"
		New-ItemProperty -Path $path -Name "Version" -Value "1.1.0.37"
		New-ItemProperty -Path $path -Name "ApplicationBase" -Value "$installPath"
		New-ItemProperty -Path $path -Name "ModuleName" -Value "$installPath\Runtime\BizAPP.Runtime.PowerShell.dll"
		New-ItemProperty -Path $path -Name "AssemblyName" -Value "BizAPP.Runtime.PowerShell, Version=1.1.0.37, Culture=neutral, PublicKeyToken=895b644ef4b347d4"
	}
}

$msiFile = "c:\temp\BizAPPSetup_x64.msi"
$destFolder = "D:\views\GitRepos\devrelease"

$installPath = Resolve-Path ".\BizAPP" -ErrorAction SilentlyContinue
$serviceUser = ""
$serviceUserPwd = ""

$frameworkVersion = (Get-ItemProperty -Path "HKLM:SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full" -ErrorAction SilentlyContinue).Release
if ( $frameworkVersion -lt 528040 )
{
	echo ".NET Framework 4.8 version is not installed"
	Exit -1;
}

if( !$installPath -or !(Test-Path $installPath ) )
{
	$installPath = Read-Host "Please enter the path to BizAPP folder"
}

$versionAssemblyPath = Join-Path $installPath "Webclient\bin\BizAPP.Common.Version.dll"
Add-Type -Path $versionAssemblyPath
$buildPrefix = [BizAPP.Common.BuildInfo]::Instance.FriendlyName
echo "Build prefix $buildPrefix"
if( !$buildPrefix )
{
	echo "Build prefix could not be determined from the assembly"
	Exit -1;
}
	
echo "Using BizAPP install path: $installPath"

# extract files.
# Extract-Installer $msiFile $destFolder

#Install services
#Install-Services $installPath $serviceUser $serviceUserPwd

#Remove services
#Remove-Services

#Install GAC assemblies
#Install-GacAssemblies $installPath

#Uninstall GAC assemblies
#Uninstall-GacAssemblies $installPath

# NGen assemblies
#Install-NGenAssemblies $installPath "install"

# Uninstall ngen assemblies
#Install-NGenAssemblies $installPath "uninstall"

# Add powershell keys
#Add-PowershellRegistryKeys $installPath

# one time pre-requisites setup.
Setup-Prerequisites $installPath

# setup appsrvr
#Setup-AppServer $installPath

# setup web srvr
#Setup-WebServer $installPath