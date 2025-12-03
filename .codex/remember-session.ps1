param(
    [Parameter(Mandatory = $true)][string]$Summary,
    [string[]]$Details,
    [string]$Timestamp
)

$memoryPath = Join-Path $PSScriptRoot 'memory.json'
if (-not (Test-Path $memoryPath)) {
    '[]' | Set-Content -Path $memoryPath -Encoding UTF8
}
$raw = Get-Content -Path $memoryPath -Raw
if ([string]::IsNullOrWhiteSpace($raw)) {
    $entries = @()
} else {
    $entries = $raw | ConvertFrom-Json
    if ($null -eq $entries) { $entries = @() }
}
$stamp = if ([string]::IsNullOrWhiteSpace($Timestamp)) { (Get-Date).ToString('s') } else { $Timestamp }
$entry = [pscustomobject]@{
    timestamp = $stamp
    summary = $Summary
    details = $Details
}
$entries = @($entries) + $entry
$entries | ConvertTo-Json -Depth 5 | Set-Content -Path $memoryPath -Encoding UTF8
Write-Host "Saved entry for $stamp"
