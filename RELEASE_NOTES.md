## v0.0.2 - Theme Application Fix

### 🐛 Bug Fix
- **Fixed theme selection logic** - Theme Switcher now correctly applies themes by their ID instead of label
  - Visual Studio Code internally relies on theme IDs for proper theme application
  - Previously, some themes wouldn't apply correctly due to label-based matching
  
### 📝 What to do
If you experienced themes not switching properly, simply update to this version and themes should now apply correctly.

### 📦 Installation
- Update from the VS Code Extensions Marketplace, or
- Download `theme-switcher-0.0.2.vsix` and install from VSIX file

---
*Made with ❤️ by [@jerryperezperez](https://github.com/jerryperezperez)*