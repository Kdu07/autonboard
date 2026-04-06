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

## 2. Metrics Analysis

### 2.1 Sprint Performance Overview

| Metric | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Sprint 5 |
|---|---|---|---|---|---|
| Planned tasks | ~30 | ~45 | ~55 | ~65 | ~62 |
| Completed tasks | ~22 | ~38 | ~48 | ~60 | ~59 |
| Deferred tasks | ~8 | ~7 | ~7 | ~3 | ~3 |
| Completion rate | ~73% | ~84% | ~87% | ~92% | ~95% |
| Avg PR review time (h) | ~10 | ~8 | ~7 | ~5 | ~4 |
| Test coverage (%) | ~15% | ~28% | ~40% | ~55% | ~72% |
| Blocked tasks (daily avg) | ~4.0 | ~3.2 | ~2.5 | ~1.8 | ~0.8 |

### 2.2 Completion Rate Trend

The completion rate grew from 73% in Sprint 1 to 95% in Sprint 5, a 22-percentage-point improvement across the project. This trajectory was not linear: the largest single-sprint gain (+11 pp) occurred between Sprint 1 and Sprint 2, which coincides with the team's initial calibration to the workload and process. From Sprint 2 onward, gains became incremental but sustained (+3 pp, +5 pp, +3 pp), indicating a stabilization of the process rather than erratic fluctuation. The absence of any regression sprint is itself a meaningful signal of team maturity.

The reduction in deferred tasks from ~8 in Sprint 1 to ~3 in Sprint 5 correlates directly with the introduction of explicit DoR criteria in Sprint 3. Tasks that were not genuinely ready to be picked up were no longer accepted into the sprint, reducing the artificial inflation of planned work.

### 2.3 PR Review Time Trend

Average PR review time was halved over the project lifecycle, dropping from ~10 hours in Sprint 1 to ~4 hours in Sprint 5. This improvement reflects multiple converging factors: the team's growing familiarity with the codebase, the formalization of code review standards in the development process guide, and the reduction in PR complexity as the architecture stabilized. The most pronounced improvement between Sprints 3 and 4 (~7h to ~5h) coincides with the introduction of a review SLA and clearer PR scope expectations, suggesting that structural interventions in the process had measurable effect beyond team experience alone.

Shorter review times directly contributed to higher throughput: PRs that sit for fewer hours unblock dependent tasks faster, reducing the cascading impact of integration delays that were prominent in Sprints 1 and 2.

### 2.4 Test Coverage Progression

Test coverage evolved from an estimated 15% in Sprint 1 to 72% in Sprint 5. The growth was gradual through the first three sprints as the team focused on establishing architectural foundations and core feature delivery. The step-change between Sprint 4 (~55%) and Sprint 5 (~72%) reflects the targeted investment in testing tasks specifically introduced into the Sprint 5 backlog in response to the formal improvement action WK05.

This pattern highlights a known tension in software projects: test coverage tends to lag feature development, particularly in early sprints when velocity pressure is high. The team's decision to formally track coverage as a metric from Sprint 3 onward and to assign explicit test tasks rather than treating testing as implicit was the structural change that enabled the final leap.

Reaching 72% coverage in the final sprint means the codebase is meaningfully protected against regression, though it also means the benefit of that coverage arrives late in the project lifecycle, limiting its value for catching integration defects early.

### 2.5 Blocked Tasks Trend

The daily average of blocked tasks declined consistently from ~4.0 in Sprint 1 to ~0.8 in Sprint 5. This metric is particularly diagnostic because it captures dependency management quality more directly than completion rate does. A high number of blocked tasks in Sprints 1 and 2 reflected an undifferentiated backlog where backend and frontend tasks were interleaved without explicit dependency ordering. The introduction of dependency mapping as a formal planning step in Sprint 4 produced the most significant single-sprint reduction in this metric (-0.7), with continued improvement in Sprint 5 confirming the practice's durability.

The correlation between blocked task reduction and PR review time reduction is noteworthy: as tasks became less blocked, developers could pick up reviewable work earlier in the sprint cycle, keeping review queues distributed across the sprint rather than concentrated at the end.

### 2.6 Efficiency and Effectiveness Summary

