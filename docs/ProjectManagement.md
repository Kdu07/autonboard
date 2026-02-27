## Group Development Process Management

#### Daily Meetings Policy (Dailies)

**Frequency**  
Daily, on every class day.

**Duration**  
Maximum of 15 minutes.

**Participants**  
All group members involved in the project.

**Structure**  
Stand-up meeting following this agenda:
- What was done since the last daily (**must reference GitHub/GitLab Issue ID**)
- What will be done by the next one (**must reference planned Sprint 3 tasks / Issue IDs**)
- Blockers or risks identified (**must be recorded and linked to an Issue when actionable**)

**Operating rules (with traceability)**
- Dailies take place at a fixed time communicated to the group; absence must be justified in the official channel.
- Each contribution must be brief and focused on concrete tasks/Issues (avoid long discussions; complex topics are taken offline).
- Blockers are recorded in the channel and, when applicable, as a comment on the associated Issue; the person responsible for unblocking is agreed during the daily.
- A brief written summary is posted after the meeting in the channel containing:
  - Issues completed (IDs)
  - Issues in progress (IDs)
  - Blockers/risks (IDs or “new issue needed”)
- This summary is used as evidence of traceability between execution and sprint planning.

**Objective**  
Ensure team alignment, monitor progress, and identify impediments as early as possible, with explicit traceability to sprint tasks.

---

#### GitHub/GitLab Usage Policy

**Repository Organization**  
- Single centralized repository for the project.
- Main branches follow the GitFlow strategy.
- Documentation is stored in the `/docs` directory (mandatory for the module).
- Database artifacts are stored in `src/database/`:
  - `src/database/01_create_database.sql`
  - `src/database/02_initial_data.sql`
  - `src/database/README.md`

**Issue Usage**  
- All development and documentation activities must be registered as GitHub/GitLab Issues.
- Each issue must represent a single task, feature, or bug.
- Each Sprint 3 Issue must include:
  - Type (Deployment / Database / Development / Testing / PMO)
  - DoR and DoD
  - Link to the evaluation criteria when relevant

**Pull Request Rules**  
- Pull Requests (PRs) are mandatory for merging any code into the `develop` branch.
- Direct commits to `develop` or `main` are not allowed.
- Each PR must contain:
  - A clear and concise description of the changes performed
  - Explicit reference to the Issue(s) (e.g., "Closes #12")
  - Evidence updates when required (docs updates, screenshots/logs, test results)

**Review Process**  
- At least one team member must review and approve the PR before merging.
- Reviewers must verify code quality, adherence to standards, correctness, and compliance with Sprint 3 requirements (languages, folder structure, and deliverables).

---

#### Commit Policy

**Message format**  
- Commit messages must follow the **Conventional Commits** pattern, for example:
  - `feat(api): implement endpoint X (#S3-DEV-02)`
  - `docs: update Projeto.md with deployment justification (#S3-DEP-02)`
  - `test: add unit tests for service Y (#S3-DEV-06)`
  - `chore(db): add create schema script (#S3-DB-01)`

**Frequency and granularity**  
- Commits should be small, frequent, and focused on a single logical change.
- Avoid commits that mix multiple features or unrelated fixes.

**Association with tasks (mandatory)**
- Each commit must reference the corresponding Issue/task ID either in the subject or body.
- In PRs, the description must explicitly reference the Issue(s) the PR addresses (e.g., "Closes #12").

**Mandatory rules**  
- Direct commits to the `develop` or `main` branches are not allowed; all code enters via Pull Request.
- Generic messages (e.g. "fix", "update") should be avoided.

---

#### Team Workflow

The team follows an end-to-end workflow defined as follows:
1. Tasks are defined and prioritized during Sprint Planning (registered as Issues).
2. A team member assigns themselves to a task (Issue owner).
3. A feature branch is created from the `develop` branch.
4. Development is carried out following the defined commit policies and mandatory languages:
   - Backend: Node.js + TypeScript
   - Frontend: Angular + TypeScript
5. A Pull Request is opened for review referencing the Issue(s).
6. After approval, the branch is merged into `develop`.
7. The task is marked as completed and evidence is updated in `/docs`.

**Additional Working Policies**
- Communication is centralized in the team’s official channel.
- Blockers must be reported as soon as they are identified (and linked to an Issue if actionable).
- Clear and transparent communication is essential for project progress.

---

#### Sprint Planning and Retrospective

