# Project Management

This document describes the evolutionary project management practices used by the team, including Sprint analysis, Sprint planning, and development process management.  
The objective is to ensure traceability, continuous improvement, and alignment with PMO practices across all sprints.  
All project management documentation is stored in the `/docs` folder as required by the module.

---

# 1. Current Sprint Analysis (Sprint 4)

## 1.1 Sprint Context

Sprint 4 focused on consolidating the system into a stable and demonstrable functional increment. Building on previous sprints, the team emphasized quality, integration, and validation of core components.

The sprint focused on:
- Completion of core features
- Stabilization of database interactions
- Expansion of test coverage
- Validation of deployment architecture
- Strengthening of project management practices

---

## 1.2 Sprint Metrics

| Metric | Value |
|------|------|
| Planned tasks | ~65 |
| Completed tasks | ~60 |
| Deferred tasks | ~3 |
| Completion rate | ~92% |
| Average PR review time | ~5 hours |
| Number of commits | ~50 |

These metrics provide objective evidence to support the sprint retrospective and indicate improved process stability compared to previous sprints.

---

## 1.3 Strengths

### Improved estimation accuracy  
Effort estimation improved compared to Sprint 3, as reflected by the high completion rate (~92%) and the low number of deferred tasks (~3), indicating better alignment between planned and actual effort.

### System consolidation  
The team successfully stabilized key features, reducing rework and enabling more consistent PR review times (~5 hours), which contributed to smoother integration and readiness for demonstration.

### Better scope control  
Scope adjustments applied after Sprint 3 resulted in fewer last-minute task additions and a more balanced workload, helping maintain delivery predictability within the planned sprint capacity.

---

## 1.4 Weaknesses

### Testing still evolving  
Despite improvements, test coverage was not uniformly applied across all modules, which limited validation depth and increased the risk of undetected defects during integration and deployment phases.

### Dependency bottlenecks  
Dependencies between backend and frontend tasks caused localized delays, particularly in integration points, temporarily blocking progress and reducing parallelization of work.

### Limited measurement of quality metrics  
While delivery metrics were tracked, quality-related metrics (e.g., test coverage %, defect rate) were not consistently measured, reducing visibility into product quality evolution.

---

## 1.5 Improvement Actions

| Issue | Action | Responsible | Verification Sprint |
|------|------|------|------|
| Technical debt accumulation | Allocate dedicated refactoring tasks in next sprint | Entire team | Sprint 5 |
| Incomplete test coverage | Define minimum coverage targets | QA / Team | Sprint 5 |
| Dependency delays | Improve task sequencing and dependency mapping | Scrum facilitator | Sprint 5 |

---

## 1.6 Traceability of Improvements Across Sprints

Continuous improvement actions remain tracked through Issues and documented evidence.

| Action ID | Description | Tracking Mechanism | Status |
|------|------|------|------|
| WK01 | Improve estimation accuracy | Retrospective checklist | In progress |
| WK02 | Integrate documentation into DoD | PR verification | Implemented |
| WK03 | Introduce sprint metrics tracking | Planning template | Implemented |
| WK04 | Improve test coverage | Test reports + PRs | In progress |

Each action continues to be reviewed at the beginning of subsequent sprints.

---

## 1.7 Risk Management

## Risk Register

| ID | Risk | Probability | Impact | Mitigation | Status |
|----|------|------|------|------|------|
| R01 | Effort underestimation | Low | Medium | Improved estimation process | Mitigating |
| R02 | Scope pressure | Low | Medium | Controlled sprint planning | Mitigating |
| R03 | Incomplete test coverage | Medium | High | Increase testing effort | Open |

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

---

## 1.8 PMO Alignment

Project management practices remain aligned with PMO principles through verifiable repository evidence.

| PMO Practice | Evidence in Repository |
|------|------|
| Sprint planning | Issues + Sprint Milestone |
| Task tracking | GitLab Issue Board |
| Risk management | Versioned Risk Register |
| Retrospective documentation | `/docs` retrospective sections |
| Documentation governance | `/docs` folder structure |

This structure ensures transparency, accountability, and traceability of decisions.

---

# 2. Next Sprint Planning (Sprint 5)

## 2.1 Sprint Objective

The objective of Sprint 5 is to **refine, optimize, and finalize the system**, focusing on:

- Reducing technical debt
- Improving test coverage and reliability
- Final system validation
- Performance and usability improvements

---

## 2.2 Team Capacity Planning

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

---

## 2.3 Prioritization Strategy

Tasks are prioritized according to:

1. System stability and bug fixing  
2. Technical debt reduction  
3. Testing and quality assurance  
4. Documentation and final evidence  

This prioritization ensures a stable and high-quality final delivery.

---

## 2.4 Sprint Task Planning

Sprint 5 planning is focused on refining the system and addressing remaining gaps identified in Sprint 4. Tasks are structured to ensure incremental improvements in quality, stability, and performance.

Effort estimation continues using T-shirt sizing, with clear Definition of Ready (DoR) and Definition of Done (DoD) criteria to ensure task clarity and completion.

---

## 2.5 Definition of Ready (DoR)

A task is considered ready when:

- Clear description exists  
- Acceptance criteria are defined  
- Dependencies are identified  
- Required resources are available  

---

## 2.6 Definition of Done (DoD)

A task is considered done when:

- Implementation is completed  
- Code passes review  
- Tests are executed successfully  
- Documentation is updated  
- Evidence is committed to the repository  

---

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

---

## 3.2 GitLab Usage Policy

The project uses a centralized repository.

Key rules:

- All development work must be associated with an Issue  
- Pull Requests are mandatory for merges  
- Direct commits to main or develop are not allowed  

---

## 3.3 Commit Policy

Commit messages follow **Conventional Commits**.

Examples:
