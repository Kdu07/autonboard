# DATA MODELING  
Conceptual and Logical Data Model

## Table of Contents

- [Overview of Data Modeling](#overview-of-data-modeling)
- [Conceptual Data Model](#conceptual-data-model)
  - [Entity-Relationship Diagram (ERD)](#entity-relationship-diagram-erd)
  - [Entity Identification](#entity-identification)
  - [Attribute Definition](#attribute-definition)
  - [Entity Relationships](#entity-relationships)
  - [Business Rules and Constraints](#business-rules-and-constraints)
  - [Complete Textual Description](#complete-textual-description)
- [Logical Data Model](#logical-data-model)
  - [Transformation from Conceptual to Logical Model](#transformation-from-conceptual-to-logical-model)
  - [Table Structure](#table-structure)
  - [Normalization](#normalization)
  - [Referential Integrity](#referential-integrity)
- [Traceability Between Models](#traceability-between-models)
- [Final Considerations](#final-considerations)


## Overview of Data Modeling

Data modeling is a fundamental activity for structuring, organizing, and managing information within a system.  
In the context of this project, data modeling enables an accurate representation of the problem domain, ensuring data integrity, consistency, and efficient storage.


## Conceptual Data Model

### Entity-Relationship Diagram (ERD)

<div align="center">
<sub>FIGURE 01 - ERD</sub><br>
  <img src="../assets/erd.jpeg" width="100%" alt="Porter´s Five Forces"><br>
  <sup>Source: Material produced by the authors, 2026.</sup>
</div>

The diagram was created using Crow’s Foot notation and accurately represents the entities and relationships described in the following sections.


### Entity Identification

**Identified entities:**

- Entity 1  
- Entity 2  
- Entity 3  
- Entity N  


### Attribute Definition

#### Entity: **[Entity Name]**

**Description:**  
Textual description of the entity and its role within the system.

**Attributes:**

- `id` (PK) – Unique identifier of the entity  
- `attribute_1` – Attribute description  
- `attribute_2` – Attribute description  
- `attribute_n` – Attribute description  


### Entity Relationships

The relationships describe how entities are connected, including cardinality and participation constraints.

| Entity A | Entity B | Cardinality | Participation | Description |
|---------|----------|-------------|---------------|-------------|
| Entity 1 | Entity 2 | 1:N | Mandatory / Optional | Relationship description |
| Entity 2 | Entity 3 | N:N | Optional | Relationship description |


### Business Rules and Constraints

The following business rules and constraints govern the system behavior:

- A **[actor/entity]** may have at most **X** active records.
- The **[entity]** status must assume only the following values: **[list of values]**.
- The maximum allowed time for **[process/action]** is **X** days.
- Certain relationships are mandatory for record creation.

These rules ensure data validity and consistency.


### Complete Textual Description

This section provides a detailed explanation of all entities, attributes, and relationships, demonstrating how the conceptual model meets the project requirements.

- The entity **[Entity Name]** represents ...
- The relationship between **[Entity A]** and **[Entity B]** allows ...
- The business rules ensure that ...


## Logical Data Model

### Transformation from Conceptual to Logical Model

The logical data model was derived from the conceptual model through the following steps:

- Each conceptual entity was mapped to a relational table.
- Attributes were converted into columns with appropriate data types.
- Relationships were implemented using foreign keys.
- Many-to-many relationships were resolved using associative tables.

This transformation ensures consistency between both models.


### Table Structure

#### Table: **[table_name]**

| Column Name | Data Type | PK | FK | Description |
|------------|-----------|----|----|-------------|
| id | SERIAL | ✔ |  | Unique identifier |
| column_1 | VARCHAR(255) |  |  | Attribute description |
| column_2 | INT |  | ✔ | Reference to another table |


### Normalization

The logical model was normalized to at least the **Third Normal Form (3NF)**, ensuring:

- Elimination of data redundancy.
- Full functional dependency on primary keys.
- Proper separation of multivalued and dependent attributes.

**Normalization decisions:**

- Entity **[X]** was separated from entity **[Y]** to avoid data redundancy.
- Many-to-many relationships were resolved through associative tables.


### Referential Integrity

Referential integrity constraints were defined based on the system’s business rules, including:

- `ON DELETE CASCADE`
- `ON DELETE RESTRICT`
- `ON DELETE SET NULL`

These constraints ensure data consistency throughout the record lifecycle.


## Traceability Between Models

Traceability between the conceptual and logical models is ensured as follows:

- Each conceptual entity corresponds to a table in the logical model.
- Each conceptual relationship was translated into a foreign key or associative table.
- Business rules from the conceptual model were enforced through logical constraints.

This guarantees alignment and coherence across modeling levels.


## Final Considerations

The presented data models provide a structured, consistent, and scalable foundation for the system.  
The clear separation between conceptual and logical models contributes to maintainability, data integrity, and future system evolution.
