# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in the Theme Switcher extension, please do **not** open a public issue.

Instead, please email us with:

1. **Description** — What the vulnerability is
2. **Reproduction steps** — How to reproduce it
3. **Impact** — What could be affected
4. **Suggested fix** (if you have one)

We will:

- Acknowledge receipt within 48 hours
- Investigate and assess the severity
- Develop a fix in a private repository
- Coordinate a responsible disclosure timeline
- Credit you in the security advisory (if you wish)

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.0.1   | ✅ Yes    |

## Security Best Practices

This extension:

- ✅ **Does not** collect personal data
- ✅ **Does not** transmit data to external servers
- ✅ **Does not** execute arbitrary code
- ✅ **Does not** modify files outside VS Code
- ✅ Uses VS Code's configuration API securely
- ✅ Stores state only in VS Code's protected storage

### Dependencies

The extension maintains minimal dependencies to reduce attack surface:

```json
"devDependencies": {
  "@types/vscode": "Official VS Code types",
  "@types/mocha": "Testing framework types",
  "typescript": "Language compiler",
  "eslint": "Code quality tool",
  "@vscode/test-electron": "Official VS Code testing tool"
}
```

All dependencies are regularly audited for vulnerabilities:

```bash
npm audit
npm outdated
```

## Dependency Vulnerability Management

We monitor dependencies for known CVEs using:

- `npm audit`
- GitHub's Dependabot
- Regular manual review

## Code Review Process

All contributions are reviewed for:

- ✅ Code quality and style
- ✅ Potential security issues
- ✅ Test coverage
- ✅ No injection vulnerabilities
- ✅ Safe API usage

## Security Contact

For security issues, contact: **[security-related issues should be handled privately]**

## Disclosure Timeline

We follow a 90-day disclosure window:

1. **Day 0**: Report received and confirmed
2. **Day 1-89**: Development and testing of fix
3. **Day 90**: Public disclosure and patch release (unless circumstances require otherwise)

Thank you for helping keep Theme Switcher secure! 🔒
