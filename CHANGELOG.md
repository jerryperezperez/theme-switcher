# Change Log

All notable changes to the "theme-switcher" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.1] - 2026-02-02

### Added
- **Automatic theme switching** — Switches VS Code workbench color theme at a configurable hourly interval
- **Hour-based switching** — `themeSwitcher.switchIntervalHours` setting (default: 1 hour) for theme rotation frequency
- **Configurable polling** — `themeSwitcher.pollIntervalMinutes` setting (default: 20 minutes) to control check frequency
- **Manual switch command** — "Switch Theme Now" command to immediately rotate to the next theme
- **Pause/Resume commands** — "Pause Theme Switching" and "Resume Theme Switching" commands for temporary control
- **Enable/Disable toggle** — `themeSwitcher.enabled` setting to globally enable or disable the extension
- **Auto-activation** — Extension activates automatically on VS Code startup (`onStartupFinished`)
- **Smart theme discovery** — Scans all installed extensions and discovers available color themes
- **Settings UI support** — Full configuration support via VS Code Settings UI under "Theme Switcher"
- **Comprehensive tests** — Unit tests for ThemeManager class covering all major functionality
- **Complete documentation** — Detailed README with usage examples, configuration options, and troubleshooting guide

### Technical Details
- Built with TypeScript and VS Code Extension API
- Uses global state storage to track last switch timestamp
- Implements hour-based interval checking with minute-based polling
- Includes pause/resume state management
- ESLint and TypeScript compilation configured
