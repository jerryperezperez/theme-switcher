# Marketplace Publishing Configuration

## Before Publishing

Before publishing to the VS Code Marketplace, ensure:

1. **Update version** in `package.json` (semantic versioning)
2. **Update CHANGELOG.md** with new version and features
3. **Set publisher** field in `package.json`:
   ```json
   "publisher": "your-publisher-name"
   ```
4. **Verify** all tests pass: `npm test`
5. **Verify** linting passes: `npm run lint`
6. **Create icon** (128x128 PNG) and set in `package.json`:
   ```json
   "icon": "icon.png"
   ```

## Publishing Steps

```bash
# Install vsce globally (one time)
npm install -g vsce

# Create publisher (one time)
vsce create-publisher <publisher-name>

# Package extension
vsce package

# Publish (requires Azure DevOps token)
vsce publish --token <your-token>
```

## Repository URLs

Update `package.json` with:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/yourusername/theme-switcher"
},
"bugs": {
  "url": "https://github.com/yourusername/theme-switcher/issues"
},
"homepage": "https://github.com/yourusername/theme-switcher#readme"
```

## Marketplace Assets

- **Icon**: 128x128 PNG
- **Banner**: 256x140 PNG (optional)
- **Description**: Updated in `package.json`
- **Keywords**: Set in `package.json`
- **Categories**: Set in `package.json`

## Versioning

Use Semantic Versioning (MAJOR.MINOR.PATCH):

- `0.0.1` - Initial release
- `0.1.0` - First minor update
- `1.0.0` - First major release

## Support

For help with publishing:
- [VS Code Extension Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [VSCE Documentation](https://github.com/microsoft/vscode-vsce)
