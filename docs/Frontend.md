# Frontend Feature Development
This document explains the development of the frontend functionalities, how they are implemented in the application, and the current progress of these features according to the project planning.

The frontend is responsible for providing the user interface, handling user interactions, and communicating with the backend API.

The application was developed using Angular with Type
Script.


# Implemented Functionalities
The main functionality developed in this sprint is the file upload interface, which allows users to submit files that will be processed and stored by the backend.

The Upload page includes the following elements:

- Drag and drop file area
- File selection interface
- Upload button
- Information about allowed file formats
- Information about file size limitations
- Panel for upload history

The interface was designed to provide a simple and clear user experience, allowing users to easily understand how to submit files to the system.

Supported formats:

- .xlsx
- .csv


# Frontend Interaction With Backend
The frontend communicates with the backend using HTTP requests.

When a user uploads a file, the following process occurs:

```
Client selects file
      │
      ▼
Upload component receives file
      │
      ▼
Frontend service prepares request
      │
      ▼
HTTP request sent to backend API
      │
      ▼
Backend processes upload
      │
      ▼
Response returned to frontend
```

The request is sent to the following endpoint:

```
POST /upload
```

This endpoint is responsible for creating a new submission record in the backend system.


# Functional Progress
The development of the frontend features follows the project planning for Sprint 3, focusing on implementing the main interface required for file submission.

Current progress of the functionalities:

| Functionality | Status |
|------|------|
| Upload page layout | Implemented |
| Drag and drop upload area | Implemented |
| File selection | Implemented |
| Upload button | Implemented |
| File format validation | Implemented |
| Backend integration | Implemented |
| Upload history display | In development |

The system is currently capable of sending uploaded files to the backend API.


# Deviations From Original Plan
During the development process, some adjustments were made compared to the initial planning.

The Upload History section was originally planned to display previously uploaded files retrieved from the backend database. However, due to time constraints and prioritization of the main upload functionality, this section is currently implemented only as a visual component and will be connected to backend data in a future sprint.

Additionally, improvements related to error handling and user feedback messages are planned for future iterations.

These adjustments allowed the team to prioritize the core functionality of file submission and ensure successful integration with the backend system within the sprint timeline.


# Alignment With Project Architecture
The frontend functionalities were implemented following the architecture and coding standards defined earlier in the project documentation.

The implementation respects the following principles:

- Component-based structure, separating the interface into independent components.
- Service layer for backend communication, avoiding direct API calls inside components.
- Use of TypeScript interfaces for data structures.
- Clear separation between UI logic and service logic.

# Testing Strategy
This section documents the strategy for unit testing in the frontend, including the rationale for test decisions and implementation guidelines.

## Overview
Unit tests are essential for ensuring the reliability and maintainability of the frontend code. The testing strategy focuses on testing individual units of code (components, services, utilities) in isolation to verify their behavior under various conditions.

## Testing Framework
The frontend uses Angular's built-in testing framework, which includes:
- Jasmine as the testing framework
- Karma as the test runner
- Angular Testing Utilities (TestBed, ComponentFixture, etc.)

Jest is configured at the project root for backend testing, but frontend tests use the Angular testing setup for better integration with Angular's dependency injection and component lifecycle.

## Test Coverage Goals
- **Components**: Test component creation, user interactions, data binding, and DOM updates.
- **Services**: Test service methods, HTTP calls, and data transformations.
- **Utilities**: Test helper functions and business logic.
- **Minimum Coverage**: Aim for 80% code coverage across statements, branches, functions, and lines.

## Decision Criteria for Unit Tests
The following criteria guide which tests to write and prioritize:

1. **Critical User Paths**: Test the most common user interactions and workflows (e.g., file upload process).
2. **Error Handling**: Test how components and services handle invalid inputs, network failures, and edge cases.
3. **Data Binding**: Verify that component properties correctly bind to the template and update the DOM.
4. **Service Integration**: Test that services correctly call APIs and handle responses/errors.
5. **Component Lifecycle**: Test ngOnInit, ngOnDestroy, and other lifecycle hooks if they contain logic.
6. **Accessibility**: Include tests for ARIA attributes and keyboard navigation where applicable.
7. **Performance**: Test components that handle large datasets or frequent updates.

## Test Structure
Each test file follows this structure:
- **Setup**: Configure TestBed with necessary modules, declarations, and providers.
- **Test Cases**: Individual `it()` blocks testing specific behaviors.
- **Teardown**: Automatic cleanup handled by Angular's testing utilities.

## Example Test Implementation
For the UploadComponent, tests include:
- Component instantiation
- File selection display
- Default state when no file is selected
- Future tests will cover upload submission, error states, and validation.

## Running Tests
To run frontend unit tests:
```bash
ng test
```

For continuous testing during development:
```bash
ng test --watch
```

## Integration with CI/CD
Tests are integrated into the project's CI/CD pipeline to ensure code quality before deployment. Failed tests will block merges to main branches.

## Future Enhancements
- Add end-to-end tests using Cypress or Playwright for full user workflows.
- Implement visual regression testing for UI components.
- Expand coverage to include more edge cases and accessibility tests.

This structure ensures that the frontend remains organized, maintainable, and scalable as new features are added to the system.


# Running the Frontend
To run the frontend application locally, it is necessary to install the project dependencies and start the development server.

First, install the dependencies:

```bash
npm install
```

Then start the Angular development server:

```bash
ng serve
```

After running the command, the application will be available at:

```
http://localhost:4200
```

The frontend will automatically reload whenever changes are made to the source code.

For full system functionality, the backend server must also be running so that the frontend can communicate with the API endpoints responsible for handling file uploads.