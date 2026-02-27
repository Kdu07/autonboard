# CODING_STANDARDS.md

**Location:** /docs/CODING_STANDARDS.md  
**Project:** Building Management System  
**Version:** 1.0  

---

# 1. Purpose

This document defines mandatory coding standards for the project. All contributors must follow these rules to ensure:

- Consistency
- Readability
- Maintainability
- Scalability
- Clean code reviews
- Reduced defects

These standards are enforceable during code review.

---

# 2. General Principles

1. Code must be readable before being clever.
2. Domain language must be consistent with the UML model.
3. All business logic must live inside domain entities.
4. No duplicated logic.
5. All public methods must be explicit and intentional.

---

# 3. Naming Conventions

## 3.1 Classes

**Rule:** PascalCase

✅ **Correct:**

```python
class Building:
class FloorLevel:
class ReservationService:
```

❌ **Incorrect:**

```python
class building:
class floor_level:
class reservationservice:
```

**Justification:** PascalCase aligns with industry standards and improves readability.

---

## 3.2 Variables and Attributes

**Rule:** snake_case (Python convention)

✅ **Correct:**

```python
floor_level = 5
unit_number = "101A"
reservation_date = datetime.now()
```

❌ **Incorrect:**

```python
floorLevel = 5
UnitNumber = "101A"
reservationDate = datetime.now()
```

**Justification:** Snake_case is PEP8 standard and ensures consistency.

---

## 3.3 Constants

**Rule:** UPPER_CASE

✅ **Correct:**

```python
MAX_FLOORS = 200
DEFAULT_STATUS = "ACTIVE"
```

❌ **Incorrect:**

```python
maxFloors = 200
DefaultStatus = "ACTIVE"
```

---

## 3.4 Functions and Methods

**Rule:** snake_case, verb-first naming

✅ **Correct:**

```python
def add_unit(self, unit: Unit) -> None:
def mark_as_occupied(self) -> None:
def is_available(self) -> bool:
```

❌ **Incorrect:**

```python
def unitAdd():
def occupied():
def availability():
```

**Justification:** Verb-based naming improves clarity of behavior.

---

## 3.5 Files

**Rule:** snake_case

✅ **Correct:**

```
building.py
floor_level.py
reservation_service.py
```

❌ **Incorrect:**

```
Building.py
FloorLevel.py
reservationService.py
```

---

# 4. Code Formatting

## 4.1 Indentation

* 4 spaces (no tabs)

Enforced via formatter.

---

## 4.2 Line Length

* Maximum: 100 characters

**Why:**

* Improves readability
* Avoids horizontal scrolling

---

## 4.3 Braces / Blocks

Python indentation defines blocks. Always use explicit returns.

---

## 4.4 Spacing

### Around operators

✅ **Correct:**

```python
if unit.status == UnitStatus.AVAILABLE:
```

❌ **Incorrect:**

```python
if unit.status==UnitStatus.AVAILABLE:
```

---

### After commas

✅ **Correct:**

```python
def reserve(self, user_id: UserId, date_range: DateTimeRange):
```

❌ **Incorrect:**

```python
def reserve(self,user_id:UserId,date_range:DateTimeRange):
```

---

# 5. Comments and Documentation

## 5.1 When to Comment

**Comment:**

* Business rules
* Non-obvious decisions
* Complex algorithms

**Do NOT comment:**

* Obvious code
* Self-explanatory methods

---

## 5.2 Docstring Format

**Rule:** Google-style docstrings

**Example:**

```python
class Floor:
    """
    Represents a floor inside a building.

    Attributes:
        level (FloorLevel): Floor level value object.
        units (List[Unit]): Units belonging to this floor.
    """
```

**For methods:**

```python
def add_unit(self, unit: Unit) -> None:
    """
    Adds a unit to the floor.

    Args:
        unit (Unit): Unit to be added.

    Raises:
        ValueError: If unit number already exists.
    """
```

---

## 5.3 Inline Comments

Use only when necessary.

✅ **Good:**

```python
# Prevent duplicate unit numbers within the same floor
if self.has_unit(unit.number):
    raise ValueError("Duplicate unit number")
```

❌ **Bad:**

```python
# This checks if the unit exists
if self.has_unit(unit.number):
```

---

# 6. File Organization

## 6.1 Import Order

1. Standard library
2. Third-party libraries
3. Local modules

**Example:**

```python
# Standard library
from datetime import datetime

# Third-party
from pydantic import BaseModel

# Local
from domain.floor import Floor
from domain.unit import Unit
```

---

## 6.2 File Structure

**Order inside file:**

1. Imports
2. Constants
3. Class definitions
4. Private helpers (if needed)

No executable logic at file root level.

---

# 7. Language-Specific Best Practices (Python)

## 7.1 Type Hints (Mandatory)

All functions must use type hints.

✅ **Correct:**

```python
def total_units(self) -> int:
```

❌ **Incorrect:**

```python
def total_units(self):
```

---

## 7.2 Error Handling

* Use domain-specific exceptions.
* Never swallow exceptions silently.

✅ **Correct:**

```python
if not user.is_active():
    raise UserInactiveError()
```

❌ **Incorrect:**

```python
try:
    ...
except:
    pass
```

---

## 7.3 Immutability for Value Objects

Use `@dataclass(frozen=True)`.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class FloorLevel:
    value: int
```

---

## 7.4 No Magic Numbers

❌ **Incorrect:**

```python
if level > 200:
```

✅ **Correct:**

```python
MAX_FLOOR_LEVEL = 200
if level > MAX_FLOOR_LEVEL:
```

---

# 8. Version Control Standards

## 8.1 Branch Naming

**Format:**

```
feature/<short-description>
fix/<short-description>
refactor/<short-description>
docs/<short-description>
```

**Examples:**

```
feature/add-amenity-reservation
fix/unit-duplication-validation
refactor/building-aggregate
```

---

## 8.2 Commit Message Format

Use Conventional Commits:

```
type(scope): short description
```

**Examples:**

```
feat(building): add floor uniqueness validation
fix(unit): prevent duplicate unit numbers
refactor(user): extract email value object
docs: update coding standards
```

**Allowed types:**

* feat
* fix
* refactor
* docs
* test
* chore

---

## 8.3 Pull Requests

Must include:

* Clear description
* Linked issue (if applicable)
* No failing tests
* Code review approval

---

# 9. Enforceability

These rules are enforced through:

* Code review checklist
* Automated formatting (Black)
* Linting (Flake8)
* Type checking (mypy)
* CI pipeline validation

Any PR not conforming to standards will be rejected.

---

# 10. Why These Standards Improve Quality

* Consistency reduces cognitive load
* Type hints reduce runtime errors
* Strict naming improves domain clarity
* Clear commit messages improve traceability
* Formatting automation removes stylistic debates
* Enforced structure prevents architectural decay

---

# Final Statement

Following these standards ensures:

* Maintainable architecture
* Clean domain modeling
* Professional-level code quality
* Scalable and production-ready system

All contributors are required to follow this document.
