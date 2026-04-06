# ProjectManagement.md

## Equiem Onboarding Intake Platform — Sprint 5 Project Management

## 1. Current Sprint Analysis (Sprint 5)

### 1.1 Sprint Context

Sprint 5 represented the final consolidation sprint of the project lifecycle. Building on the lessons learned and improvement actions committed in Sprint 4, the team focused on delivering a complete, demonstrable, and well-documented system increment. The sprint prioritized closing open quality gaps, stabilizing all integration points, and preparing both the product and documentation for final delivery.

The sprint focused on:

- Completion and validation of all remaining core features
- Full backend-frontend integration with end-to-end flow verification
- Expansion of unit and functional test coverage to meet the ≥ 70% target
- Cloud deployment validation and environment consistency
- Comprehensive documentation updates across all required artifacts
- Preparation of final presentation and post-mortem evidence

### 1.2 Sprint Metrics

| Metric | Sprint 3 | Sprint 4 | Sprint 5 |
|---|---|---|---|
| Planned tasks | ~55 | ~65 | ~62 |
| Completed tasks | ~48 | ~60 | ~59 |
| Deferred tasks | ~7 | ~3 | ~3 |
| Completion rate | ~87% | ~92% | ~95% |
| Average PR review time | ~7 hours | ~5 hours | ~4 hours |
| Test coverage (estimated) | ~40% | ~55% | ~72% |
| Blocked tasks (daily avg) | ~2.5 | ~1.8 | ~0.8 |

### 1.3 Strengths

**Highest completion rate of the project lifecycle**
Sprint 5 achieved a ~95% completion rate, the highest across all sprints. This reflects matured estimation practices and a team that had sufficiently calibrated effort allocation to the specific complexity of this project.

**Test coverage target achieved**
The team crossed the ≥ 70% test coverage threshold committed as a Sprint 4 improvement action. Backend unit tests via Jest covered critical service layers, and Angular component tests validated core frontend interactions. This directly addressed the most significant quality risk identified in Sprint 4 (R03).

**Dependency bottleneck significantly reduced**
The average number of blocked tasks per day dropped from ~1.8 in Sprint 4 to ~0.8 in Sprint 5, confirming the effectiveness of the dependency mapping improvements applied to task sequencing. The Scrum facilitator's proactive re-ordering of integration tasks was a measurable contributor to this reduction.

**Successful cloud deployment and environment consistency**
The system was successfully deployed to Amazon EC2 with consistent behavior across local and cloud environments. All seven team members validated local setup, and no environment-specific failures were reported during the final demo rehearsal.

**Documentation completeness**
All primary documentation artifacts (Projeto.md, GuiaPadroesDesenvolvimento.md, ProjectManagement.md, README.md) were finalized with evidence committed to the repository, satisfying both PMO criteria and the project's Definition of Done.

### 1.4 Weaknesses

**Usability testing execution constraints**
Usability tests (A17-T18) were conducted with a limited sample of external users (n=3), reducing the statistical significance of the feedback gathered. While qualitative insights were documented, the absence of a broader user panel limited the depth of the usability analysis.

**Post-mortem reflection time compressed**
Given the volume of deliverables concentrated in Sprint 5, the team had less dedicated time for structured retrospective reflection than initially planned. The post-mortem analysis, while completed, benefited from less live discussion time than would have been ideal for a final sprint.

**Inconsistent commit granularity in final days**
In the final days of the sprint, some commits bundled multiple logical changes, reducing traceability between individual tasks and repository changes. While functional correctness was not affected, this represents a deviation from the Conventional Commits policy.

### 1.5 Improvement Actions (Traceable)

| Issue | Action | Success Criteria | Tracking Mechanism | Responsible | Verification Sprint |
|---|---|---|---|---|---|
| Usability sample size | Recruit broader external user panel for future cycles | Minimum 8 participants per usability round | Test protocol + participant log | Team lead | Future project |
| Commit granularity deviation | Reinforce atomic commit policy in branching guidelines | Zero multi-concern commits per sprint | PR review checklist | All developers | Future project |
| Post-mortem time allocation | Reserve dedicated retro slot (≥ 2h) in final sprint planning | Retro evidence documented within sprint | Sprint calendar | Scrum facilitator | Future project |

### 1.6 Traceability of Improvements Across Sprints

| Action ID | Description | Origin Sprint | Success Criteria | Status | Verified In |
|---|---|---|---|---|---|
| WK01 | Enhance backlog refinement clarity | Sprint 3 | All tasks meet DoR | Closed | Sprint 4 |
| WK02 | Reduce scope overload | Sprint 3 | Planned vs delivered ≥ 90% | Closed | Sprint 5 |
| WK03 | Improve QA validation process | Sprint 3 | All features validated before merge | Closed | Sprint 5 |
| WK04 | Improve dependency mapping and task sequencing | Sprint 4 | Blocked tasks < 1 per day | Closed | Sprint 5 |
| WK05 | Define and track test coverage formally | Sprint 4 | ≥ 70% test coverage | Closed | Sprint 5 |

All five tracked improvement actions reached Closed status by the end of Sprint 5, representing full resolution of the improvement backlog accumulated across the project lifecycle.

### 1.7 Risk Management

**Risk Register — Final Status**

| ID | Risk | Probability | Impact | Mitigation | Status | Evolution |
|---|---|---|---|---|---|---|
| R01 | Effort underestimation | Low | Medium | Improved estimation and T-shirt sizing calibration | Closed | Fully mitigated across sprints |
| R02 | Scope pressure | Low | Medium | Controlled sprint planning with explicit capacity limits | Closed | No overload in Sprints 4–5 |
| R03 | Incomplete test coverage | Low | High | Dedicated testing tasks and CI coverage reporting | Closed | Coverage reached 72% in Sprint 5 |
| R04 | Cloud deployment instability | Low | High | Early deployment in Sprint 4, validated in Sprint 5 | Closed | No production incidents |
| R05 | Final demo readiness | Low | High | Rehearsal sessions scheduled and executed | Closed | Demo performed successfully |

Risks were tracked through a versioned Risk Register updated at the beginning and end of each sprint. Status categories used: Open, Mitigating, Closed. Risk reviews were conducted during Sprint Planning and Sprint Retrospective sessions, with evidence stored in /docs.

### 1.8 PMO Alignment

| PMO Practice | Evidence in Repository |
|---|---|
| Sprint planning | Issues + Sprint Milestone |
| Task tracking | GitLab Issue Board |
| Risk management | Versioned Risk Register in /docs |
| Definition of Ready | Documented per task in Sprint Planning section |
| Definition of Done | Applied to all completed issues |
| Configuration management | Gitflow + Semantic Versioning documented in GuiaPadroesDesenvolvimento.md |
| Test evidence | Coverage reports + functional test results in Projeto.md |
