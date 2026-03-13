# Project evolution Sprint 3
## Table of Contents
1. [Test Planning](#test-planning)  
2. [Unit Tests](#unit-tests)  

# Test Planning
# General Planning

The tests described in this document aim to ensure the **quality, reliability, performance, and usability** of the Equiem system. The planning includes positive and negative scenarios, evaluating both functional behavior and non-functional attributes, as well as the real experience of end users.

The tests were defined considering the business requirements, the constraints of the academic project, and the feasibility of execution in a controlled environment.

# Testing Tools and Technologies

The following tools were selected to support the testing process:

- **Postman**: manual and automated testing of REST APIs  
- **Jest**: automated testing of business logic  
- **Google Chrome**: manual functional tests and usability testing  
- **k6 / Apache JMeter**: load and concurrency simulation  
- **Google Sheets**: recording results and feedback from usability tests  
- **Markdown (.md)**: versioned and structured documentation of the test plan  

These tools were chosen due to their wide adoption in the industry, ease of use, and suitability for the academic context of the project.

# Functional Test Planning

## Functional Tests Overview

Functional tests aim to validate whether all functionalities of the Equiem system correctly meet the defined **Functional Requirements (FRs)**. The focus is on the complete onboarding workflow, from the initial upload to the final consolidation and external integration.

The planning includes both main flows and exception scenarios, ensuring that the system responds correctly to invalid inputs, operational errors, and unexpected interruptions.

## Functional Test Cases

### FR01 – Structured Onboarding Data Upload

**Objective:** Validate that authenticated users can upload CSV/XLSX files.

**Precondition:** User is authenticated in the system.

**Procedure**

1. Access the system with valid credentials  
2. Navigate to the onboarding screen  
3. Select the upload option  
4. Upload a CSV or XLSX file  
5. Confirm submission and wait for the system response  

**Positive Scenario**

- Upload of a valid file  

**Negative Scenario**

- Upload attempt without authentication or with an invalid format  

**Expected Result**

- Upload accepted or error handled correctly  

**Post-condition**

- File stored in the staging layer  

### FR02 – Data Standardization

**Objective:** Ensure that uploaded data is converted to the internal standardized model.

**Precondition:** File successfully uploaded.

**Procedure**

1. Trigger the standardization process  
2. Monitor logs and interface feedback  

**Positive Scenario**

- Data compatible with the schema  

**Negative Scenario**

- Missing or incompatible fields  

**Expected Result**

- Data standardized or error reported  

**Post-condition**

- Data ready for validation  

### FR03 – Intermediate Data Persistence

**Objective:** Verify the secure persistence of standardized data.

**Procedure**

- Save data in the intermediate storage layer  

**Expected Result**

- Data persisted without overwriting previous versions  

### FR04 – Data Validation and Conflict Detection

**Objective:** Identify errors, duplicates, and conflicts in the data.

**Procedure**

1. Execute the validation routine  
2. Analyze the generated report  

**Positive Scenario**

- Valid data approved  

**Negative Scenario**

- Invalid data generates alerts  

**Expected Result**

- Detailed error report generated  

### FR05 – Safe Data Correction via Re-Submission

**Objective:** Validate safe replacement of corrected data.

**Procedure**

1. Fix errors in the original file  
2. Resubmit a new version  
3. Confirm safe replacement  

**Expected Result**

- Previous data replaced correctly  

### FR06 – Change Comparison Visualization

**Objective:** Verify comparison between submitted versions.

**Expected Result**

- Differences highlighted correctly  

### FR07 – Automatic Progress Persistence

**Objective:** Ensure automatic progress saving.

**Procedure**

1. Close the system  
2. Reopen it later  

**Expected Result**

- Progress restored  

### FR08 – Dynamic Onboarding Interface

**Objective:** Validate dynamic display of sections according to active modules.

**Expected Result**

- Only relevant sections displayed  

### FR09 – Section Dependency Enforcement

**Objective:** Ensure dependent sections are properly blocked.

**Expected Result**

- Access blocked when prerequisites are not completed  

### FR10 – Collaborative Section Assignment

**Objective:** Validate assignment of sections to multiple collaborators.

**Expected Result**

- Parallel work enabled  

### FR11 – Onboarding Status and Feedback

**Objective:** Verify onboarding status tracking.

**Expected Result**

- Status correctly updated  

### FR12 – Data Consolidation and Secure Integration

**Objective:** Validate final data consolidation and external system integration.

**Procedure**

1. Complete all mandatory sections  
2. Generate consolidated data package  
3. Send it to the external system  
4. Confirm successful integration  

# Functional Test Coverage

The following analysis demonstrates **how the planned functional tests cover the system requirements**:

| FR | Coverage | How Coverage Ensures Requirement is Met |
|----|----------|----------------------------------------|
| FR01 | ✅ Full | Tests both positive (valid upload) and negative (invalid file or no authentication), ensuring only authorized users can upload files. |
| FR02 | ✅ Full | Validates standardization process, handling compatible and incompatible data to maintain schema integrity. |
| FR03 | ✅ Full | Confirms persistence layer saves standardized data securely without overwriting existing records. |
| FR04 | ✅ Full | Verifies detection of errors, duplicates, and conflicts; ensures only valid data progresses. |
| FR05 | ✅ Full | Tests safe replacement of corrected data, preventing loss of previous versions. |
| FR06 | ✅ Full | Validates visual comparison, highlighting differences to support user review. |
| FR07 | ✅ Full | Ensures automatic progress saving works, maintaining session continuity. |
| FR08 | ✅ Full | Checks dynamic interface adapts to active modules, preventing irrelevant section display. |
| FR09 | ✅ Full | Confirms section dependencies are enforced, guaranteeing process correctness. |
| FR10 | ✅ Full | Validates multi-user collaboration on sections, supporting parallel work. |
| FR11 | ✅ Full | Ensures onboarding status is updated correctly, providing accurate feedback to users. |
| FR12 | ✅ Full | Confirms final data consolidation and integration with external systems succeed, guaranteeing end-to-end process reliability. |

> **Discussion:** All FRs are covered with clear positive and negative scenarios. The coverage ensures that every critical system function is tested, confirming both correctness and robustness. Each test scenario directly maps to its corresponding FR and reflects real-world usage, providing confidence that the system meets business and project requirements.

# Non-Functional Test Planning

## Non-Functional Tests Overview

Non-functional requirement (NFR) tests evaluate essential quality attributes for the success of the **Equiem** system, ensuring that the onboarding process operates with robustness, stability, adequate performance, and architectural evolution capability.

Unlike functional tests, NFR tests validate **how the system behaves** under conditions such as high load, failures, and future scalability scenarios.

The objective of these tests is to ensure that the system maintains **data integrity, performance, reliability, and extensibility**, even in adverse or high-demand situations.

The tests defined below ensure compliance with **NFR01 to NFR05**.

## NFR Test Cases

### CT-NF01 – Data Integrity and Compliance

**Non-Functional Requirement:** NFR01 – Data Integrity Compliance  

#### Objective

Ensure that only data fully compliant with the internal schema can be validated, consolidated, and exported by the system.

#### Test Scenarios

**Positive Scenario**
- Upload a dataset that fully follows the required schema and contains valid values.

**Negative Scenario**
- Upload a dataset containing missing mandatory fields, invalid data types, or inconsistent values.

#### Execution Steps

1. Access the onboarding interface.
2. Upload a dataset that follows the correct schema.
3. Run the validation process.
4. Verify that the system accepts the dataset and allows export.

Negative test:

5. Upload a dataset with missing or incorrect fields.
6. Run the validation process.
7. Verify that the system blocks the export and reports validation errors.

#### Expected Result

- Valid datasets are accepted and exported successfully.
- Invalid records are blocked.
- Export is prevented when inconsistencies exist.
- A detailed error report is generated for incorrect records.

### CT-NF02 – Large File Handling and Responsiveness

**Non-Functional Requirement:** NFR02 – Large File Handling and Responsiveness  

#### Objective

Validate that the system supports uploads of files up to **100MB** while maintaining interface responsiveness and system stability.

#### Test Scenarios

**Positive Scenario**

- Upload a file close to the maximum allowed size (e.g., 95–100MB).

**Negative Scenario**

- Attempt to upload a file larger than the maximum limit.

#### Execution Steps

1. Prepare a test dataset with approximately 100MB.
2. Upload the dataset using the onboarding interface.
3. Monitor system responsiveness during upload and processing.
4. Verify that processing completes successfully.

Negative test:

5. Attempt to upload a dataset larger than the allowed limit.
6. Verify that the system rejects the file and displays an appropriate message.

#### Expected Result

- Files within the allowed limit are processed successfully.
- The interface remains responsive during upload and processing.
- The application does not crash or freeze.
- Files exceeding the limit are rejected with a clear error message.

### CT-NF03 – Processing Reliability

**Non-Functional Requirement:** NFR03 – Processing Reliability  

#### Objective

Ensure that failures during data processing do not cause data corruption or partial persistence.

#### Test Scenarios

**Positive Scenario**

- Execute the normal validation and processing flow without interruptions.

**Negative Scenario**

- Simulate an interruption during processing (e.g., network failure or server restart).

#### Execution Steps

1. Upload a valid dataset.
2. Start the processing pipeline.
3. Confirm that the data is processed successfully.

Negative test:

4. Start processing a dataset.
5. Simulate a system interruption (e.g., stop the service or disconnect the network).
6. Restart the system.
7. Verify that no partial or corrupted data was stored.

#### Expected Result

- Successful processing results in consistent stored data.
- Interrupted processes do not corrupt stored data.
- The system maintains data consistency after recovery.

### CT-NF04 – File Format Extensibility

**Non-Functional Requirement:** NFR04 – Extensible File Format Support  

#### Objective

Validate that new file formats can be added without requiring changes to the core system logic.

#### Test Scenarios

**Positive Scenario**

- Add support for a new format using the system's extensible structure.

**Negative Scenario**

- Attempt to process an unsupported format.

#### Execution Steps

1. Implement support for an additional test format (e.g., JSON or XML).
2. Upload a file using the new format.
3. Execute the validation process.

Negative test:

4. Upload a file with an unsupported format.
5. Attempt to process it.

#### Expected Result

- Newly supported formats are processed successfully without modifying the core logic.
- Unsupported formats are rejected with an informative error message.

### CT-NF05 – Concurrent Submission Support

**Non-Functional Requirement:** NFR05 – Concurrent Submission Handling  

#### Objective

Ensure the system safely handles multiple simultaneous data submissions.

#### Test Scenarios

**Positive Scenario**

- Multiple users upload datasets simultaneously.

**Negative Scenario**

- Simultaneous submissions under high load conditions.

#### Execution Steps

1. Simulate multiple users (e.g., 5–10) uploading datasets at the same time.
2. Monitor system behavior during concurrent processing.
3. Verify that each dataset is processed independently.

Negative test:

4. Increase the number of concurrent submissions to stress the system.
5. Observe potential failures or delays.

#### Expected Result

- The system processes submissions without data conflicts.
- Each upload is handled independently.
- No data loss or corruption occurs under concurrent load.

## NFR Test Coverage

The defined tests ensure coverage of the most critical non-functional aspects of the system:

**Data Integrity**

CT-NF01 guarantees that only valid and consistent data can be processed and exported.

**Performance and Responsiveness**

CT-NF02 verifies that the system maintains stability and responsiveness even when handling large files.

**Reliability**

CT-NF03 ensures that the system maintains data consistency even in the presence of failures or interruptions.

**Extensibility**

CT-NF04 validates that the system architecture supports future file formats without requiring structural modifications.

**Scalability and Concurrency**

CT-NF05 ensures that the system can support multiple users and concurrent submissions safely.

> **Discussion:** All NFRs cover critical non-functional aspects, ensuring that the system is robust, stable, extensible, and reliable in real-world onboarding scenarios.

# Unit tests

This document presents the strategy, execution, and results of the unit tests conducted in the project according to the Sprint 3 requirements. The focus of this stage was to ensure the integrity of backend functionalities (Node.js + TypeScript) and preparation for the frontend (Angular + TypeScript), aligning the tests with the defined Functional Requirements (FR) and Non-Functional Requirements (NFR).

## 1. Unit Testing Strategy
The adopted unit testing strategy aims to ensure the reliability, correctness, and maintainability of the code by validating the behavior of each component in isolation.

### Guiding Principles
- Total Isolation: Extensive use of mocks for all external dependencies such as databases, APIs, and third-party services (Auth0).
- Critical Path Coverage: Initial focus on the business rules related to file upload and processing.
- Determinism: Ensuring that tests produce the same results in any development environment.
- Automation: Full integration with the development cycle using Jest.

## 2. Test Scope
Tests were implemented covering the main layers of the system architecture.

### Backend (Node.js + TypeScript)
- Services (UploadService): Validation of business rules, file size limits, and allowed extensions.
- Controllers (UploadController): Handling HTTP requests and response codes (200, 400, 500).
- Middleware (UploadMiddleware): Spreadsheet processing logic (ExcelJS) and validation of required fields.
- Models (UploadModel): Data persistence integrity and database queries (mocked).

### Frontend (Angular + TypeScript)
- Services and Components: Base test structure prepared using Jasmine and Karma, focusing on dependency injection and component creation.

## 3. Tools and Technologies
| Layer | Tool | Description |
|---|---|---|
| Backend | Jest | Main framework for tests and assertions |
| Backend | ts-jest | Allows tests to run directly in TypeScript |
| Backend | ExcelJS Mocks | Simulation of Excel file processing |
| Frontend | Jasmine | Behavior-driven framework for Angular tests |
| Frontend | Karma | Test runner for browsers |

## 4. Test Directory Structure
The organization follows a modular pattern to facilitate test script location and maintenance.

```text
tests/
├── backend/
│   ├── UploadController.test.ts
│   ├── UploadMiddleware.test.ts
│   ├── UploadModel.test.ts
│   └── UploadService.test.ts
└── frontend/
  └── app.component.spec.ts
``` 

## 5. Implemented Test Cases and Results

The table below details the validated scenarios, relating **Test Case IDs (CT)** with their respective **Functional Requirements (FR)** and **Non-Functional Requirements (NFR)**.

| ID    | Module           | Tested Scenario                                   | Related Requirement        | Result |
|------|------------------|---------------------------------------------------|----------------------------|--------|
| CT-01 | UploadService     | Accept valid CSV file                             | FR01 (Data Upload)         | PASS   |
| CT-02 | UploadService     | Accept valid XLSX file                            | FR01 (Data Upload)         | PASS   |
| CT-03 | UploadService     | Reject invalid format (.pdf)                      | NFR04 (Extensible Formats) | PASS   |
| CT-04 | UploadService     | Reject zero-size file                             | NFR03 (Reliability)        | PASS   |
| CT-05 | UploadService     | Reject when no file is sent                       | FR04 (Data Validation)     | PASS   |
| CT-16 | UploadController  | Return data in getAll method                      | FR11 (Status and Feedback) | PASS   |
| CT-17 | UploadController  | Create upload through controller                  | FR01 (Data Upload)         | PASS   |
| CT-20 | UploadController  | Handle database error                             | NFR03 (Reliability)        | PASS   |
| CT-21 | UploadModel       | Data persistence in database query                | FR03 (Data Persistence)    | PASS   |
| CT-22 | UploadModel       | Retrieve list of uploads                          | FR11 (Status and Feedback) | PASS   |
| CT-23 | UploadMiddleware  | Error when file is missing                        | FR04 (Data Validation)     | PASS   |
| CT-24 | UploadMiddleware  | Error in required fields (customer_id)            | FR04 (Data Validation)     | PASS   |
| CT-25 | UploadMiddleware  | Failure during Excel spreadsheet parsing          | NFR03 (Reliability)        | PASS   |
| CT-26 | UploadMiddleware  | Processing and next() call                        | FR02 (Standardization)     | PASS   |


## 6. Test Coverage (Code Coverage)

Below are the consolidated code coverage results obtained using `jest --coverage`.

### Backend Summary

| Metric     | Percentage |
|------------|-----------|
| Statements | 86.66%    |
| Branches   | 81.25%    |
| Functions  | 72.72%    |
| Lines      | 86.66%    |


### File-Level Coverage Details

| File                   | Lines Coverage | Uncovered Lines        |
|------------------------|---------------|------------------------|
| UploadController.ts     | 91.66%        | 19                     |
| UploadMiddleware.ts     | 75.67%        | 13-18, 29-37, 47      |
| UploadModel.ts          | 100%          | -                      |
| UploadService.ts        | 100%          | -                      |
| db.ts                   | 100%          | -                      |

## 7. Execution Evidence
The tests were successfully executed in the terminal. Below is the summary of the latest execution.

Command: npm run test:coverage

Test Suites: 4 passed, 4 total

Tests: 14 passed, 14 total

Snapshots: 0 total

Time: 5.631 s

Note: The execution was validated in the local environments of all group members, ensuring

development environment parity and compliance with NFR02 (Responsiveness).

## 8. CI/CD Integration
Tests can be automatically executed in CI pipelines using the command:
npm run test:coverage
This ensures that new code changes do not break existing functionalities.

## 9. Conclusion
The Sprint 3 unit tests cover the critical functionalities of file upload and data persistence, ensuring compliance with the requirements of Data Integrity (NFR01) and Standardization (FR02). The backend coverage of 86.66% of lines ensures that the core business logic is protected against regressions, facilitating future expansion to support additional file formats (NFR04).
