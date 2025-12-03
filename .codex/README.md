# Codex Memory

This folder stores Codex helper scripts plus a lightweight log that captures what happened in each session.

## Files
- memory.json: chronological log of session notes.
- emember-session.ps1: append a new entry to the log.
- show-memory.ps1: pretty-print the existing log to the console.

## Usage
`powershell
# Save a new note
pwsh -ExecutionPolicy Bypass -File .codex/remember-session.ps1 -Summary "Short title" -Details "detail one" "detail two"

# Review everything
pwsh -ExecutionPolicy Bypass -File .codex/show-memory.ps1
`
