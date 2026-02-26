## Group Development Process Management

#### Daily Meetings Policy

**Frequency**  
Daily, on every class day.

**Duration**  
Maximum of 15 minutes.

**Participants**  
All group members involved in the project.

**Meeting Structure**  
Stand-up meeting following this agenda:
- What was done since the last meeting
- What will be done next
- Identification of blockers or risks

**Objective**  
Ensure team alignment, monitor progress, and identify impediments as early as possible.


#### GitLab Usage Policy

**Repository Organization**  
- Single centralized repository for the project.
- Main branches follow the GitFlow strategy.
- Documentation is stored in the `/documents` directory.

**Issue Usage**  
- All development activities must be registered as GitLab Issues.
- Each issue must represent a single task, feature, or bug.

**Pull Request Rules**  
- Pull Requests (PRs) are mandatory for merging any code into the `develop` branch.
- Direct commits to `develop` or `main` are not allowed.
- Each PR must contain: a clear and concise description of the changes performed

**Review Process**  
- At least one team member must review and approve the PR before merging.
- Reviewers must verify code quality, adherence to standards, and correctness.


#### Commit Policy

**Commit Message Pattern**  
- Commit messages must follow the Conventional Commits pattern, such as:
  - `feat: add user authentication`
  - `fix: correct data validation error`
  - `docs: update project documentation`

**Commit Frequency**  
- Commits should be small, frequent, and focused on a single logical change.

**Responsibility Guidelines**  
- Each team member is responsible for the quality and clarity of their commits.
- Commits must be associated with the corresponding task or issue whenever possible.


#### Team Workflow

The team follows an end-to-end workflow defined as follows:
1. Tasks are defined and prioritized during Sprint Planning.
2. A team member assigns themselves to a task.
3. A feature branch is created from the `develop` branch.
4. Development is carried out following the defined commit policies.
5. A Pull Request is opened for review.
6. After approval, the branch is merged into `develop`.
7. The task is marked as completed.

**Additional Working Policies**
- Communication is centralized in the team’s official channel (Slack).
- Blockers must be reported as soon as they are identified.
- Clear and transparent communication is essential for project progress.


#### Sprint Planning and Retrospective

**Sprint Planning**
- Tasks are defined and prioritized at the beginning of each sprint.
- Effort is estimated (e.g. T-shirt sizing or story points).
- Definition of Ready (DoR) and Definition of Done (DoD) are applied to ensure clarity and completion criteria.
- Sprint goals are reviewed at the beginning and end of each sprint.

**Sprint Retrospective**

A retrospective is held at the end of each sprint. The following structure ensures organization and clarity:

| Element | Description |
|---------|-------------|
| **Strengths** | What worked well in the sprint (processes, tools, collaboration). |
| **Weaknesses** | What did not work or can be improved. |
| **Improvement** | Identified improvement opportunities. |
| **Actions** | Concrete actions agreed for the next sprint (who, what, by when). |
| **Risk** | Risks identified during the sprint; integrated into the Risk Register when relevant. |

**Tracking Table (Retrospective)**

Each retrospective must be recorded in a tracking table:

| Sprint | Date | Strengths | Weaknesses | Improvement | Actions | Risks identified |
|--------|------|-----------|------------|-------------|---------|------------------|
| *e.g. S1* | *e.g. 2025-02-XX* | *summary* | *summary* | *summary* | *list* | *yes/no + Risk Register ref.* |

- The table is kept up to date (e.g. in an evolving document or referenced spreadsheet).
- Actions are reviewed at the start of the next sprint to verify completion.
- Risks are transferred to the **Risk Register** when applicable.


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

All project and configuration management documentation is stored in the repository (e.g. `/docs` or `/documents`).