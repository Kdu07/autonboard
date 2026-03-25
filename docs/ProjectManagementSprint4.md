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
| WK01 | Enhance backlog refinement clarity | Task ambiguity | All tasks meet DoR | Grooming sessions | In progress |
| WK02 | Reduce scope overload | Scope pressure | Planned vs delivered ≥ 90% | Sprint metrics | In progress |
| WK03 | Improve QA validation process | Testing inconsistency | All features validated before merge | QA checklist + PR flow | In progress |

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

# 2. Sprint planning (Sprint 5)

## 2.1 Sprint Objective

The objective of Sprint 5 is to **consolidate the functional increment of the system**, focusing on:

- Completing core features
- Stabilizing database interactions
- Improving testing coverage
- Preparing the system for an complete demonstration


# 3. Cost Analysis and Effort Estimation

This section presents an estimation of development effort and associated costs for the project, ensuring coherence between workload, technical complexity, and required resources.

---

## 3.1 Effort Estimation

Effort estimation is based on Sprint 4 planning, considering the team’s total capacity and the complexity of implemented features.

| Category | Estimated Hours |
|------|------|
| Backend Development | 32h |
| Frontend Development | 32h |
| Database Management | 16h |
| Testing & QA | 16h |
| DevOps / Deployment | 8h |
| Documentation | 8h |

**Total Estimated Effort: 112 hours**

This estimation is consistent with the sprint capacity (~130h), leaving buffer time (~18h) for unexpected issues and rework.

---

## 3.2 Cost Estimation

A standardized hourly rate is adopted to ensure consistency and comparability in financial estimation.

- **Hourly Rate:** $25/hour (reference value for academic and small-scale software projects)

| Category | Hours | Cost |
|------|------|------|
| Backend Development | 32h | $800 |
| Frontend Development | 32h | $800 |
| Database Management | 16h | $400 |
| Testing & QA | 16h | $400 |
| DevOps / Deployment | 8h | $200 |
| Documentation | 8h | $200 |

**Total Estimated Effort Cost: $2,800**

This distribution reflects the technical complexity of the system, with higher allocation to backend and frontend development due to integration requirements, and balanced effort in testing and data management to ensure system reliability.

---

## 3.3 Resource Identification

The following tools and infrastructure are required for system development and operation:

| Resource Type | Tool / Service | Purpose | Cost |
|------|------|------|------|
| Version Control | GitLab | Code repository and CI/CD | Free |
| Backend Hosting | Amazon EC2 (t3.micro) | API hosting | ~$8–12/month |
| Database | Supabase / PostgreSQL | Data storage | Free tier |
| Frontend Hosting | Amazon EC2 (t3.micro) | Frontend deployment | ~$8–12/month |
| Development Tools | VS Code | Code development | Free |
| Testing Tools | Jest | Unit testing | Free |

Most tools leverage free-tier plans, minimizing infrastructure costs while maintaining adequate performance and scalability to support the system’s functional requirements.

---

## 3.4 Consistency Analysis

The estimation demonstrates consistency across effort, cost, and technical scope:

- **Effort vs Capacity:** Total estimated effort (112h) remains within sprint capacity (~130h), preserving a ~14% buffer for uncertainties  
- **Effort vs Complexity:** Higher effort allocation to backend and frontend reflects integration complexity and system core functionality  
- **Metrics Alignment:** Completion rate (~92%) supports the realism of planning and estimation  
- **Cost Proportionality:** Financial estimation scales directly with effort distribution, ensuring coherence  

---

## 3.5 Final Cost Summary

The total project cost combines **human effort** and **infrastructure costs**, providing a complete financial view.

### Effort Cost
- **Total Development Cost:** $2,800  

### Infrastructure Cost (Monthly)

| Resource | Estimated Cost |
|------|------|
| Backend (EC2 t3.micro) | ~$8–12 |
| Frontend (EC2 t3.micro) | ~$8–12 |
| Database (Supabase) | Free tier |
| Other tools | Free |

**Total Monthly Infrastructure Cost: ~$16–24**

---

### Total Cost Perspective

| Cost Type | Value |
|------|------|
| Development (one-time) | $2,800 |
| Infrastructure (monthly) | ~$16–24 |

---

## 3.6 Key Considerations

- The **primary cost driver** is human effort, representing over 95% of total project cost  
- Infrastructure costs are minimized through **free-tier services and lightweight cloud instances**  
- A **buffer (~14%)** is included in effort estimation to absorb risks and uncertainties  
- The model is **scalable**, as infrastructure costs can grow proportionally with system usage  

---