**Sprint Planning**
- At the beginning of each sprint, tasks are defined and prioritized (registered as Issues).
- Effort is estimated (T-shirt sizing: XS, S, M, L).
- **Definition of Ready (DoR)** and **Definition of Done (DoD)** are applied to ensure clear eligibility and completion criteria.
- Sprint goals are reviewed at the beginning and end of the sprint.

---

## Sprint 3 Tasks + DoR/DoD (Explicit, as required)

All Sprint 3 tasks below must be created as Issues and linked to the Sprint 3 milestone/label.

### Deployment Diagram (Projeto.md in `/docs`)
**S3-DEP-01 — Create UML Deployment Diagram (Cloud)**
- **DoR:** components/services identified; infrastructure target chosen; protocols listed; NFRs available (performance/security).
- **DoD:** diagram includes components + infrastructure + protocols; understandable layout; inserted into `docs/Projeto.md`.

**S3-DEP-02 — Textual Description + NFR Justification**
- **DoR:** deployment diagram draft exists; performance/security NFRs agreed.
- **DoD:** includes justification of choices + performance impacts (latency/scalability) + security impacts (HTTPS, access control, data protection); inserted into `docs/Projeto.md`.

### Database Physical Model (NO ORM) (`src/database/`)
**S3-DB-01 — 01_create_database.sql (Schema)**
- **DoR:** logical model finalized; entities/relationships confirmed.
- **DoD:** creates DB schema with tables + PK/FK + constraints; script runs without errors on all members’ machines; versioned as `src/database/01_create_database.sql`.

**S3-DB-02 — Data Dictionary (README.md)**
- **DoR:** schema tables/columns defined.
- **DoD:** README documents tables, data types, constraints, relationships, descriptions; stored in `src/database/README.md`.

**S3-DB-03 — 02_initial_data.sql (Seeding)**
- **DoR:** seed data defined (minimum viable for startup/tests).
- **DoD:** inserts initial data successfully; versioned as `src/database/02_initial_data.sql`.

**S3-DB-04 — Deployment/Configuration Instructions (README.md)**
- **DoR:** DB tech/version chosen; local setup steps validated.
- **DoD:** README includes DB version, dependencies, env vars, how to run scripts, troubleshooting; confirmed working for all members.

### Progressive Development + Evidence (Projeto.md + GuiaPadroesDesenvolvimento.md)
**S3-DEV-01 — Coding Architecture + Directory Structure**
- **DoR:** module standard reviewed; repo baseline exists.
- **DoD:** documented architecture + directory tree (diagram if possible) in `docs/Projeto.md`.

**S3-DEV-02 — Coding Standards + Design Patterns**
- **DoR:** agreed naming/formatting rules; chosen patterns listed.
- **DoD:** documented in `docs/GuiaPadroesDesenvolvimento.md` with patterns and how they apply.

**S3-DEV-03 — Feature Implementation (Backend/Frontend)**
- **DoR:** sprint backlog defined; acceptance criteria clear.
- **DoD:** features implemented aligned to plan; deviations documented in `docs/Projeto.md`; uses required languages.

**S3-DEV-04 — Auth0 Login (if applicable this sprint)**
- **DoR:** Auth0 tenant/app configured; callback URLs defined.
- **DoD:** login works end-to-end; documented setup in `docs/Projeto.md`; code versioned.

**S3-DEV-05 — Unit Test Strategy + Implementation**
- **DoR:** critical components identified; test framework chosen.
- **DoD:** unit tests implemented; execution results + coverage summary documented in `docs/Projeto.md`.

**S3-DEV-06 — Video Evidence (Execution Proof)**
- **DoR:** app runs locally; console logs available.
- **DoD:** video recorded with split-screen (app + VSCode console); stored according to team convention and referenced in `docs/Projeto.md`.

### Test Planning (Projeto.md)
**S3-TEST-01 — Functional Test Plan (FR)**
- **DoR:** FR list available; test structure template defined.
- **DoD:** positive/negative scenarios + expected results + how to execute + coverage discussion in `docs/Projeto.md`.

**S3-TEST-02 — NFR Test Plan**
- **DoR:** NFR list available (performance/security).
- **DoD:** tests include purpose, steps, expected results, feasibility, coverage; documented in `docs/Projeto.md`.

**S3-TEST-03 — Usability Test Script (5 external users)**
- **DoR:** professor template received; participant profiles defined.
- **DoD:** execution script with scenarios + profiles; planned for 5 external users; documented in `docs/Projeto.md`.

---