From a process efficiency perspective, the team demonstrated consistent improvement in delivering planned work with less friction over time. The combination of falling review times, falling blocked tasks, and rising completion rates indicates that the team's workflow became progressively less wasteful.

From an effectiveness perspective, the consistent growth in scope ambition (planned tasks grew from ~30 to ~65 at peak) without a collapse in quality metrics suggests the team was not trading quality for throughput. The test coverage trajectory, while lagging, confirms that the final increment is technically sound rather than merely functionally complete.

The primary insight this data supports for future projects is the importance of instrumenting metrics from Sprint 1. The team had limited quantitative visibility in early sprints, which meant that improvement actions were driven by observation rather than data until Sprint 3. Earlier metric definition would have accelerated the identification of bottlenecks and enabled faster intervention.

## 3. Post-Mortem Analysis

### 3.1 Overview

This post-mortem analysis reflects on the full lifecycle of the Equiem Onboarding Intake Platform project, covering five sprints of development. The objective is to document what worked well, what did not, and what concrete lessons the team carries forward. This analysis is written after the completion of Sprint 5 and draws on the accumulated evidence from metrics, retrospective notes, and team discussions.

### 3.2 Achievements and Moments Where the Team Exceeded Expectations

**Architectural clarity from the outset**
The decision to define a clear technical stack (Node.js + TypeScript on the backend, Angular on the frontend) and document it formally in Sprint 1 paid dividends throughout the project. Onboarding new team members into the codebase was consistently smooth, and technical debt from architectural ambiguity was largely avoided.

**Robust configuration management**
The team's implementation of Gitflow, Semantic Versioning, and Conventional Commits was genuinely applied rather than nominally documented. The PR history reflects consistent branch naming, meaningful commit messages, and a functioning review workflow. This level of configuration management discipline meaningfully reduced integration conflicts and rollback incidents throughout the project.

**PMO alignment as a living practice**
The team consistently updated the project management documentation throughout the project rather than backloading all documentation to the final sprint. This decision produced documentation that accurately reflects the project's evolution rather than a retroactively idealized narrative.

**Scope discipline under pressure**
The team resisted the temptation to continuously expand scope in response to new ideas and stakeholder feedback. Post-MVP features were logged but not admitted into the active sprints, and the Sprint 4 scope reduction demonstrated organizational maturity in trading ambition for delivery reliability.

**End-to-end delivery of a working system**
The team delivered a functional, cloud-deployed, documented, and tested system that directly addresses the problem defined in Sprint 1. The product vision of replacing a manual, email-based onboarding process with a structured self-service intake platform was realized within the project scope, reflecting the team's consistent ability to connect daily execution to strategic purpose.

### 3.3 Challenges and Improvement Opportunities

**Test coverage was treated as a lagging activity**
The most significant process failure of the project was the systematic deferral of testing. While ultimately resolved by Sprint 5, a 15% coverage baseline in Sprint 1 exposed the codebase to undetected integration defects during the period of heaviest feature development. In future projects, a minimum coverage gate should be enforced from Sprint 1, even if the initial target is modest (e.g., 40%).

**Dependency mapping was introduced too late**
The most impactful single improvement in the project's metrics followed the introduction of formal dependency mapping in Sprint 4. This practice should have been introduced in Sprint 2, when the backlog first grew complex enough to generate inter-task dependencies. The cost of this late introduction was measurable in blocked time across Sprints 2 and 3.

**Quality metrics were not tracked from the beginning**
The team tracked delivery metrics earlier than quality metrics. This created a visibility gap in which the product appeared to be progressing well by output measures while quality debt was accumulating. A balanced metrics dashboard from Sprint 1, combining delivery, quality, and process health indicators, would have enabled earlier intervention.

**Usability validation was undersized**
The usability testing conducted in Sprint 5 was technically compliant but not sufficient to validate user experience assumptions with statistical confidence. Three external participants provide qualitative signal but no statistical basis for design decisions. Future projects should either plan for a larger user panel or explicitly acknowledge the limitations of the usability evidence collected.

**End-of-sprint commit concentration**
In multiple sprints, commit volume spiked sharply in the final two days before sprint closure. This pattern reduces the effectiveness of code review under deadline pressure and concentrates integration risk at the worst possible moment. Future teams should monitor commit distribution across the sprint and treat late-sprint spikes as a planning signal rather than a delivery norm.
