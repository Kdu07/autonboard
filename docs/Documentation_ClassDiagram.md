

# 1. Architectural Style

The model follows:

* **Domain-Driven Design (DDD)**
* **Rich domain model (behavior inside entities)**
* **Clear aggregate boundaries**
* **Strong encapsulation**
* **Explicit Value Objects**

This ensures:

* Business rules are enforced inside the domain
* High cohesion
* Low coupling
* Future scalability

---

# 2. Aggregate Design

## 2.1 Building as Aggregate Root

**Decision:** `Building` is the main aggregate root of the structural domain.

### Why?

* Floors and amenities cannot exist independently of a building.
* Structural consistency (floor uniqueness, amenity control) must be enforced centrally.
* All structural mutations go through `Building`.

### Resulting Rule

* Floors are added/removed only via `Building`.
* Amenities are added/removed only via `Building`.
* External systems cannot directly modify Floors or Amenities collections.

---

## 2.2 Floor as Child Entity

**Decision:** `Floor` is an entity inside the `Building` aggregate.

### Why?

* A floor has identity (`FloorId`).
* A floor manages its own collection of units.
* Floor level uniqueness must be enforced within a building.

### Modeling Impact

* `Building` controls floor lifecycle.
* `Floor` controls unit lifecycle.

This creates a hierarchical control structure:

```
Building → Floor → Unit
```

---

## 2.3 Unit as Entity

**Decision:** `Unit` is an entity, not a value object.

### Why?

* Units change state (Available, Occupied, Maintenance).
* Units can be assigned tenants.
* Units have identity (`UnitId`).

### Behavioral Modeling

Instead of exposing setters:

* `markAsAvailable()`
* `markAsOccupied(tenant)`
* `markUnderMaintenance()`

This enforces valid state transitions.

---

## 2.4 Amenity as Independent Entity

**Decision:** `Amenity` is part of the Building aggregate.

### Why?

* Amenities belong to a building.
* They have lifecycle (activate/deactivate).
* They manage reservations.

### Important Design Choice

Reservations are controlled by the Amenity itself:

```
Amenity.reserve(user, dateRange)
Amenity.cancelReservation(reservationId)
```

This ensures:

* No overlapping reservations
* Encapsulation of scheduling logic

---

# 3. User as Separate Aggregate

**Decision:** `Users` is an independent aggregate.

### Why?

* Authentication is a separate concern.
* Users exist even without being linked to a building.
* Avoids coupling security with structural domain.

### Relationship Choice

The diagram shows:

```
Building 1 —— * Users
```

This likely represents that a building has many users.

However, users are not controlled by Building.
They should only be referenced by ID.

This prevents cross-aggregate transaction problems.

---

# 4. Value Object Usage

Strong use of Value Objects is intentional.

---

## 4.1 Address as Value Object

### Why?

* No identity.
* Compared by value.
* Immutable.
* Represents a concept.

Encapsulates formatting and equality logic.

---

## 4.2 FloorLevel as Value Object

### Why?

* Contains validation rules.
* Encapsulates constraints:

  * value < -5 → invalid
  * value > 200 → invalid
* Provides domain logic:

  * `isGroundFloor()`
  * `isAboveGround()`
  * `compareTo()`

This avoids primitive obsession.

Instead of:

```
int level
```

You now have:

```
FloorLevel level
```

Much safer and expressive.

---

## 4.3 UnitNumber as Value Object

### Why?

* Not just a string.
* Has domain meaning.
* Can validate format.
* Compared by value.

Prevents incorrect unit identifiers.

---

# 5. Enums vs Entities Decision

Enums used:

* UserStatus
* UserRole
* BuildingType

### Why Enums?

* Finite set of values.
* No identity required.
* Behavior does not change dynamically.

If roles needed permissions dynamically → would become entity.
But for static roles, enum is correct.

---

# 6. Composition vs Association

## 6.1 Composition Used

Building → Floor
Floor → Unit

Black diamond indicates lifecycle dependency.

### Why?

* If Building is deleted → Floors are deleted.
* If Floor is deleted → Units are deleted.

This models real-world ownership.

---

## 6.2 Association Used

Amenity connected but not nested under Floor.

### Why?

Amenities are building-level resources,
not tied to a specific floor.

This avoids artificial coupling.

---

# 7. State Modeling Strategy

State-changing methods exist inside entities:

### Example in Unit:

```
markAsAvailable()
markAsOccupied(tenant)
markUnderMaintenance()
```

### Why?

* Prevent invalid state transitions.
* Avoid exposing `setStatus()` publicly.
* Enforce invariants.

---

# 8. Invariants Enforced by Design

The model supports enforcing:

* No duplicate floor levels per building.
* No duplicate unit numbers per floor.
* No overlapping reservations.
* Only active users can perform operations.
* FloorLevel must respect bounds.

Encapsulation ensures these cannot be bypassed.

---

# 9. Avoided Anti-Patterns

This model intentionally avoids:

* Anemic domain model
* Primitive obsession
* God classes
* Public mutable collections
* Cross-aggregate direct references
* Setters for business state

---

# 10. Scalability Considerations

This design allows:

* Microservice separation (User service separate)
* Event-driven expansion (reservation events)
* Future multi-building support
* Policy-based reservation logic
* Authorization expansion

---

# 11. Tradeoffs Made

| Decision                | Tradeoff                    |
| ----------------------- | --------------------------- |
| Deep hierarchy          | Slightly more complexity    |
| Many Value Objects      | More classes                |
| Rich entities           | Requires disciplined coding |
| Separate User aggregate | Requires ID referencing     |

All tradeoffs favor long-term maintainability.

---

# 12. Overall Design Quality

The model demonstrates:

* Clear aggregate boundaries
* Proper encapsulation
* Domain-driven structure
* Rich behavior inside entities
* Explicit value modeling
* Clean ownership hierarchy
