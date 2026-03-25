# Project Management

This document describes the evolutionary project management practices used by the team, including Sprint analysis, Sprint planning, and development process management.  
The objective is to ensure traceability, continuous improvement, and alignment with PMO practices across all sprints.  
All project management documentation is stored in the `/docs` folder as required by the module.

# 1. Current Sprint Analysis (Sprint 4)

## 1.1 Sprint Context

Sprint 4 focused on consolidating the system into a stable and demonstrable functional increment. Building on previous sprints, the team emphasized quality, integration, and validation of core components.

The sprint focused on:
- Completion of core features  
- Stabilization of database interactions  
- Expansion of test coverage  
- Validation of deployment architecture  
- Strengthening of project management practices  

## 1.2 Sprint Metrics

| Metric | Value |
|------|------|
| Planned tasks | ~65 |
| Completed tasks | ~60 |
| Deferred tasks | ~3 |
| Completion rate | ~92% |
| Average PR review time | ~5 hours |

These metrics provide objective evidence to support the sprint retrospective and indicate improved process stability compared to previous sprints.

## 1.3 Strengths

### Improved estimation accuracy  
Effort estimation improved compared to Sprint 3, as reflected by the high completion rate (~92%) and the low number of deferred tasks (~3), indicating better alignment between planned and actual effort.

### System consolidation  
The team successfully stabilized key features, reducing rework and enabling more consistent PR review times (~5 hours), which contributed to smoother integration and readiness for demonstration.

### Better scope control  
Scope adjustments applied after Sprint 3 resulted in fewer last-minute task additions and a more balanced workload, helping maintain delivery predictability within the planned sprint capacity.

## 1.4 Weaknesses

### Dependency bottlenecks  
Dependencies between backend and frontend tasks caused localized delays, particularly in integration points, temporarily blocking progress and reducing parallelization of work.

### Limited measurement of quality metrics  
While delivery metrics were tracked, quality-related metrics (e.g., test coverage %, defect rate) were not consistently measured, reducing visibility into product quality evolution.

## 1.5 Improvement Actions (Traceable)

| Issue | Action | Success Criteria | Tracking Mechanism | Responsible | Verification Sprint |
|------|------|------|------|------|------|
| Dependency bottlenecks | Improve task sequencing and dependency mapping | Reduce blocked tasks to < 1 per day | Issue tracking + daily logs | Scrum facilitator | Sprint 5 |
| Limited quality metrics | Define and track test coverage | Achieve ≥ 70% test coverage | Test reports + CI pipeline | Team | Sprint 5 |

## 1.6 Traceability of Improvements Across Sprints  

Continuous improvement actions are tracked through Issues and supporting evidence.

| Action ID | Description | Linked Issue | Success Criteria | Tracking Mechanism | Status |
|-----------|-------------|-------------|------------------|-------------------|--------|
| WK01 | Enhance backlog refinement clarity | Task ambiguity | All tasks meet DoR | Grooming sessions | In progress |
| WK02 | Reduce scope overload | Scope pressure | Planned vs delivered ≥ 90% | Sprint metrics | In progress |
| WK03 | Improve QA validation process | Testing inconsistency | All features validated before merge | QA checklist + PR flow | In progress |

These actions are reviewed at the start of each new sprint to ensure continuity, measurability, and validation of improvements.

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


## 2.3 Prioritization Strategy
Tasks are prioritized according to:

1. Core functionality
2. Technical infrastructure
3. Testing and quality assurance
4. Documentation and evidence

This prioritization ensures delivery of a functional system increment.


## 2.4 Sprint Task Planning
Sprint 4 planning was defined to ensure a structured and incremental evolution of the project, incorporating the lessons learned from Sprint 1,2 and 3, and focusing on establishing solid technical and managerial foundations. Tasks were organized across architecture, data modeling, visual design, configuration management, and project governance, with effort estimated using T-shirt sizing and clear Definition of Ready (DoR) and Definition of Done (DoD) criteria to ensure readiness, clarity, and objective task completion:

