# Contributing to Theme Switcher

Thank you for considering contributing to the Theme Switcher extension! This document outlines the process for contributing to this project.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check the GitHub Issues to see if the problem has already been reported. When filing a bug report, include:

- A clear and descriptive title
- A detailed description of the issue
- Steps to reproduce the behavior
- Expected vs. actual behavior
- Screenshots if applicable
- Your VS Code and extension version

### Suggesting Features

Feature suggestions are tracked as GitHub Issues with the `enhancement` label. When suggesting a feature:

- Use a clear and descriptive title
- Provide a detailed description of the suggested feature
- Explain why this feature would be useful
- List any similar features in other tools or extensions

### Pull Requests

1. **Fork the repository** and create a branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Make your changes** and ensure code quality:
   ```bash
   npm run lint
   npm run compile
   npm test
   ```

4. **Commit your changes** with clear commit messages:
   ```bash
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork** and submit a pull request to `main` branch

6. **Describe your changes** in the PR:
   - Link any related issues
   - Describe what changed and why
   - Include any breaking changes

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Visual Studio Code 1.108.1 or higher

### Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/theme-switcher.git
cd theme-switcher

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes during development
npm run watch

# Run linting
npm run lint

# Run tests
npm test
```

### Running the Extension

1. Open the project folder in VS Code
2. Press `F5` or go to **Run → Start Debugging**
3. This opens a new VS Code window with the extension loaded
4. Test the extension functionality

## Code Style

This project uses:

- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** (configured via ESLint) for code formatting

Please ensure your code passes linting before submitting a PR:

```bash
npm run lint
```

## Testing

All contributions should include appropriate tests:

- Add unit tests for new features in `src/test/`
- Ensure existing tests pass: `npm test`
- Aim for reasonable test coverage

## Commit Message Guidelines

Follow conventional commit format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for test additions/modifications
- `chore:` for build process, dependencies, etc.

Example:
```
feat: add daily theme reset option
docs: update README with new configuration example
fix: resolve polling interval calculation
```

## Documentation

- Update the **README.md** with any user-facing changes
- Update **CHANGELOG.md** following [Keep a Changelog](https://keepachangelog.com/) format
- Add inline code comments for complex logic
- Document new configuration options

## License

By contributing to Theme Switcher, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open a discussion or issue if you have questions about contributing.

Thank you for helping make Theme Switcher better! 🎨
