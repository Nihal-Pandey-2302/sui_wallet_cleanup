# Contributing to Sui Wallet Cleanup

First off, thank you for considering contributing to Sui Wallet Cleanup! It's people like you that make this tool better for the entire Sui community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Process](#development-process)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to uphold. Please be respectful and constructive in all interactions.

### Our Standards

- ✅ Be welcoming and inclusive
- ✅ Be respectful of differing viewpoints
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the community
- ❌ No harassment or discriminatory language
- ❌ No trolling or inflammatory comments

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git
- Sui Wallet browser extension
- Basic knowledge of React and TypeScript

### Development Setup

1. **Fork the repository**

   ```bash
   # Click "Fork" on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/sui-wallet-cleanup.git
   cd sui-wallet-cleanup
   ```

2. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/sui-wallet-cleanup.git
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Verify setup**
   - Open http://localhost:5173
   - Connect wallet
   - Test basic functionality

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title**: Descriptive one-liner
- **Environment**: OS, browser, wallet extension
- **Steps to reproduce**: Numbered list
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Console logs**: Error messages

**Bug Report Template**:

```markdown
**Environment**

- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Wallet: [e.g., Sui Wallet 0.5.0]
- Network: [Testnet/Mainnet]

**Steps to Reproduce**

1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
A clear description of what you expected.

**Actual Behavior**
What actually happened.

**Screenshots/Logs**
Add any screenshots or console errors.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Include:

- **Use case**: Why is this needed?
- **Proposed solution**: How should it work?
- **Alternatives**: Other approaches considered?
- **Additional context**: Mockups, examples, etc.

**Enhancement Template**:

```markdown
**Problem Statement**
Describe the problem this feature would solve.

**Proposed Solution**
Describe your proposed solution.

**Alternatives Considered**
What other solutions did you think about?

**Additional Context**
Add mockups, examples, or references.
```

### Your First Code Contribution

Unsure where to start? Look for issues labeled:

- `good first issue` - Simple tasks for newcomers
- `help wanted` - Tasks we need assistance with
- `documentation` - Improving docs

### Pull Requests

We love pull requests! Here's the process:

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Update documentation
5. Submit PR with clear description

## Development Process

### Branch Naming

Use descriptive branch names:

```bash
# Features
git checkout -b feature/add-export-history

# Bug fixes
git checkout -b fix/scanner-loading-state

# Documentation
git checkout -b docs/update-architecture

# Refactoring
git checkout -b refactor/optimize-object-fetching
```

### Development Workflow

```bash
# 1. Sync with upstream
git checkout main
git pull upstream main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes and commit
git add .
git commit -m "feat: add my feature"

# 4. Keep branch updated
git fetch upstream
git rebase upstream/main

# 5. Push to your fork
git push origin feature/my-feature

# 6. Open Pull Request on GitHub
```

### Testing Your Changes

Before submitting, test:

1. **Functionality**

   ```bash
   npm run dev
   # Test your changes manually
   ```

2. **Type checking**

   ```bash
   npm run type-check
   ```

3. **Linting**

   ```bash
   npm run lint
   ```

4. **Build**

   ```bash
   npm run build
   npm run preview
   ```

5. **Both networks**
   - Test on Testnet
   - Test on Mainnet (carefully!)

6. **Different wallets**
   - Sui Wallet
   - Other supported wallets

## Style Guidelines

### TypeScript Style

```typescript
// ✅ Good
interface UserProps {
  name: string;
  onSelect: (id: string) => void;
}

export function User({ name, onSelect }: UserProps) {
  return <div onClick={() => onSelect(id)}>{name}</div>;
}

// ❌ Bad
export function User(props: any) {
  return <div onClick={() => props.onSelect(props.id)}>{props.name}</div>;
}
```

### React Patterns

```typescript
// ✅ Use hooks
const [state, setState] = useState(initialValue);

// ✅ Extract custom hooks
function useMyFeature() {
  // hook logic
  return data;
}

// ✅ Proper prop types
interface ComponentProps {
  required: string;
  optional?: number;
}

// ✅ Destructure props
export function Component({ required, optional = 0 }: ComponentProps) {
  // component logic
}
```

### CSS/Tailwind

```tsx
// ✅ Use Tailwind utilities
<div className="flex items-center gap-4 p-6 rounded-xl bg-slate-900">

// ✅ Responsive design
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">

// ✅ Consistent spacing
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ❌ Avoid inline styles
<div style={{ padding: '24px' }}> {/* Use Tailwind instead */}
```

Code Style Rules

1. **Naming Conventions**
   - Components: `PascalCase`
   - Functions: `camelCase`
   - Constants: `UPPER_SNAKE_CASE`
   - Files: `PascalCase.tsx` for components

2. **File Organization**

   ```typescript
   // 1. Imports (grouped)
   import React from "react";
   import { externalLibrary } from "library";
   import { InternalComponent } from "./components";
   import { useCustomHook } from "./hooks";
   import type { MyType } from "./types";

   // 2. Types/Interfaces
   interface Props {}

   // 3. Component
   export function Component({}: Props) {
     // hooks
     // handlers
     // effects
     // render
   }
   ```

3. **Comments**

   ```typescript
   // ✅ Explain why, not what
   // Pagination required for wallets with 1000+ objects
   while (hasNextPage) { ... }

   // ❌ Redundant comments
   // Loop through pages
   while (hasNextPage) { ... }
   ```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code restructuring (no feature/fix)
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance (dependencies, tooling)

### Examples

```bash
# Feature
git commit -m "feat(scanner): add pagination for large wallets"

# Bug fix
git commit -m "fix(minter): handle empty image URL gracefully"

# Documentation
git commit -m "docs(readme): add troubleshooting section"

# Breaking change
git commit -m "feat(api)!: change burn function signature

BREAKING CHANGE: burn() now requires confirmation parameter"
```

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Types are properly defined
- [ ] Tested on Testnet
- [ ] Documentation updated
- [ ] No console warnings/errors
- [ ] Build succeeds
- [ ] Commit messages follow conventions

### PR Template

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

How has this been tested?

## Screenshots

If UI changes, add screenshots.

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex logic
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested on both networks
```

### Review Process

1. Automated checks run (linting, build)
2. Maintainer review
3. Request changes if needed
4. Approval
5. Merge to main

### After Merge

- Branch will be deleted
- Changes deployed to preview
- Release notes updated

## Questions?

- **GitHub Discussions**: For general questions
- **GitHub Issues**: For specific problems
- **Discord/Twitter**: Community chat

## Recognition

Contributors will be:

- Listed in README
- Mentioned in release notes
- Given credit in commits

Thank you for contributing! 🙏

---

**Happy Coding!** 🚀
