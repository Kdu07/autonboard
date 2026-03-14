# Evolutionary Project Management and Configuration Management

## Table of Contents
- [Sprint 1 Analysis](#sprint-1-analysis)
- [Sprint 2 Analysis](#sprint-2-analysis)
- [Sprint 2 Planning](#sprint-2-planning)

## Sprint 1 Analysis

### Strengths
#### ST01 – Effective Communication  

**Description:**  
The team maintained consistent and transparent communication throughout the sprint. Daily meetings ensured alignment, and no major misunderstandings occurred.

**Action to Maintain:**  
- All decisions will be documented in the shared workspace.  
- Each member must actively contribute at least once per daily meeting.


#### ST02 – Strong Daily Attendance  

**Description:**  
All team members consistently attended daily meetings during Sprint 1, ensuring alignment with sprint goals and early issue detection.

**Action to Maintain:**   
- Any absence must be justified and documented.  



#### ST03 – Shared Goal Alignment  

**Description:**  
All members demonstrated a shared understanding of the project objectives, which reduced rework and improved decision-making efficiency.

**Action to Maintain:**  
- Sprint goals will be reviewed at the beginning and end of each sprint.  
- A short retrospective will confirm alignment with objectives.


### Weaknesses
#### WK01 – Uneven Task Distribution  

**Description:**  
Task allocation during Sprint 1 resulted in workload imbalance among team members.

**Improvement Action:**   
- No team member should have more than a 30% workload difference compared to others.  
- Task distribution will be monitored through the project management tool(gitlab).

**Success Indicator:**  
- Balanced workload report at the end of Sprint 2.  


#### WK02 – Language Barrier in Communication  

**Description:**  
Some team members feel less confident communicating in English, which occasionally limited participation.

**Improvement Action:**  
- A minimum of 2 hours per week will be dedicated to English practice by affected members.  


**Success Indicator:**  
- Improved clarity in communication with the partner.



### Risk Analysis and Tracking
Throughout Sprint 1, several risks were identified:

| Risk ID | Risk Description | Probability | Impact | Mitigation Strategy | Contingency Plan |
|----------|-----------------|------------|--------|--------------------|------------------|
| R01 | Acceptance of invalid or inconsistent client data | Medium | High | Implement strict frontend and backend validation rules and automated data validation tests. | Roll back corrupted entries and execute data correction script; notify stakeholders if integrity is affected. |
| R02 | Performance issues with large file uploads | Medium | High | Implement file size limits, asynchronous queue processing, and performance testing before deployment. | Temporarily restrict upload size and allocate additional processing resources if delays occur. |
| R03 | Excessive dependence on manual client input | High | Medium | Standardize input templates and provide validation feedback before submission. | Perform manual data review and correction before database ingestion. |
| R04 | Scope expansion during MVP development | Medium | High | Clearly define MVP boundaries and validate scope during sprint planning. | Defer non-MVP features to backlog and re-prioritize tasks immediately. |
| R05 | Integration instability due to unrealistic mock simulations | Medium | High | Test integrations in staging environments that replicate production behavior. | Schedule emergency integration fixes and adjust mock configurations to match real scenarios. |
| R06 | Lack of traceability and poor async error feedback | Medium | High | Implement structured logging and job status tracking system. | Conduct manual log analysis and provide direct status updates to stakeholders. |
| R07 | Requirement misunderstanding and communication failures | Medium | High | Validate requirements in sprint planning and document confirmations in writing. | Schedule clarification meetings and update documentation to realign deliverables. |
| R08 | Task delays due to underestimation | High | Medium | Use story points and complexity estimation before task assignment. | Reallocate tasks and adjust sprint scope if delays are identified. |
| R09 | Misalignment between exported data and Equiem needs | Medium | High | Validate exported data format with stakeholder before final implementation. | Adjust data mapping and reprocess exported datasets if misalignment is detected. |

### Risk tracking mechanism
To ensure continuous monitoring, the team will implement a **Risk Register** containing:

- Risk
- Description  
- Probability  
- Impact  
- Mitigation Strategy  

The Risk Register will be reviewed weekly during Sprint Planning and Retrospective meetings.


### PMO Alignment

This sprint followed PMO guidelines by:

- Maintaining structured documentation of meetings and decisions.  
- Applying formal sprint planning and retrospective practices.  
- Identifying and tracking project risks systematically.  
- Establishing measurable improvement actions.  

Future sprints will continue aligning with PMO standards by ensuring transparency, accountability, and continuous improvement processes.



## Sprint 2 Analysis

### Context
Sprint 2 had a reduced duration and a constrained timeline, requiring the team to adapt quickly and prioritize essential deliverables.

### Strengths
#### S2-ST01 – Effective last-minute coordination and team availability  

**Description:**  
Effective last-minute coordination and high team availability for quick sync meetings enabled the team to stay aligned despite the compressed timeline.

**Action to Maintain:**  
- Maintain high availability for short sync meetings when sprint duration is reduced.  
- Keep coordination channels responsive for quick alignment.


#### S2-ST02 – Delivery of core features under time pressure  

**Description:**  
Two core features were successfully delivered despite time constraints, indicating good collaboration and commitment.

**Action to Maintain:**  
- Prioritise essential deliverables clearly when scope or duration is constrained.  
- Preserve focus on the critical path in short sprints.


#### S2-ST03 – Pair programming on the critical path  

**Description:**  
Pair programming on the critical path helped reduce blockers and maintain delivery flow.

**Action to Maintain:**  
- Continue pairing on critical tasks when timelines are tight.  
- Use pairing as a default for high-impact or blocking work.


### Weaknesses
#### S2-WK01 – Short sprint duration limiting code review  

**Description:**  
Sprint duration was too short, limiting proper code review; one PR was merged after a single quick review.

**Improvement Action:**  
- Introduce a buffer in short sprints and reduce committed scope (e.g. by ~20% when sprint duration is limited).  
- Ensure at least one thorough review before PR merge, even under time pressure.

**Success Indicator:**  
- No PR merged without adequate review in Sprint 3; scope adjusted in planning when duration is reduced.


#### S2-WK02 – Documentation and DoD completed in a rush at sprint end  

**Description:**  
Documentation and the DoD checklist were completed in a rushed manner at the end of the sprint instead of being integrated into the workflow.

**Improvement Action:**  
- Integrate documentation into the Definition of Done and require documentation update before PR merge.  
- Enforce DoD criteria, including documentation, as part of the normal workflow.

**Success Indicator:**  
- Documentation and DoD criteria met before or at PR merge in Sprint 3; no last-minute documentation rush.


#### S2-WK03 – One planned task moved to backlog due to time pressure  

**Description:**  
One planned task was moved back to the backlog due to time pressure and underestimation.

**Improvement Action:**  
- Re-evaluate scope estimation during Sprint 3 Planning.  
- Improve estimation accuracy (e.g. story points, complexity) and reduce committed scope when duration is limited.

**Success Indicator:**  
- Fewer tasks deferred to backlog; more accurate scope commitment in Sprint 3.


### Improvement opportunities
For future short sprints, scope must be adjusted proportionally to the available time. A buffer period should be reserved to handle unexpected delays. Documentation and quality checks should be embedded in the Definition of Done to prevent rushed finalization.

### Action plan for next sprint (S3)
- Reduce committed scope when sprint duration is limited.
- Reserve at least one buffer period for risk mitigation.
- Enforce Definition of Done criteria, including documentation before PR merge.
- Improve estimation accuracy during Sprint Planning.

### Risks identified and follow-up
The sprint highlighted risks related to scope pressure (R04) and effort underestimation (R05). These risks are formally recorded in the Risk Register and will be monitored in Sprint 3 to ensure mitigation through improved planning and scope control.

### PMO alignment (Sprint 2)
Sprint 2 followed PMO guidelines by conducting a structured retrospective, identifying strengths and weaknesses, defining improvement actions with success indicators, and recording risks (R04, R05) in the Risk Register. The action plan for Sprint 3 will be reviewed at the start of the next sprint to verify completion and continuous improvement.


## Sprint 2 Planning

Sprint 2 planning was defined to ensure a structured and incremental evolution of the project, incorporating the lessons learned from Sprint 1 and focusing on establishing solid technical and managerial foundations. Tasks were organized across architecture, data modeling, visual design, configuration management, and project governance, with effort estimated using T-shirt sizing and clear Definition of Ready (DoR) and Definition of Done (DoD) criteria to ensure readiness, clarity, and objective task completion:
[ Sprint 2 Planning – Google Spreadsheet ](https://docs.google.com/spreadsheets/d/1YJa78WhqfRqezfU65B6q8ZDVe1sow8x6RP_k3xxsm_w/edit?usp=sharing)
