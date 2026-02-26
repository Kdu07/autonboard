# Coding Standards

This document defines enforceable conventions for all code in the project. **Standards apply per file language**: each file must follow the rules for its language (e.g. a `.py` file follows Python rules; a `.tsx` file follows TypeScript/React rules). All code and comments in the repository must be written in **English**.

---

## 1. Naming Conventions

### 1.1 Variables and functions

| Language   | Variables / functions | Constants           | Rationale |
|-----------|------------------------|---------------------|-----------|
| **Python** | `snake_case`           | `UPPER_SNAKE_CASE`  | PEP 8; consistent with stdlib and ecosystem. |
| **JavaScript/TypeScript** | `camelCase` | `UPPER_SNAKE_CASE` | ECMAScript convention; matches npm/React ecosystem. |

**Examples**

```python
# Python — correct
user_name = "alice"
def get_user_by_id(user_id: str): ...

MAX_RETRIES = 3
```

```python
# Python — incorrect
userName = "alice"
def GetUserById(user_id): ...
```

```typescript
// TypeScript — correct
const userName = "alice";
function getUserById(userId: string): User { ... }
const MAX_RETRIES = 3;
```

```typescript
// TypeScript — incorrect
const user_name = "alice";
function get_user_by_id(userId: string) { ... }
```

### 1.2 Classes and types

| Language   | Classes / types       | Rationale |
|-----------|------------------------|-----------|
| **Python** | `PascalCase`           | PEP 8. |
| **JavaScript/TypeScript** | `PascalCase` | Standard for classes and type names. |

**Examples**

```python
# Python — correct
class UserService:
    pass

class ValidationError(Exception):
    pass
```

```typescript
// TypeScript — correct
class UserService {}
interface UserProfile {}
type UserId = string;
```

### 1.3 Files and directories

| Context        | Convention   | Example |
|----------------|-------------|---------|
| **Python**     | `snake_case` | `user_service.py`, `data_validator.py` |
| **JS/TS (non-component)** | `kebab-case` | `user-service.ts`, `api-client.ts` |
| **React/Vue component files** | `PascalCase` | `UserCard.tsx`, `DataTable.vue` |
| **Directories (any)** | `kebab-case` | `api-clients/`, `user-management/` |

**Rationale:** One rule per language/context avoids ambiguity and matches common tooling (e.g. Python imports vs JS module resolution). Component PascalCase aligns with component names and common framework conventions.

**Examples**

```
# Correct
services/user_service.py
lib/api-client.ts
components/UserCard.tsx
utils/format-date.ts

# Incorrect (for this project)
services/userService.py
lib/api_client.ts
components/user-card.tsx
```

---

## 2. Code Formatting

Formatting is enforced by tools. **One formatter per language**; no optional “pick one” alternatives.

| Language   | Tool    | Line length | Rationale |
|-----------|---------|-------------|-----------|
| **Python** | Black   | 88          | PEP 8 default; deterministic, minimal config. |
| **JavaScript/TypeScript** | Prettier | 100 | Readable lines; single standard for JS/TS. |

- **Indentation:** 4 spaces (Python); 2 spaces (JS/TS). Enforced by the formatter.
- **Braces:** Same line for opening brace (JS/TS); Black handles Python. No manual preference; formatter decides.
- **Spacing:** Around operators and after commas as per Black/Prettier; no trailing whitespace.

**Examples**

```python
# Python — Black 88: correct
def process_data(source: str, options: dict) -> list[dict]:
    return [normalize(item) for item in load(source) if item]
```

```python
# Python — incorrect (would be reformatted by Black)
def process_data( source: str,options: dict )->list[dict]:
    return [normalize(item) for item in load(source) if item]
```

```typescript
// TypeScript — Prettier 100: correct
function processData(source: string, options: Options): Record<string, unknown>[] {
  return load(source).filter(Boolean).map(normalize);
}
```

---

## 3. Comments and Documentation

### 3.1 When to comment

- **Do:** Explain “why” and non-obvious business rules or constraints.
- **Do not:** Restate what the code does when the name and structure are clear.

### 3.2 Docstrings / JSDoc (public API)

- **Python:** Use docstrings for all public modules, classes, and functions (Google or NumPy style; one style project-wide). Include purpose, args, returns, and raised exceptions where relevant.
- **TypeScript/JavaScript:** Use JSDoc for public functions and exported APIs when they are not self-explanatory.

**Format (English only):**

```python
# Python — correct
def validate_submission(data: dict, schema: dict) -> ValidationResult:
    """Validate submission data against the given JSON schema.

    Args:
        data: Raw submission payload.
        schema: JSON Schema object.

    Returns:
        ValidationResult with errors if any.

    Raises:
        SchemaError: If schema itself is invalid.
    """
    ...
```

```typescript
// TypeScript — correct
/**
 * Validates submission data against the given JSON schema.
 * @param data - Raw submission payload
 * @param schema - JSON Schema object
 * @returns Validation result with errors if any
 */
function validateSubmission(data: unknown, schema: object): ValidationResult {}
```

### 3.3 Inline comments

- Use full sentences in English, capitalised. One space after `#` or `//`.
- Prefer improving names and structure over long inline comments.

```python
# Correct: explain why
# Retry up to 3 times to handle transient S3 read errors.
```

```python
# Incorrect: restate the code
# Loop over items
for item in items:
```

---

