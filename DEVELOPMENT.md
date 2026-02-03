# Development Guide for Theme Switcher

This guide provides detailed information about the architecture and development of the Theme Switcher extension.

## Project Structure

```
theme-switcher/
├── src/
│   ├── extension.ts          # Main extension entry point
│   ├── themeManager.ts       # Core theme switching logic
│   └── test/
│       └── extension.test.ts # Test suite
├── out/                       # Compiled JavaScript (generated)
├── .vscode/                   # VS Code settings for development
├── package.json              # Extension manifest
├── tsconfig.json             # TypeScript configuration
├── eslint.config.mjs         # ESLint configuration
└── README.md                 # User documentation
```

## Architecture

### Extension Flow

```
activate() 
  └─> ThemeManager.start()
      ├─> checkAndSwitch() [immediate]
      └─> setInterval(checkAndSwitch, pollIntervalMs)
          └─> Every pollIntervalMinutes:
              └─> If hoursPassed >= switchIntervalHours:
                  └─> switchToNextTheme()
```

### Key Classes and Methods

#### `extension.ts`

- `activate(context)` — Called when extension activates. Initializes ThemeManager and registers commands.
- `deactivate()` — Called on extension deactivation. Cleans up resources.

#### `themeManager.ts`

**Public Methods:**

- `start()` — Initializes polling and runs first check
- `stop()` — Stops polling
- `checkAndSwitch()` — Checks if interval elapsed, switches if needed
- `switchToNextTheme()` — Changes to next theme in rotation
- `pause()` — Pauses automatic switching (user-controlled)
- `resume()` — Resumes automatic switching
- `isPaused()` — Returns pause state
- `getAllThemes()` — Scans and returns all available themes
- `getCurrentTheme()` — Gets currently active theme

**Key Logic:**

```typescript
// Hour-based interval calculation
hoursPassed = (now - lastSwitchTime) / (1000 * 60 * 60)
if (hoursPassed >= switchIntervalHours) {
  switchToNextTheme()
}
```

## Configuration System

### Settings Hierarchy

1. **Default values** (defined in package.json)
2. **User settings** (overrides defaults)
3. **Workspace settings** (highest priority)

### Reading Configuration

```typescript
const config = vscode.workspace.getConfiguration('themeSwitcher');
const hours = config.get<number>('switchIntervalHours', 1);
```

## State Management

The extension uses VS Code's global state to persist data across sessions:

- `lastSwitchTimestamp` (number) — Unix timestamp of last theme switch
- `paused` (boolean) — Current pause state

```typescript
// Reading state
const timestamp = context.globalState.get<number>('lastSwitchTimestamp', 0);

// Writing state
context.globalState.update('lastSwitchTimestamp', Date.now());
```

## Command Implementation

All commands are registered in `extension.ts`:

```typescript
vscode.commands.registerCommand('theme-switcher.switchNow', () => {
  void themeManager?.switchToNextTheme();
});
```

Commands appear in the Command Palette and can be mapped to keyboard shortcuts by users.

## Testing

### Test Structure

Tests are organized by functionality:

1. **ThemeManager tests** — Individual method testing
2. **Integration tests** — Hour-based calculations and state management
3. **Configuration tests** — Settings reading and validation

### Running Tests

```bash
npm run pretest  # Compile and lint
npm test         # Run tests with VS Code Test API
```

### Mock Objects

A `MockMemento` class simulates VS Code's state storage for unit testing without full VS Code context.

### Test Coverage Goals

- getAllThemes() — returns array
- getCurrentTheme() — returns string or undefined
- switchToNextTheme() — updates timestamp, changes theme
- checkAndSwitch() — respects hours interval
- pause/resume — manages state
- Hours calculation — correctly determines elapsed time

## Adding New Features

### Example: New Configuration Option

1. **Add to package.json** `contributes.configuration.properties`:
   ```json
   "themeSwitcher.newOption": {
     "type": "string",
     "default": "value",
     "description": "..."
   }
   ```

2. **Read in themeManager.ts**:
   ```typescript
   const config = vscode.workspace.getConfiguration('themeSwitcher');
   const newOption = config.get<string>('newOption', 'default');
   ```

3. **Test it**:
   ```typescript
   test('new option should have default value', () => {
     vscode.workspace.getConfiguration('themeSwitcher')
       .update('newOption', 'test');
     // assert behavior
   });
   ```

4. **Document it** in README.md

### Example: New Command

1. **Add to package.json** `contributes.commands`:
   ```json
   {
     "command": "theme-switcher.newCommand",
     "title": "New Command Title"
   }
   ```

2. **Register in extension.ts**:
   ```typescript
   vscode.commands.registerCommand('theme-switcher.newCommand', () => {
     // implementation
   });
   ```

3. **Add tests** for the new command
4. **Update README** with usage instructions

## Debugging

### Enable Debug Console

1. Press `F5` in VS Code to start debugging
2. The extension runs in a new VS Code window
3. Use the Debug Console to see `console.log()` output

### Debug Output

The extension logs useful information:

```typescript
console.log(`Hours since last switch: ${hoursPassed.toFixed(2)}`);
console.log(`Theme switched from "${currentTheme}" to "${nextTheme}"`);
```

### Breakpoints

Set breakpoints in any TypeScript file; they work automatically during debugging.

## Performance Considerations

### Polling Interval

- Default: 20 minutes
- Minimum: 1 minute
- Affects CPU usage and battery drain

### Theme Discovery

- Runs once at startup via `getAllThemes()`
- Scans all extensions' `contributes.themes`
- Typically 50-200 themes in a full installation

### Memory Usage

- Stores only two pieces of state: timestamp and pause flag
- Very lightweight extension (~50KB compiled)

## Common Issues and Solutions

### Tests not finding themes

Tests may run with limited theme availability. Mock or provide default themes in test setup.

### Configuration not updating

Configuration changes require extension reload or command re-registration.

### Timing Issues

Always use `Date.now()` for timestamps; don't rely on system time for intervals.

## Publishing to VS Code Marketplace

Before publishing:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Set `publisher` field in `package.json`
4. Install vsce: `npm install -g vsce`
5. Create Azure DevOps token
6. Create publisher: `vsce create-publisher <name>`
7. Package extension: `vsce package`
8. Publish: `vsce publish`

See [VS Code Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) for details.

## License

This project is licensed under the MIT License. See LICENSE file for details.
