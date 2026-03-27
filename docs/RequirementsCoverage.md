# Functional Requirements Coverage

## Table of Contents

1. [Overview](#overview)
2. [Coverage Summary](#coverage-summary)
3. [Covered Requirements](#covered-requirements)
   - [FR01 – Structured Onboarding Data Upload](#fr01--structured-onboarding-data-upload)
   - [FR02 – Data Standardization](#fr02--data-standardization)
   - [FR03 – Intermediate Data Persistence](#fr03--intermediate-data-persistence)
   - [FR05 – Safe Data Correction via Re-Submission](#fr05--safe-data-correction-via-re-submission)
   - [FR06 – Change Comparison Visualization](#fr06--change-comparison-visualization)
   - [FR08 – Dynamic Onboarding Interface](#fr08--dynamic-onboarding-interface)
   - [FR09 – Section Dependency Enforcement](#fr09--section-dependency-enforcement)
   - [FR10 – Collaborative Section Assignment](#fr10--collaborative-section-assignment)
   - [FR11 – Onboarding Status and Feedback](#fr11--onboarding-status-and-feedback)
   - [FR12 – Data Consolidation and Secure Integration](#fr12--data-consolidation-and-secure-integration)
4. [Out-of-Scope Requirements (Current Phase)](#out-of-scope-requirements-current-phase)
   - [FR04 – Data Validation and Conflict Detection](#fr04--data-validation-and-conflict-detection)
   - [FR07 – Automatic Progress Persistence](#fr07--automatic-progress-persistence)
5. [Traceability Matrix](#traceability-matrix)


## Overview

This document describes the functional requirements defined for the Onboarding Management System and the current coverage status for each requirement. Requirements are classified as either **Covered** — meaning they are fully addressed by the current implementation scope — or **Out of Scope** — meaning they are acknowledged but explicitly deferred or excluded from the current phase, with documented justification.

The goal of this document is to provide transparency between development, product, and stakeholder teams regarding what is being delivered, what is not, and why.


## Coverage Summary

| ID   | Requirement Name                          | Status         |
|------|-------------------------------------------|----------------|
| FR01 | Structured Onboarding Data Upload         | ✅ Covered      |
| FR02 | Data Standardization                      | ✅ Covered      |
| FR03 | Intermediate Data Persistence             | ✅ Covered      |
| FR04 | Data Validation and Conflict Detection    | ⚠️ Out of Scope |
| FR05 | Safe Data Correction via Re-Submission    | ✅ Covered      |
| FR06 | Change Comparison Visualization           | ✅ Covered      |
| FR07 | Automatic Progress Persistence            | ⚠️ Out of Scope |
| FR08 | Dynamic Onboarding Interface              | ✅ Covered      |
| FR09 | Section Dependency Enforcement            | ✅ Covered      |
| FR10 | Collaborative Section Assignment          | ✅ Covered      |
| FR11 | Onboarding Status and Feedback            | ✅ Covered      |
| FR12 | Data Consolidation and Secure Integration | ✅ Covered      |

**Total:** 12 requirements — **10 covered (83%)** — **2 out of scope (17%)**


## Covered Requirements


### FR01 – Structured Onboarding Data Upload

> *The system must allow authenticated users to submit onboarding data files associated with a specific onboarding process by uploading CSV and XLSX files through the onboarding submission interface, supporting large datasets and multiple files while keeping user interaction responsive.*

**Coverage:** ✅ Fully Covered

**Description:**

The file upload interface supports both CSV and XLSX formats and is scoped to authenticated users only. Each upload is associated with a specific onboarding process instance, ensuring data traceability from submission to consolidation.

To handle large datasets without degrading user experience, the upload mechanism uses asynchronous processing: files are submitted to a background job queue immediately after upload, decoupling the I/O-bound file ingestion from the user-facing interface. The UI remains responsive by providing real-time status feedback (see FR11) rather than blocking on server-side processing.

Multiple files can be submitted in a single interaction, and each file is individually tracked throughout its lifecycle.

**Key behaviors addressed:**
- Authentication check prior to any upload action
- Accepted formats: `.csv`, `.xlsx`
- Files are linked to a specific onboarding process identifier
- Asynchronous background processing preserves UI responsiveness
- Support for multiple concurrent file submissions


### FR02 – Data Standardization

> *The system must transform all submitted onboarding data into predefined internal data models and standardized field structures before any validation or consolidation occurs.*

**Coverage:** ✅ Fully Covered

**Description:**

Upon ingestion, all submitted files pass through a standardization pipeline before entering any subsequent processing stage. This pipeline maps raw source columns to canonical internal field names, normalizes data types (e.g., date formats, numeric representations, casing conventions), and structures records according to the internal domain model defined for each onboarding dataset type.

Standardization is enforced as a mandatory pre-processing step — no record reaches the intermediate storage layer (FR03) or triggers any validation logic (FR04) in its raw form. This ensures consistency across submissions originating from different sources or formatted differently.

**Key behaviors addressed:**
- Field name mapping from source schema to internal model
- Data type normalization (dates, numbers, strings)
- Encoding and casing normalization
- Standardization applied universally before any downstream processing


### FR03 – Intermediate Data Persistence

> *The system must persist submitted onboarding data in an intermediate storage layer to enable validation, correction cycles, and controlled consolidation without overwriting previous versions or the final dataset prematurely.*

**Coverage:** ✅ Fully Covered

**Description:**

Submitted and standardized data is stored in a dedicated intermediate layer, distinct from the final consolidated dataset. This separation ensures that the correction cycle (FR05) and consolidation workflow (FR12) can operate on a stable, versioned view of submitted data without risk of corrupting previously approved records.

Each submission creates a new versioned entry in the intermediate store rather than overwriting the previous one. This version history supports the change comparison feature (FR06) and provides an audit trail for all submissions made during the onboarding process.

The intermediate layer also serves as the execution context for validation checks (FR04), meaning validation failures affect only the staging data and not any finalized dataset.

**Key behaviors addressed:**
- Submitted data is staged before consolidation
- No overwrite of previous submissions; versioned storage
- Isolation from the final/consolidated data store
- Foundation for correction cycles, comparison views, and audit trails


### FR05 – Safe Data Correction via Re-Submission

> *The system must allow users to correct invalid onboarding data by re-submitting updated files that safely replace previous entries based on natural identifiers defined for each dataset.*

**Coverage:** ✅ Fully Covered

**Description:**

When a user re-submits a file for a dataset or section, the system identifies existing records in the intermediate layer using natural business identifiers (e.g., a unique client code, document number, or composite key defined per dataset type). Records matching those identifiers are replaced by the new submission, while unmatched records are treated as new entries.

This mechanism ensures that corrections are surgical — only records explicitly re-submitted are updated, without accidentally removing or duplicating records not included in the new file. The previous submission is retained as a version snapshot (supporting FR03 and FR06) rather than deleted, preserving the correction history.

**Key behaviors addressed:**
- Re-submission replaces records based on natural identifiers, not file position
- Non-matching records in the new file are inserted as new entries
- Previous version retained for audit and comparison purposes
- Safe replacement logic prevents unintended data loss during correction


### FR06 – Change Comparison Visualization

> *The system must present a comparison view that highlights differences between the latest and previous submission for the same dataset or section, focusing on changed fields or records.*

**Coverage:** ✅ Fully Covered

**Description:**

The system provides a diff-style comparison interface that presents the latest and the immediately preceding submission side by side (or in a unified view), highlighting added, removed, and modified fields or records. This allows users and administrators to review exactly what changed between re-submissions before proceeding to consolidation.

The comparison is scoped per dataset or onboarding section, and only fields or records with actual changes are visually emphasized — unchanged data is de-emphasized to reduce cognitive load. The view is read-only and does not trigger any state changes in the submission pipeline.

**Key behaviors addressed:**
- Side-by-side or unified diff view between latest and previous submission
- Changed fields and records visually highlighted
- Added, removed, and modified records distinguished
- View scoped per dataset/section
- Read-only; does not affect pipeline state



### FR08 – Dynamic Onboarding Interface

> *The system must dynamically present onboarding sections based on the client's active modules, ensuring that users only access forms and fields relevant to the selected configuration scope.*

**Coverage:** ✅ Fully Covered

**Description:**

The onboarding interface is driven by a configuration model that associates each client with a specific set of active modules. At runtime, the interface resolves which sections and fields are applicable to the authenticated user's client context and renders only those elements. Sections or fields tied to inactive modules are neither displayed nor accessible.

This dynamic rendering ensures that clients are not burdened with irrelevant data entry and that the onboarding process accurately reflects each client's contracted scope, reducing configuration errors and improving UX.

**Key behaviors addressed:**
- Interface sections driven by client-specific module configuration
- Inactive module sections are hidden and inaccessible
- Field-level visibility may also be scoped to active modules
- Configuration resolved server-side per authenticated session



### FR09 – Section Dependency Enforcement

> *The system must enforce dependencies between onboarding sections, preventing submission of dependent sections before prerequisite sections reach a completed state.*

**Coverage:** ✅ Fully Covered

**Description:**

A dependency graph is defined for onboarding sections, specifying which sections must reach a "Completed" status before dependent sections become available for submission. The system enforces this graph at both the UI level (locking dependent sections) and the API level (rejecting submissions that violate dependency rules).

This enforcement prevents logical inconsistencies in the onboarding dataset — for example, ensuring that entity registration data is completed before financial data that references those entities is submitted. Dependency rules are configurable per onboarding template.

**Key behaviors addressed:**
- Dependency graph defined per onboarding template
- Dependent sections locked in the UI until prerequisites are completed
- Server-side enforcement rejects premature submissions
- Clear user feedback indicating which prerequisites remain pending



### FR10 – Collaborative Section Assignment

> *The system must enable collaborative onboarding by allowing administrators to assign sections to multiple contributors and support parallel completion of independent sections.*

**Coverage:** ✅ Fully Covered

**Description:**

Administrators can assign specific onboarding sections to individual users or groups, allowing multiple contributors to work on the onboarding process simultaneously. Each contributor sees only the sections assigned to them (or all sections, if they hold a broader role), and their progress is tracked independently per section.

Sections without inter-dependencies (as defined by FR09) can be completed in parallel, enabling distributed teams to collaborate efficiently without serializing the entire onboarding workflow. Assignment and progress are visible to administrators through the onboarding management view.

**Key behaviors addressed:**
- Section-level assignment to individual users or groups
- Parallel completion of independent sections supported
- Contributor view scoped to their assigned sections
- Administrator visibility over all assignments and their status
- Assignment changes tracked with timestamps



### FR11 – Onboarding Status and Feedback

> *The system must track and display onboarding and processing states per section and per file submission (e.g., Not Started, In Progress, Processing, Completed, Failed) and must inform users when processing succeeds or fails.*

**Coverage:** ✅ Fully Covered

**Description:**

The system maintains a status model for both onboarding sections and individual file submissions. Section-level states reflect the aggregate completion of required data for that section, while file-level states reflect the processing pipeline outcome for each uploaded file.

Defined states include: **Not Started**, **In Progress**, **Processing**, **Completed**, and **Failed**. Status transitions are triggered by system events (e.g., a file upload initiates a transition from *Not Started* to *Processing*; a successful pipeline run transitions to *Completed*).

Users receive feedback through the interface when processing completes successfully or fails, including contextual error messages in failure scenarios to support corrective action (feeding into FR05).

**Key behaviors addressed:**
- Status tracked independently per section and per file submission
- Full state lifecycle: Not Started → In Progress → Processing → Completed / Failed
- Real-time or near-real-time status updates in the UI
- Success and failure notifications delivered to the user
- Failure messages include actionable context for correction



### FR12 – Data Consolidation and Secure Integration

> *The system must generate consolidated onboarding datasets in CSV or JSON format and transmit approved data packages to external systems through authenticated integration mechanisms.*

**Coverage:** ✅ Fully Covered

**Description:**

Once all required onboarding sections are completed and approved, the system generates a consolidated dataset by merging the staged intermediate records into a single coherent output. This output is produced in either CSV or JSON format, configurable per integration target.

The consolidated package is transmitted to external systems via authenticated integration mechanisms — API calls using token-based authentication or equivalent secure channels. Transmission is logged, and the result (success or failure) is reflected in the onboarding status model (FR11). Re-transmission can be triggered by administrators in case of integration failure.

**Key behaviors addressed:**
- Consolidation triggered after all sections reach Completed status
- Output formats: CSV and JSON, configurable per target
- Transmission via authenticated API or secure channel
- Transmission result logged and reflected in status
- Re-transmission capability on failure



## Out-of-Scope Requirements (Current Phase)

The following requirements have been identified and defined but are **not covered** in the current implementation phase. Their exclusion is intentional and justified below. They are documented here to maintain full traceability and to flag them as candidates for a future iteration.



### FR04 – Data Validation and Conflict Detection

> *The system must validate submitted onboarding data by checking mandatory fields, data formats, data types, and business constraints, and must identify duplicates or conflicting records.*

**Status:** ⚠️ Out of Scope — Deferred to Future Phase

**Justification:**

FR04 requires a comprehensive validation engine that enforces mandatory field presence, format and type correctness, business rule constraints, and duplicate/conflict detection logic. While the intermediate storage layer (FR03) and the correction mechanism (FR05) have been designed with this requirement in mind — specifically, the version-based staging model supports correction cycles that FR04 would initiate — the validation rules themselves vary significantly across dataset types and client configurations.

Building a correct, maintainable, and configurable validation engine requires dedicated specification effort per dataset domain, which has not yet been finalized. Delivering a partial or hardcoded validation layer risks creating technical debt that would be difficult to undo once client-specific rules are introduced.

**Decision:** FR04 is deferred until dataset-level validation rules are fully specified and agreed upon with stakeholders. The architecture does not preclude adding this layer — it is designed to plug into the existing pipeline between FR03 (intermediate persistence) and FR12 (consolidation). No rework is anticipated when this requirement is implemented.

**Impact on current scope:** In the absence of FR04, submitted data is standardized (FR02) and persisted (FR03) without automated validation. Manual review processes may be used as an interim control. The correction flow (FR05) remains functional for user-driven corrections.



### FR07 – Automatic Progress Persistence

> *The system must automatically preserve onboarding progress across sessions, ensuring users can resume completion without re-entering previously submitted information.*

**Status:** ⚠️ Out of Scope — Deferred to Future Phase

**Justification:**

FR07 addresses session continuity — the ability for users to leave and return to an onboarding process without losing partially entered data. This requirement applies primarily to form-level draft state (i.e., data typed into the UI but not yet submitted as a file), as opposed to submitted data, which is already persisted by FR03.

The current implementation scope focuses on the file-based submission workflow, where users prepare data externally (in CSV/XLSX files) and upload complete datasets. In this model, draft state within the UI is minimal, making FR07 lower priority for the initial phase. The value of automatic progress persistence increases significantly if the system evolves to include inline form entry — a feature not included in the current scope.

Additionally, implementing reliable auto-save with conflict resolution (e.g., multiple contributors working on the same section, as enabled by FR10) requires careful design to avoid overwriting collaborators' in-progress input. This interaction has not yet been specified.

**Decision:** FR07 is deferred pending the definition of inline form editing capabilities and the specification of auto-save conflict resolution behavior in collaborative contexts. The current session model relies on explicit file submissions as the persistence mechanism.

**Impact on current scope:** Users working within the current file-upload model are not affected, as their data is persisted upon file submission. Users who begin filling form-level fields without submitting may lose unsaved input on session expiry. This is an accepted limitation for the current phase and should be communicated to end users through appropriate UX messaging.



## Traceability Matrix

| ID   | Requirement Name                          | Coverage Status | Justification / Notes                                                                 |
|------|-------------------------------------------|-----------------|---------------------------------------------------------------------------------------|
| FR01 | Structured Onboarding Data Upload         | ✅ Covered       | Async upload with CSV/XLSX support, scoped to authenticated users                    |
| FR02 | Data Standardization                      | ✅ Covered       | Mandatory pre-processing pipeline normalizes all records before persistence           |
| FR03 | Intermediate Data Persistence             | ✅ Covered       | Versioned staging layer isolates submissions from final data                          |
| FR04 | Data Validation and Conflict Detection    | ⚠️ Out of Scope  | Deferred — validation rules not yet finalized; architecture supports future addition  |
| FR05 | Safe Data Correction via Re-Submission    | ✅ Covered       | Natural-key-based replacement with version retention                                  |
| FR06 | Change Comparison Visualization           | ✅ Covered       | Diff view between latest and previous submission per section                          |
| FR07 | Automatic Progress Persistence            | ⚠️ Out of Scope  | Deferred — file-upload model minimizes need; inline form editing not in current scope |
| FR08 | Dynamic Onboarding Interface              | ✅ Covered       | Module-driven section rendering resolved per client configuration                     |
| FR09 | Section Dependency Enforcement            | ✅ Covered       | Dependency graph enforced at UI and API layers                                        |
| FR10 | Collaborative Section Assignment          | ✅ Covered       | Section-level assignment with parallel completion support                             |
| FR11 | Onboarding Status and Feedback            | ✅ Covered       | Full state lifecycle tracked per section and per file, with user notifications        |
| FR12 | Data Consolidation and Secure Integration | ✅ Covered       | Consolidated output in CSV/JSON transmitted via authenticated integration channel     |