## 4. File Organization

### 4.1 Import order

- **Python:** Standard library → third-party → local, each group alphabetically. Enforced by **isort** (Black-compatible profile).
- **JavaScript/TypeScript:** External packages first, then internal/aliases, then relative. Enforced by **ESLint** import plugin or Prettier import order if configured.

**Example (Python)**

```python
# Correct
import os
from pathlib import Path

import requests
from pydantic import BaseModel

from .schemas import UserSchema
from .utils import normalize
```

### 4.2 Structure within a file

- **Python:** Module docstring → imports → constants → public API (classes/functions) → private helpers. No trailing newlines beyond one.
- **JS/TS:** Imports at top; then constants; then types/interfaces; then implementation (functions/classes). One component per file for React components.

---

## 5. Language-Specific Best Practices

### 5.1 Python

- **Type hints:** Use for function parameters and return types on all new or modified public functions. Improves readability and enables static checking.
- **Error handling:** Prefer specific exceptions; avoid bare `except:`. Use custom exceptions for domain errors.

```python
# Correct
try:
    result = parse(payload)
except json.JSONDecodeError as e:
    raise ValidationError(f"Invalid JSON: {e}") from e
```

```python
# Incorrect
try:
    result = parse(payload)
except:
    pass
```

- **Linting:** **Ruff** (or Flake8) for style and common bugs; **mypy** in strict or standard mode for type checking where adopted.

### 5.2 JavaScript/TypeScript

- **Types:** Prefer TypeScript; avoid `any` in new code. Use strict null checks.
- **Error handling:** Use typed errors or discriminated unions where appropriate; do not swallow errors.

```typescript
// Correct
try {
  await submit(data);
} catch (err) {
  logger.error("Submit failed", { err, data });
  throw err;
}
```

- **Linting:** **ESLint** with TypeScript parser; rules aligned with Prettier (no conflicting formatting).

---

## 6. Version Control Practices

### 6.1 Branch naming

- **Feature branches:** `feature/<short-description>` (e.g. `feature/user-auth`, `feature/validation-api`).
- **Hotfixes (production):** `hotfix/<short-description>` (e.g. `hotfix/login-timeout`).
- **Releases:** `release/<short-description>` (e.g. `release/1.0.0`).
- **Other:** `docs/...`, `chore/...` as needed. No ad-hoc names; names must be consistent and descriptive.

### 6.2 Commit messages (Conventional Commits)

- **Format:** `<type>(<scope>): <subject>`.
- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- **Subject:** Imperative, lowercase after the colon, no period at the end. Max length ~72 characters.

**Examples**

```
feat(auth): add login with email and password
fix(api): correct validation error on empty payload
docs: update CODING_STANDARDS with import order
```

**Incorrect**

```
Added login
fix: Correct validation
FEAT: add login
```

### 6.3 Merging rules

- **Direct push/merge to `main` is forbidden.** All changes reach `main` via protected branch workflow (e.g. merge from `develop` or release branches).
- **All changes into the main development branch (e.g. `develop`) must go through a Pull Request.** No direct commits to `develop`.
- PRs must be reviewed and approved before merge; CI must pass (format, lint, tests).

---

## 7. Enforcement: Tools and CI

Standards are enforced by automated tools. The following are the **minimum required checks**; CI must fail when they do.

### 7.1 Python

| Check      | Tool   | Command (minimum) |
|-----------|--------|--------------------|
| Format    | Black  | `black --line-length 88 --check .` |
| Import order | isort | `isort --check-only --profile black .` |
| Lint      | Ruff   | `ruff check .` |
| Type check (if adopted) | mypy | `mypy .` |

**CI must fail if:** `black --check` or `isort --check-only` or `ruff check` fails on the changed tree.

### 7.2 JavaScript/TypeScript

| Check      | Tool    | Command (minimum) |
|-----------|---------|--------------------|
| Format    | Prettier | `prettier --check '**/*.{js,ts,tsx,json}'` |
| Lint      | ESLint  | `eslint "**/*.{js,ts,tsx}"` |

**CI must fail if:** `prettier --check` or `eslint` fails on the changed files.

### 7.3 Commits and branches (optional but recommended)

- **Commit message format:** Enforce Conventional Commits in CI (e.g. `commitlint`) so CI fails on invalid messages.
- **Branch protection:** `main` and `develop` protected; no direct push; merge only via PR with passing CI and approval.

---

## 8. Summary Checklist (Code Review)

Reviewers must verify:

- [ ] Naming matches language: Python `snake_case` (files, vars, functions), JS/TS `camelCase` (vars, functions), `PascalCase` (classes, components, component files).
- [ ] File names: Python `snake_case`; JS/TS `kebab-case`; component files `PascalCase`.
- [ ] Formatting: Black 88 (Python), Prettier 100 (JS/TS); no manual overrides that contradict tools.
- [ ] Comments and docstrings in English; docstrings on public API.
- [ ] Imports ordered (isort for Python; ESLint/Prettier for JS/TS).
- [ ] No bare `except` (Python); no untyped `any` or swallowed errors (TS) in new code.
- [ ] Branch name matches convention (`feature/...`, `hotfix/...`, `release/...`, `docs/...`, `chore/...`); commit message is Conventional Commits; no direct merge to `main`; PR required for target branch.

This document is the single source of truth for coding standards; all team members must follow it, and CI must enforce the automated parts.