| ID       | Category            | Task Name                                      | Description                                                                 | Size | DoR (Ready)                                 | DoD (Done)                                                                 |
|:---------|:--------------------|:-----------------------------------------------|:----------------------------------------------------------------------------|:-----|:---------------------------------------------|:---------------------------------------------------------------------------|
| A17-T1   | Architecture        | Define Coding Architecture                     | Define backend (Node.js + TS) and frontend (Angular) architecture.         | M    | Requirements and stack defined               | Architecture documented in Projeto.md                                      |
| A17-T2   | Architecture        | Create Directory Structure                     | Create standardized folder structure (src, docs, tests, etc.).             | S    | Architecture defined                         | Structure implemented and documented in Projeto.md                         |
| A17-T3   | Architecture        | Create Architecture Diagram                    | Create visual diagram of system structure.                                 | S    | Architecture defined                         | Diagram added to Projeto.md                                                |
| A17-T4   | Standards           | Define Coding Standards                        | Define naming, formatting and conventions.                                | S    | Team agreement                              | Documented in GuiaPadroesDesenvolvimento.md                                |
| A17-T5   | Standards           | Define Design Patterns                         | Identify patterns (Singleton, Observer, etc.) and usage.                  | S    | Architecture defined                         | Patterns documented with examples                                          |
| A17-T6   | Standards           | Document Standards Guide                       | Consolidate standards + patterns document.                                | XS   | Standards defined                            | GuiaPadroesDesenvolvimento.md completed                                    |
| A17-T7   | Development         | Implement Backend Features                     | Develop planned backend features using Node.js + TypeScript.              | M    | Architecture ready                           | Features implemented and aligned with standards                            |
| A17-T8   | Development         | Implement Frontend Features                    | Develop Angular UI features.                                              | M    | Wireframes + API ready                       | Features integrated with backend                                           |
| A17-T9   | Development         | Integrate Backend and Frontend                 | Ensure full communication between frontend and backend.                   | M    | APIs available                               | End-to-end flow working                                                    |
| A17-T10  | Development         | Document Feature Progress                      | Document delivered features and deviations.                              | S    | Features implemented                         | Progress documented in Projeto.md                                          |
| A17-T11  | Development         | Apply Sprint 4 Feedback                        | Implement improvements from previous tests.                              | M    | Feedback available                           | Changes implemented or justified                                           |
| A17-T12  | Testing             | Define Unit Test Strategy                      | Define tools, structure and scope of unit tests.                          | S    | Framework selected                           | Strategy documented in Projeto.md                                          |
| A17-T13  | Testing             | Implement Backend Unit Tests                   | Create unit tests for backend services.                                  | M    | Backend implemented                          | Tests executed successfully                                                |
| A17-T14  | Testing             | Implement Frontend Unit Tests                  | Create Angular unit tests.                                                | M    | Frontend implemented                         | Tests executed successfully                                                |
| A17-T15  | Testing             | Document Test Coverage                         | Analyze and document coverage results.                                   | S    | Tests executed                               | Coverage documented in Projeto.md                                          |
| A17-T16  | Testing             | Execute Functional Tests                       | Execute FR tests based on requirements.                                  | M    | Test cases defined                           | Results and evidence documented                                            |
| A17-T17  | Testing             | Execute NFR Tests                              | Perform performance, scalability, etc.                                   | M    | Metrics defined                              | Results documented                                                         |
| A17-T18  | Testing             | Conduct Usability Tests                        | Run usability tests with external users.                                 | M    | Test protocol ready                          | Feedback documented                                                        |
| A17-T19  | Testing             | Document Test Evidence                         | Document cases, results and proof of execution.                          | M    | Tests executed                               | Projeto.md updated with full evidence                                      |
| A17-T20  | DevOps              | Ensure Local Environment Setup                 | Ensure system runs on all team machines.                                 | S    | Setup instructions defined                   | All members able to run system                                             |
| A17-T21  | DevOps              | Deploy System to Cloud                         | Ensure application runs in cloud environment.                            | M    | Deployment strategy defined                  | System accessible in cloud                                                 |
| A17-T22  | DevOps              | Validate Environment Consistency               | Validate consistency across environments.                               | S    | Deployment done                              | No environment issues                                                      |
| A18-T1   | Management          | Sprint Analysis                                | Analyze strengths, weaknesses and improvements.                          | S    | Sprint completed                             | Documented in ProjectManagement.md                                         |
| A18-T2   | Management          | Risk Tracking                                  | Identify and track project risks.                                       | S    | Risks identified                             | Risk log maintained                                                        |
| A18-T3   | Management          | Metrics Analysis                               | Analyze metrics evolution across sprints.                               | M    | Metrics collected                            | Trends and insights documented                                             |
| A18-T4   | Management          | Post-Mortem Analysis                           | Reflect on project outcomes and lessons learned.                        | M    | Project completed                            | Final analysis documented                                                  |
| A19-T1   | Documentation       | Feedback Consolidation Report                  | Document all feedback and how it was addressed.                         | S    | Feedback available                           | Report created (Google Docs)                                               |
| A19-T2   | Documentation       | Final Documentation Package                    | Ensure all project documents are complete and consistent.               | M    | All artifacts available                      | Documents reviewed and updated                                             |
| A19-T3   | Documentation       | Update Projeto.md                              | Consolidate architecture, development and test evidence.                | M    | All deliverables ready                       | Projeto.md complete                                                        |
| A19-T4   | Documentation       | Update GuiaPadroesDesenvolvimento.md           | Ensure standards and patterns are fully documented.                     | S    | Standards defined                            | Document finalized                                                         |
| A19-T5   | Repository          | Organize GitHub Structure                      | Organize folders (src, docs, tests, etc.).                             | S    | Structure defined                            | Repository compliant with PMO                                              |
| A19-T6   | Repository          | Update README.md                               | Add instructions, features and contribution guide.                     | S    | Project ready                                | README complete                                                            |
| A19-T7   | Repository          | Apply Gitflow and Versioning                   | Use branches, commits and releases properly.                           | S    | Workflow defined                             | Gitflow followed and documented                                            |
| A19-T8   | Impact              | Define SDGs and Impact                         | Identify relevant SDGs and justify.                                    | S    | Project context defined                      | SDGs documented                                                            |
| A19-T9   | Impact              | Create Sustainability Section                  | Document People, Planet, Prosperity, Peace, Partnerships.             | M    | SDGs defined                                 | Section added to documentation                                             |
| A19-T10  | Presentation        | Prepare Final Presentation                     | Build final presentation narrative.                                   | M    | All artifacts completed                      | Slides ready                                                               |
| A19-T11  | Presentation        | Define Storytelling Structure                  | Organize problem, journey, solution and results.                      | S    | Content ready                                | Narrative structured                                                       |
| A19-T12  | Presentation        | Rehearse Final Presentation                    | Practice presentation delivery.                                       | XS   | Slides ready                                 | Team prepared                                                              |

