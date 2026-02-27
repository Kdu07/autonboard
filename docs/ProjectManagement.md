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
