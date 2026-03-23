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

### Dependency bottlenecks  
Dependencies between backend and frontend tasks caused localized delays, particularly in integration points, temporarily blocking progress and reducing parallelization of work.

### Limited measurement of quality metrics  
While delivery metrics were tracked, quality-related metrics (e.g., test coverage %, defect rate) were not consistently measured, reducing visibility into product quality evolution.

---

## 1.5 Improvement Actions (Traceable)

| Issue | Action | Success Criteria | Tracking Mechanism | Responsible | Verification Sprint |
|------|------|------|------|------|------|
| Dependency bottlenecks | Improve task sequencing and dependency mapping | Reduce blocked tasks to < 1 per day | Issue tracking + daily logs | Scrum facilitator | Sprint 5 |
| Limited quality metrics | Define and track test coverage | Achieve ≥ 70% test coverage | Test reports + CI pipeline | Team | Sprint 5 |

---

## 1.6 Traceability of Improvements Across Sprints  

Continuous improvement actions are tracked through Issues and supporting evidence.

| Action ID | Description | Linked Issue | Success Criteria | Tracking Mechanism | Status |
|-----------|-------------|-------------|------------------|-------------------|--------|
| WK01 | Improve estimation accuracy | Sprint metrics deviation | Completion rate ≥ 90% | Sprint metrics | In progress |
| WK02 | Integrate documentation into DoD | Documentation delays | 100% PRs include docs | PR verification | Implemented |
| WK03 | Introduce sprint metrics tracking | Lack of metrics | Metrics tracked every sprint | Planning template | Implemented |
| WK04 | Improve test coverage | Limited quality metrics | ≥ 70% coverage | Test reports + CI | In progress |
| WK05 | Improve test strategy definition | Weak validation process | Test plan defined and used | Test documentation | In progress |
| WK06 | Enhance backlog refinement clarity | Task ambiguity | All tasks meet DoR | Grooming sessions | In progress |
| WK07 | Reduce scope overload | Scope pressure | Planned vs delivered ≥ 90% | Sprint metrics | In progress |
| WK08 | Improve QA validation process | Testing inconsistency | All features validated before merge | QA checklist + PR flow | In progress |

These actions are reviewed at the start of each new sprint to ensure continuity, measurability, and validation of improvements.

---

## 1.7 Risk Management

## Risk Register

| ID | Risk | Probability | Impact | Mitigation | Status | Evolution |
|----|------|------|------|------|------|------|
| R01 | Effort underestimation | Low | Medium | Improved estimation process | Mitigating | Reduced from Sprint 3 |
| R02 | Scope pressure | Low | Medium | Controlled sprint planning | Mitigating | Reduced from Sprint 3 |
| R03 | Incomplete test coverage | Medium | High | Increase testing effort | Open | New / more visible in Sprint 4 |

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

This structure ensures transparency, accountability, and traceability of decisions.