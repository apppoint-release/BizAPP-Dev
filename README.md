Development Release
=====================
# 08/06/2019
* .NET 4.8 upgrade

# 04/01/2019
* Initial setup with optimized build structure.

# Setup Instructions
## Bitbucket and Git Tools

* Install Git Bash and Source Tree on your local machine.
* Setup ssh authentication for your account.

## Cloning Repository

* Navigate to bitbucket online and to the right repository.
* Click clone and use ssh/https option.
* Copy the URL and open Source Tree on your local machine.
* Clone the repository to your local folder. Use the right branch depending on the repository. For e.g customer specific repo's may have multiple branches.

### Git Large File Storage (LFS)

* All repositories use git LFS to track large files.
* As soon as a repo is created, initialize it with LFS. Navigate to the newly created repo folder and run the following command.
**git lfs install**   
* If the repo is already initialied before lfs is installed, then make sure the following command is run.
**git lfs pull**      
* If you see any errors related to smudged files, then run the following commands in the repo.
**git lfs install --skip-smudge**     
**git lfs pull**      
**git lfs install --force**
* The above commands will re-initialize smudged files from the remote repository.

## BizAPP Installation

* Make sure that old BizAPP build is uninstalled and no zombie services are running.
* Remove the services that should have been uninstalled. 
* Navigate to the repository in a command line and use powershell to run the scripts. 
* In the command line, run the following commands. 
**powershell** (shows the powershell window with a prompt PS>)       
**.\Install.ps1** (If you want to setup services and iis to run as domain user account, then enter the inputs upon prompt)
* Setup BizAPP configurations such as registry, web.config and config.config and start the services. 
* IIS will point to repository\BizAPP\Webclient folder and can be a