## 2.5 Definition of Ready (DoR)
A task is considered ready when:

- Clear description exists
- Acceptance criteria are defined
- Dependencies are identified
- Required resources are available


## 2.6 Definition of Done (DoD)

A task is considered done when:

- Implementation is completed
- Code passes review
- Tests are executed successfully
- Documentation is updated
- Evidence is committed to the repository

# 3. Cost Analysis and Effort Estimation

This section presents an estimation of development effort and associated costs for the project, ensuring coherence between workload, technical complexity, and required resources.


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


## 3.4 Consistency Analysis

The estimation demonstrates consistency across effort, cost, and technical scope:

- **Effort vs Capacity:** Total estimated effort (112h) remains within sprint capacity (~130h), preserving a ~14% buffer for uncertainties  
- **Effort vs Complexity:** Higher effort allocation to backend and frontend reflects integration complexity and system core functionality  
- **Metrics Alignment:** Completion rate (~92%) supports the realism of planning and estimation  
- **Cost Proportionality:** Financial estimation scales directly with effort distribution, ensuring coherence  


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


### Total Cost Perspective

| Cost Type | Value |
|------|------|
| Development (one-time) | $2,800 |
| Infrastructure (monthly) | ~$16–24 |

## 3.6 Key Considerations

- The **primary cost driver** is human effort, representing over 95% of total project cost  
- Infrastructure costs are minimized through **free-tier services and lightweight cloud instances**  
- A **buffer (~14%)** is included in effort estimation to absorb risks and uncertainties  
- The model is **scalable**, as infrastructure costs can grow proportionally with system usage  