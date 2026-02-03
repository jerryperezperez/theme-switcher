# Quick Start Guide for Theme Switcher Development

## 🚀 5-Minute Setup

### Prerequisites

- Node.js 18+ and npm
- Visual Studio Code 1.108.1+
- Git (for version control)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/theme-switcher.git
cd theme-switcher/theme-switcher

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run tests to verify setup
npm test
```

### Debug the Extension

1. Open the project in VS Code
2. Press `F5` or go to **Run → Start Debugging**
3. A new VS Code window opens with the extension loaded
4. Open Command Palette (`Ctrl+Shift+P`) and try:
   - **Switch Theme Now** — Switches immediately
   - **Pause Theme Switching** — Pauses auto-switching
   - **Resume Theme Switching** — Resumes auto-switching

## 📝 Common Development Tasks

### Watch Mode (Auto-compile)

```bash
npm run watch
```

Automatically compiles TypeScript when files change. Keep this running during development.

### Run Tests

```bash
npm test
```

Runs the full test suite. Tests check:
- Theme discovery
- Theme switching logic
- Hour-based interval calculations
- Pause/resume functionality
- Configuration handling

### Lint Code

```bash
npm run lint
```

Checks code style and quality. All code must pass linting before committing.

### Full Build

```bash
npm run compile && npm run lint && npm test
```

Runs all quality checks. Do this before committing.

## 🔨 Making Changes

### Adding a New Feature

1. Create a branch: `git checkout -b feature/my-feature`
2. Edit files in `src/`
3. Add tests in `src/test/`
4. Run: `npm run compile && npm run lint && npm test`
5. Commit: `git commit -m "feat: add my feature"`
6. Push and create a pull request

### Adding a New Command

1. Add to `package.json` `contributes.commands`:
   ```json
   {
     "command": "theme-switcher.myCommand",
     "title": "My Command Title"
   }
   ```

2. Register in `src/extension.ts`:
   ```typescript
   vscode.commands.registerCommand('theme-switcher.myCommand', () => {
     // Your implementation
   });
   ```

3. Add tests for the command

### Adding a New Setting

1. Add to `package.json` `contributes.configuration.properties`:
   ```json
   "themeSwitcher.newSetting": {
     "type": "string",
     "default": "value",
     "description": "Description"
   }
   ```

2. Read in code:
   ```typescript
   const value = vscode.workspace
     .getConfiguration('themeSwitcher')
     .get('newSetting', 'default');
   ```

3. Add tests and documentation

## 🧪 Testing

### Run Specific Test

```bash
npm test -- --grep "switchToNextTheme"
```

### Debug a Test

1. Set a breakpoint in the test file
2. Run tests in debug mode: `npm test`
3. The debugger pauses at breakpoints

### Write a New Test

Add to `src/test/extension.test.ts`:

```typescript
test('my new test', () => {
  assert.ok(true, 'Should pass');
});
```

## 📖 Understanding the Code

### File Structure

- **`extension.ts`** — Entry point, activates extension, registers commands
- **`themeManager.ts`** — Core logic for theme switching and polling
- **`test/extension.test.ts`** — Unit tests

### Key Files to Know

- `package.json` — Extension manifest and configuration
- `tsconfig.json` — TypeScript compilation settings
- `eslint.config.mjs` — Code linting rules
- `README.md` — User documentation
- `DEVELOPMENT.md` — Deep technical guide

## 🐛 Debugging Tips

### View Console Output

1. Start debugging (F5)
2. In the debug console, you'll see `console.log()` output
3. Look for messages like:
   - "Theme Switcher extension is now active!"
   - "Hours since last switch: X.XX"
   - "Theme switched from X to Y"

### Use VS Code's Debug Features

- **Breakpoints** — Click left margin to add
- **Step over** (`F10`) — Execute next line
- **Step into** (`F11`) — Enter function
- **Step out** (`Shift+F11`) — Exit function
- **Continue** (`F5`) — Run to next breakpoint

### Check Extension Logs

1. In the debug window, open **Debug Console** tab
2. All extension logs appear here
3. Filter by extension name: `theme-switcher`

## 📋 Workflow Example

### Making a Simple Change

```bash
# Start watch mode
npm run watch

# In another terminal, run tests continuously
npm test

# Edit a file (auto-compiles)
# Edit: src/themeManager.ts

# Tests run automatically if watching
# Fix any lint errors reported

# When ready, commit
git add .
git commit -m "fix: improve theme switching logic"
```

## ✅ Before Committing

```bash
npm run compile     # TypeScript
npm run lint        # ESLint
npm test            # Tests
```

All three must pass before committing.

## 🚀 Publishing

See `PUBLISHING.md` for full publishing instructions.

Quick version:

```bash
# Update version and changelog
# Edit: package.json (version field)
# Edit: CHANGELOG.md (add new version)

# Package extension
npm run vscode:prepublish
vsce package

# Publish (requires token)
vsce publish --token <your-token>
```

## 📚 More Information

- **[README.md](./README.md)** — User guide
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** — Technical deep dive
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — Contribution guidelines
- **[CHANGELOG.md](./CHANGELOG.md)** — Version history
- **[PUBLISHING.md](./PUBLISHING.md)** — Publishing guide

## ❓ Common Questions

**Q: How do I reload the extension during debugging?**
A: The new window auto-updates when you save files. Press `Ctrl+Shift+P` → "Developer: Reload Window" to force reload.

**Q: How do I test with a specific VS Code version?**
A: Edit `.nvmrc` or `package.json` `engines.vscode` field, then reinstall dependencies.

**Q: Can I debug tests?**
A: Yes, set breakpoints in test files and they'll pause during `npm test`.

**Q: Where are user settings stored?**
A: In VS Code's `settings.json` or Settings UI. Tests use mock storage.

## 🎉 You're Ready!

You now have everything you need to develop the Theme Switcher extension. Happy coding! 🚀

For more detailed information, see the other documentation files in this project.
