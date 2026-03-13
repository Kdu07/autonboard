# Project Management

This document describes the evolutionary project management practices used by the team, including Sprint analysis, Sprint planning, and development process management.  
The objective is to ensure traceability, continuous improvement, and alignment with PMO practices across all sprints.
All project management documentation is stored in the `/docs` folder as required by the module.


# 1. Current Sprint Analysis (Sprint 3)

## 1.1 Sprint Context

Sprint 3 continued the progressive development of the system while introducing stronger process discipline in documentation, testing, and deployment architecture.

The sprint focused on:
- Development of core features
- Database physical model implementation
- Deployment architecture definition
- Test planning and execution evidence
- Improvement of project management practices

Sprint duration required careful scope control and prioritization to ensure delivery of verifiable artifacts.


# 1.2 Sprint Metrics

| Metric | Value |
|------|------|
| Planned tasks | ~75 |
| Completed tasks | ~70 |
| Deferred tasks | ~2 |
| Completion rate | ~93% |
| Average PR review time | ~6 hours |
| Number of commits | ~45 |

These metrics provide observable evidence supporting the retrospective analysis.


# 1.3 Strengths

### Effective collaboration
The team maintained consistent communication through daily meetings and asynchronous updates.  
This improved alignment between development tasks and sprint objectives.

### Improved documentation discipline
Documentation was integrated into the Definition of Done, preventing documentation from being postponed until the end of the sprint.

### Risk awareness
Risks identified in previous sprints were actively monitored through the Risk Register.

### Clear task definition
The use of DoR and DoD improved task clarity and reduced misunderstandings during development.


# 1.4 Weaknesses

### Estimation inaccuracies
Some tasks required more effort than expected, indicating that effort estimation still needs improvement.

### Scope pressure in short sprints
The limited duration of the sprint created pressure near the end of the development cycle.

### Limited quantitative tracking in previous sprints
Earlier sprints lacked objective metrics such as task completion ratios and velocity, which limited analytical depth.


# 1.5 Improvement Actions

| Issue | Action | Responsible | Verification Sprint |
|------|------|------|------|
| Estimation inaccuracies | Improve estimation review during Sprint Planning | Entire team | Sprint 4 |
| Scope pressure | Reduce committed scope by ~20% when sprint duration is short | Scrum facilitator | Sprint 4 |
| Lack of metrics | Track completion rate and PR review time each sprint | PM role | Continuous |


# 1.6 Traceability of Improvements Across Sprints

To ensure continuous improvement, all improvement actions are tracked across sprints using Issues and documented evidence.

| Action ID | Description | Tracking Mechanism | Status |
|------|------|------|------|
| WK01 | Improve estimation accuracy | Added to retrospective checklist | Open |
| WK02 | Integrate documentation into DoD | Verified during PR review | Implemented |
| WK03 | Introduce sprint metrics tracking | Added to planning template | In progress |

Each action is reviewed at the beginning of the next sprint.


# 1.7 Risk Management

## Risk Register

| ID | Risk | Probability | Impact | Mitigation | Status |
|----|------|------|------|------|------|
| R01 | Effort underestimation | Medium | High | Improve estimation review | Open |
| R02 | Scope pressure in short sprints | Medium | Medium | Reduce planned scope | Mitigating |
| R03 | Documentation delay | Low | Medium | Integrate docs into DoD | Closed |

### Risk Tracking Mechanism

Risks are tracked through a **versioned Risk Register** updated every sprint.

Status categories:
- **Open**
- **Mitigating**
- **Closed**

Risk reviews occur during:
- Sprint Planning
- Sprint Retrospective

Evidence of updates is stored in `/docs`.


# 1.8 PMO Alignment

Project management practices are aligned with PMO principles through verifiable repository evidence.

| PMO Practice | Evidence in Repository |
|------|------|
| Sprint planning | Issues + Sprint Milestone |
| Task tracking | GitLab Issue Board |
| Risk management | Versioned Risk Register |
| Retrospective documentation | `/docs` retrospective sections |
| Documentation governance | `/docs` folder structure |

This structure ensures transparency, accountability, and traceability of decisions.


# 2. Next Sprint Planning (Sprint 4)

## 2.1 Sprint Objective

The objective of Sprint 4 is to **consolidate the functional increment of the system**, focusing on:

- Completing core features
- Stabilizing database interactions
- Improving testing coverage
- Preparing the system for an complete demonstration


# 2.2 Team Capacity Planning

| Team Members | Available Hours |
|------|------|
| Member 1 | 16h |
| Member 2 | 16h |
| Member 3 | 16h |
| Member 4 | 16h |
| Member 5 | 16h |
| Member 6 | 16h |
| Member 7 | 16h |

**Total Sprint Capacity: 130 hours**
Planning respects this capacity to prevent scope overload.


# 2.3 Prioritization Strategy
Tasks are prioritized according to:

1. Core functionality
2. Technical infrastructure
3. Testing and quality assurance
4. Documentation and evidence

This prioritization ensures delivery of a functional system increment.


# 2.4 Sprint Task Planning
Sprint 4 planning was defined to ensure a structured and incremental evolution of the project, incorporating the lessons learned from Sprint 1,2 and 3, and focusing on establishing solid technical and managerial foundations. Tasks were organized across architecture, data modeling, visual design, configuration management, and project governance, with effort estimated using T-shirt sizing and clear Definition of Ready (DoR) and Definition of Done (DoD) criteria to ensure readiness, clarity, and objective task completion:
[ Sprint 4 Planning – Google Spreadsheet ](https://docs.google.com/spreadsheets/d/1je6S9oTBlyXyt9mwaMhKtxEwhymf9JDFZCeS2UA0IpI/edit?usp=sharing)


# 2.5 Definition of Ready (DoR)
A task is considered ready when:

- Clear description exists
- Acceptance criteria are defined
- Dependencies are identified
- Required resources are available


# 2.6 Definition of Done (DoD)

A task is considered done when:

- Implementation is completed
- Code passes review
- Tests are executed successfully
- Documentation is updated
- Evidence is committed to the repository


# 3. Group Development Process Management

## 3.1 Daily Meetings Policy

**Frequency:**  
Daily during project workdays.

**Duration:**  
Maximum of 15 minutes.

**Participants:**  
All team members.

**Structure:**
- What was completed since the last meeting
- What will be done next
- Blockers or risks identified

**Traceability rule:**
Each update must reference the corresponding Issue ID.


# 3.2 GitLab Usage Policy

The project uses a centralized repository.

Key rules:

- All development work must be associated with an Issue.
- Pull Requests are mandatory for merges.
- Direct commits to main or develop are not allowed.


# 3.3 Commit Policy

Commit messages follow **Conventional Commits**.

Examples:


feat(api): add user endpoint
fix(auth): resolve login validation issue
docs: update deployment documentation


Rules:

- Commits must be small and focused.
- Each commit should reference the related Issue.


# 3.4 Development Workflow

The team follows the workflow below:

1. Task created as Issue
2. Issue assigned to developer
3. Feature branch created from develop
4. Development performed
5. Pull Request opened
6. Code review conducted
7. Merge into develop
8. Documentation updated
9. Issue closed


# 3.5 Code Review Policy

- At least **one reviewer approval** is required.
- Reviewers verify:
  - Code correctness
  - Compliance with standards
  - Documentation updates
  - Test results


# 3.6 Communication Policy

Communication occurs through the team’s official channel.

Rules:

- Blockers must be reported immediately
- Decisions must be documented
- Transparency in task progress is mandatory

