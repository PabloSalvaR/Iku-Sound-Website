$memoryPath = Join-Path $PSScriptRoot 'memory.json'
if (-not (Test-Path $memoryPath)) {
    Write-Warning "No memory.json file found."
    exit 0
}
$raw = Get-Content -Path $memoryPath -Raw
if ([string]::IsNullOrWhiteSpace($raw)) {
    Write-Warning "memory.json is empty."
    exit 0
}
$entries = $raw | ConvertFrom-Json
if ($null -eq $entries) {
    Write-Warning "No entries parsed from memory.json."
    exit 0
}
$ordered = @($entries) | Sort-Object { $_.timestamp }
foreach ($entry in $ordered) {
    Write-Host ('[' + $entry.timestamp + '] ' + $entry.summary)
    if ($entry.details) {
        foreach ($line in $entry.details) {
            Write-Host ('  - ' + $line)
        }
    }
    Write-Host ''
}
