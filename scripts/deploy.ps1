Param(
    [Parameter(Mandatory=$true)][string]$RemoteUser,
    [Parameter(Mandatory=$true)][string]$RemoteHost,
    [string]$RemoteDir = "/var/www/grow-earn-frontend",
    [int]$SshPort = 22
)

Push-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)

Write-Output "Installing dependencies..."
npm ci

Write-Output "Building production assets..."
npm run build

Write-Output "Copying files to $RemoteUser@$RemoteHost:$RemoteDir (port $SshPort)"
# Requires scp (OpenSSH) available on Windows. You can also use WinSCP or other tools.
scp -P $SshPort -r .\dist\* "$RemoteUser@$RemoteHost:$RemoteDir"

Write-Output "Deployment complete."
Pop-Location
