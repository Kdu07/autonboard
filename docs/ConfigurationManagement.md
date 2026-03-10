# Configuration Management

This document describes the configuration management practices adopted by the team to control versions, manage branches, and maintain repository integrity.

All configuration management documentation is stored in the `/docs` folder.

#### Branch Creation Policy

**Naming Conventions**  
- `feature/short-description`
- `hotfix/short-description`

**When to Create Each Branch Type**  
- `feature/*`: Created for new features or improvements, based on `develop`.
- `hotfix/*`: Created only when critical fixes are required.

**Rules for Merging and Deleting Branches**  
- All merges must occur through Pull Requests.
- Branches must be deleted after successful merging to keep the repository clean.


#### Configuration Management Documentation

The following documents are maintained to ensure proper configuration management:
- **ProjectManagement.md**: Describes project planning, workflows, and team policies.
- **ConfigurationManagement.md**: Describes version control, branching strategy, and configuration practices.

Both documents are stored and maintained in the `/documents` folder of the GitLab repository.


#### Practical Examples

**Branch Creation**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication
