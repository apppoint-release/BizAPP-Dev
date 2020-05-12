Development Release
=====================

# Setup Instructions
## GitHub and Git Tools

* Install Git Bash or Source Tree on your local machine.

## Cloning Repository

* Navigate to GitHub online and to the right repository.
* Click clone and use https option.
* Copy the URL and open Source Tree on your local machine.
* Clone the repository to your local folder.

## BizAPP Installation

* Make sure that old BizAPP build is uninstalled and no zombie services are running.
* Remove the services that should have been uninstalled. 
* Navigate to the repository in a command line and use powershell to run the scripts. 
* In the command line, run the following commands. 
**powershell** (shows the powershell window with a prompt PS>)       
**.\Install.ps1** (If you want to setup services and iis to run as domain user account, then enter the inputs upon prompt)
* Setup BizAPP configurations such as registry, web.config and config.config and start the services. 
* IIS will point to repository\BizAPP\Webclient folder and can be run as windows user.