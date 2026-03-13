# Configuration Management

This document describes the configuration management practices adopted by the team to control versions, manage branches, and maintain repository integrity.

All configuration management documentation is stored in the `/docs` folder.


# 1. GitFlow Strategy

The project follows the **GitFlow branching model**, which separates stable production code from ongoing development.

## Main Branches

### main
- Contains stable and production-ready code.
- Only updated through release or hotfix merges.

### develop
- Integration branch for development.
- All feature branches are merged here.


## Supporting Branches

### feature/*
Used for development of new features.

Example:


feature/user-authentication
feature/api-endpoints


### release/*
Used to prepare a new production release.

Example:


release/v1.0.0


### hotfix/*
Used to correct critical issues in production.

Example:
hotfix/login-error


# 2. Branch Creation Policy

## Naming Conventions

| Branch Type | Format |
|------|------|
| Feature | feature/short-description |
| Release | release/version-number |
| Hotfix | hotfix/short-description |
| Fix | fix/short-description |
| Docs | docs/short-description |
| Chore | chore/short-description |


## Branch Creation Example


git checkout develop
git pull origin develop
git checkout -b feature/user-authentication



# 3. GitFlow Workflow

## Feature Development Flow

1. Create branch from develop
2. Implement feature
3. Commit changes following commit policy
4. Open Pull Request to develop
5. Code review performed
6. Merge into develop
7. Delete feature branch


## Release Flow

1. Create release branch from develop


git checkout develop
git checkout -b release/v1.0.0


2. Perform final adjustments
3. Update version number
4. Merge release branch into main
5. Tag version
6. Merge back into develop
7. Delete release branch


## Hotfix Flow

1. Create hotfix branch from main


git checkout main
git checkout -b hotfix/login-error


2. Implement fix
3. Open PR to main
4. Merge into main
5. Tag version
6. Merge into develop
7. Delete hotfix branch


# 4. Versioning Strategy

The project follows **Semantic Versioning**.

Format:
MAJOR.MINOR.PATCH

Example:
v1.0.0
v1.1.0
v1.1.1


Meaning:

| Version Part | Meaning |
|------|------|
| MAJOR | Breaking changes |
| MINOR | New features |
| PATCH | Bug fixes |


# 5. Pull Request Policy

All merges must occur through Pull Requests.

Each PR must contain:

- Clear description
- Linked Issue
- Evidence of tests when applicable
- Documentation updates when required


# 6. Branch Merge Rules

| Target Branch | Merge Source |
|------|------|
| develop | feature branches |
| main | release or hotfix branches |

Direct commits to `main` and `develop` are not allowed.


# 7. Branch Deletion Policy

Branches must be deleted after successful merging.

Example:


git branch -d feature/user-authentication
git push origin --delete feature/user-authentication


This keeps the repository clean and organized.


# 8. Repository Structure


docs/
ProjectManagement.md
ConfigurationManagement.md

src/
backend/
frontend/
database/


Documentation required by the module must always remain in `/docs`.


# 9. Configuration Governance

Configuration practices ensure:

- Traceability of changes
- Controlled integration of code
- Reproducibility of releases
- Repository stability

These practices support collaborative development and project quality.