# theme-switcher

VS Code switches your theme regularly and automatically so your editor looks fresh throughout the day. It selects from all installed themes and rotates through them at a configurable interval (in hours). Perfect for those who want to escape monotony with a colorful environment!

## 🚀 Features

- ✨ **Automatic theme switching** — Switches the **Workbench Color Theme** on a configurable hourly interval.
- 🚀 **Auto-activation** — Activates automatically when VS Code starts (`onStartupFinished`) and runs initial check immediately.
- ⌨️ **Manual commands** — Control theme switching with intuitive commands:
  - **Switch Theme Now** — Immediately rotate to the next theme
  - **Pause Theme Switching** — Temporarily stop automatic switching
  - **Resume Theme Switching** — Resume automatic switching after pause
- 🎨 **Smart theme discovery** — Scans all installed extensions for contributed themes and uses each theme's label (or id) when available.
- ⏱️ **Configurable polling** — Checks at your desired interval (minutes) to determine if it's time to switch based on the hour-based threshold.

## ⚙️ Configuration

All settings can be configured in VS Code's Settings UI under **Theme Switcher** or directly in `settings.json`:

```json
{
  "themeSwitcher.switchIntervalHours": 1,
  "themeSwitcher.pollIntervalMinutes": 20,
  "themeSwitcher.enabled": true
}
```

### Setting Reference

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `themeSwitcher.switchIntervalHours` | number | 1 | Interval in **hours** between automatic theme switches. Minimum: 1 hour. Set to higher values for less frequent changes (e.g., 3, 8, 12, 24). |
| `themeSwitcher.pollIntervalMinutes` | number | 20 | How often (in **minutes**) the extension checks if it's time to switch themes. Lower values (e.g., 10–20) reduce overhead while keeping responsiveness. |
| `themeSwitcher.enabled` | boolean | true | Enable or disable automatic theme switching globally. |

### Example Configurations

**Colorful workday** (every hour):
```json
"themeSwitcher.switchIntervalHours": 1,
"themeSwitcher.pollIntervalMinutes": 15
```

**Relaxed environment** (every 8 hours):
```json
"themeSwitcher.switchIntervalHours": 8,
"themeSwitcher.pollIntervalMinutes": 30
```

**Daily rhythm** (once per day):
```json
"themeSwitcher.switchIntervalHours": 24,
"themeSwitcher.pollIntervalMinutes": 60
```

## ⌨️ Usage

### Using Commands

1. Open Command Palette (`Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on macOS)
2. Search for and run one of:
   - **Switch Theme Now** — Immediately rotate to the next theme
   - **Pause Theme Switching** — Pause automatic switching
   - **Resume Theme Switching** — Resume automatic switching

### How It Works

1. Extension activates on startup and runs an immediate theme check.
2. Periodically (every `pollIntervalMinutes`), it checks if `switchIntervalHours` time has elapsed since the last switch.
3. If the interval has passed, automatically switches to the next available theme.
4. You can manually trigger a switch with the **Switch Theme Now** command at any time.

## 🛠 Troubleshooting

### Extension doesn't activate on startup
- Run **Developer: Reload Window** (`Ctrl+Shift+P` → "Reload Window")
- Manually run **Switch Theme Now** from the Command Palette to trigger activation

### No themes are found
- Ensure that color themes are installed as VS Code extensions
- Check that theme extensions have `contributes.themes` in their `package.json`
- Run **Developer: Toggle Developer Tools** to see console logs for debugging

### Switching happens too frequently or not frequently enough
- Adjust `themeSwitcher.switchIntervalHours` for the desired frequency
- Adjust `themeSwitcher.pollIntervalMinutes` to check more or less often (doesn't affect switch frequency, just polling overhead)

### Pause/Resume not working
- Run **Developer: Reload Window** to reset extension state
- Check that `themeSwitcher.enabled` is set to `true` in settings

## 🔨 Development

To build and test locally:

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes (in development)
npm run watch

# Run linting
npm run lint

# Run tests
npm test
```

## 📋 Technical Details

- **Main entry point:** `out/extension.js` (compiled from `src/extension.ts`)
- **Theme logic:** `ThemeManager` class in `src/themeManager.ts`
- **Activation events:** `onStartupFinished`, `onCommand:theme-switcher.switchNow`
- **State storage:** Extension stores `lastSwitchTimestamp` in global state to track when the last switch occurred
- **Configuration:** Uses VS Code's workspace configuration API for runtime settings

## 🤝 Contributing

Contributions, issues, and feature suggestions are welcome! Please:

1. Open an issue to discuss changes before implementing
2. Follow the existing code style (TypeScript, ESLint configuration)
3. Write or update tests for new functionality
4. Update README and CHANGELOG as needed

## 📄 License

See LICENSE file for details.

---

**Enjoy a colorful workflow!** 🌈