## Sprint Action Traceability (S2 → S3)

To ensure explicit traceability between sprint actions, Sprint 2 retrospective actions are transformed into Sprint 3 Issues/tasks and verified in Sprint 3 Planning.

| Sprint 2 Action | Sprint 3 Task/Issue Reference | Verification in Sprint 3 |
|----------------|-------------------------------|---------------------------|
| Reduce committed scope by ~20% in short sprints | S3-PM-01 (Scope recalibration embedded in planning) | Backlog reduced and justified in planning |
| Add mandatory documentation update to DoD before PR merge | S3-DEV-02 + DoD rules in PR checklist | PRs include docs updates before merge |
| Re-evaluate scope estimation during Sprint 3 Planning | S3-PM-01 + sizing review | T-shirt sizing applied to all Sprint 3 tasks |

**Verification rule:** at Sprint 3 start, these actions are reviewed and each referenced Issue status is checked.

---

# Sprint 2 Retrospective

## Context
Sprint 2 had a reduced duration and a constrained timeline, requiring the team to adapt quickly and prioritize essential deliverables.

---

## Retrospective Analysis (Sprint 2)

| Sprint | Strengths | Weaknesses | Improvement Actions | Concrete Actions | Risks Identified |
|--------|-----------|------------|---------------------|------------------|------------------|
| S2 | Effective last-minute coordination and high team availability for quick sync meetings. Two core features were successfully delivered despite time constraints. Pair programming on the critical path helped reduce blockers. | Sprint duration was too short, limiting proper code review (one PR merged after a single quick review). Documentation and DoD checklist were completed in a rushed manner at the end of the sprint. One planned task was moved back to the backlog due to time pressure. | Introduce a buffer in short sprints and reduce committed scope. Integrate documentation into the Definition of Done instead of leaving it for the end of the sprint. | (1) Reduce committed scope by ~20% in short sprints. (2) Add mandatory documentation update to DoD before PR merge. (3) Re-evaluate scope estimation during Sprint 3 Planning. | R04 – Scope pressure; R05 – Effort underestimation (tracked in Risk Register). |

---

## Strengths
The team demonstrated strong adaptability under time pressure. Communication was efficient through quick syncs, and pairing on critical tasks helped maintain delivery flow. Even with a shortened sprint, two planned features were delivered, indicating good collaboration and commitment.

## Weaknesses
The main limitation was the reduced sprint duration, which negatively impacted code review quality and documentation practices. The Definition of Done checklist and documentation updates were completed at the end of the sprint instead of being integrated into the workflow. Additionally, one task had to be postponed to the backlog due to underestimation and time constraints.

## Improvement Opportunities
For future short sprints, scope must be adjusted proportionally to the available time. A buffer period should be reserved to handle unexpected delays. Furthermore, documentation and quality checks should be embedded in the Definition of Done to prevent rushed finalization.

## Action Plan for Next Sprint (S3)
- Reduce committed scope when sprint duration is limited.
- Reserve at least one buffer period for risk mitigation.
- Enforce Definition of Done criteria, including documentation before PR merge.
- Improve estimation accuracy during Sprint Planning.

## Risks Identified and Follow-up
The sprint highlighted risks related to scope pressure (R04) and effort underestimation (R05). These risks are formally recorded in the Risk Register and will be monitored in Sprint 3 to ensure mitigation through improved planning and scope control.


#### Risk Management

**Risk Register**
The team maintains a **Risk Register** with:
- Risk identifier and description
- Probability and impact
- Mitigation strategy
- Contingency plan (when applicable)

**Review**
- The Risk Register is reviewed weekly during Sprint Planning and Retrospective meetings.
- Risks are identified, tracked, and updated throughout the project.


#### PMO Alignment

Project management follows PMO guidelines by:
- Keeping structured documentation of meetings and decisions.
- Applying formal sprint planning and retrospective practices.
- Identifying and tracking project risks systematically.
- Defining measurable improvement actions and success indicators.

Transparency, accountability, and continuous improvement are maintained across sprints.


#### Related Documentation

- **evolutionary-project-management-and-configuration-management.md**: Detailed Sprint 1 analysis (strengths, weaknesses, risks), risk table with mitigation and contingency, and Sprint 2 planning (including link to the planning spreadsheet).
- **ConfigurationManagement.md**: Version control, GitFlow, branch policies, and configuration practices.
All project and configuration management documentation is stored exclusively in the `/docs` folder, in accordance with the module’s evaluation requirements and repository organization standards.
