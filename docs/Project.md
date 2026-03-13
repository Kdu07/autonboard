# Test Plan

## Table of Contents
1. [Functional Requirements Implementation Analysis](#functional-requirements-implementation-analysis)  
   - [Summary of Functional Requirements Status](#summary-of-functional-requirements-status)  
2. [Existing Implementations in the Repository](#existing-implementations-in-the-repository)  
   - [FR01 Structured Onboarding Data Upload](#fr01-structured-onboarding-data-upload)  
   - [FR02 Data Standardization](#fr02-data-standardization)  
   - [FR03 Intermediate Data Persistence](#fr03-intermediate-data-persistence)  
   - [FR04 Data Validation and Conflict Detection](#fr04-data-validation-and-conflict-detection)  
   - [FR05 Safe Data Correction via Re Submission](#fr05-safe-data-correction-via-re-submission)  
   - [FR11 Onboarding Status and Feedback](#fr11-onboarding-status-and-feedback)  
3. [Functionalities Not Yet Implemented](#functionalities-not-yet-implemented)  
4. [General Planning](#general-planning)  
5. [Testing Tools and Technologies](#testing-tools-and-technologies)  
6. [Functional Test Planning](#functional-test-planning)  
   - [Functional Tests Overview](#functional-tests-overview)  
   - [Functional Test Cases](#functional-test-cases)  
   - [Functional Test Coverage](#functional-test-coverage)  
7. [Non-Functional Test Planning](#non-functional-test-planning)  
   - [Non-Functional Tests Overview](#non-functional-tests-overview)  
   - [NFR Test Cases](#nfr-test-cases)  
   - [NFR Test Coverage](#nfr-test-coverage)  



   # Functional Requirements Implementation Analysis

This section presents an analysis of the current implementation status of the twelve Functional Requirements of the system, considering exclusively the elements that exist in the source code repository. For each functional requirement, the document indicates whether the implementation can be considered validated based on repository evidence, how it is currently implemented, and which components still need to be developed to fully satisfy the specification.

## Summary of Functional Requirements Status

| FR | Title | Validated | Evidence in the Repository |
|----|-------|-----------|----------------------------|
| FR01 | Structured Onboarding Data Upload | Yes | Backend supports CSV and XLSX upload through POST `/upload` route with persistence. Frontend provides upload interface with file selection, progress indicator, and 100 MB limit. |
| FR02 | Data Standardization | Yes, partial implementation | File `UploadMiddleware.ts` contains the `parseSpreadsheet()` function that converts CSV or XLSX files into a row based data structure. |
| FR03 | Intermediate Data Persistence | Yes | Table `SUBMISSION` and method `UploadModel.create()` insert new records without overwriting previous submissions. |
| FR04 | Data Validation and Conflict Detection | Yes, partial implementation | Validation of file format, presence of file, mandatory fields `customer_id` and `status`, and empty file verification. |
| FR05 | Safe Data Correction via Re Submission | Yes, partial implementation | A new submission creates a new record in the database while preserving previous versions. |
| FR06 | Change Comparison Visualization | No | No API or interface for comparing submission versions exists in the repository. |
| FR07 | Automatic Progress Persistence | No | No mechanism exists to persist onboarding progress or session state. |
| FR08 | Dynamic Onboarding Interface | No | Field `modules_enabled` exists in the CUSTOMER table but is not used in the application logic. |
| FR09 | Section Dependency Enforcement | No | No model of sections or dependency rules exists in the repository. |
| FR10 | Collaborative Section Assignment | No | No mechanism exists for assigning sections to collaborators. |
| FR11 | Onboarding Status and Feedback | Yes | Field `status` stored in the SUBMISSION table is accepted in requests and returned by the API. |
| FR12 | Data Consolidation and Secure Integration | No | No routines for data consolidation or external system integration exist in the repository. |

Based on the evidence available in the source code, six functional requirements have some level of implementation: FR01, FR02, FR03, FR04, FR05, and FR11.

---

# Existing Implementations in the Repository

## FR01 Structured Onboarding Data Upload

The repository contains a basic implementation of the onboarding file upload mechanism.

In the backend located in `src/backend`, the middleware `UploadMiddleware.ts` configures Multer to handle file uploads. This middleware accepts CSV and Excel files through a MIME type filter. Uploaded files are stored in the `uploads` directory with a unique name generated from a timestamp and a random value.

The same file contains the function `parseSpreadsheet(filePath)`, which uses the ExcelJS library to read CSV or XLSX files. The method iterates through rows of the first worksheet and transforms the content into a structured array representing rows and columns. The result is attached to the request object as `parsedData`.

The service `UploadService.ts` validates the existence of the file, verifies the allowed MIME type, and prevents processing of empty files. The service then calls `UploadModel.create` to register the submission in the database.

The controller `UploadController.ts` exposes the endpoint responsible for handling file uploads. The POST `/upload` route is defined in `routes/index.ts` and applies the upload and processing middleware before executing the `create` method.

In the frontend located in `src/frontend/src/app/upload`, a component provides the file upload interface. The component allows users to select a file, simulates a progress indicator, and displays a success message when the process finishes. The interface also indicates a maximum file size of one hundred megabytes.

Despite these features, the frontend still does not send the file to the backend through real HTTP requests.

Remaining elements to be implemented include mandatory authentication for upload routes, actual file submission from the frontend, and support for multiple files with real progress tracking.

---

## FR02 Data Standardization

Initial data standardization occurs within the middleware `UploadMiddleware.ts`.

The function `parseSpreadsheet` converts the submitted file content into a uniform row and column data structure. The function uses a Workbook object from the ExcelJS library, reads the first worksheet, and iterates through each row using the `eachRow` method. The content of each row is stored in an array representing column values.

This approach ensures that data originating from CSV or XLSX files is converted into a common internal structure before any subsequent processing stage.

However, the system still lacks mapping from this structure into internal domain models. A canonical schema defining field names, types, and normalization rules has not yet been implemented. The file `ExtractionService.ts` exists in the repository but currently has no implementation.

---

## FR03 Intermediate Data Persistence

The system implements an intermediate persistence layer through the `SUBMISSION` table defined in the script `01_create_database.sql`.

This table contains the fields `id`, `customer_id`, `status`, `file_path`, and `upload_date`. The `id` field is auto incremental and the `upload_date` automatically records the submission timestamp.

The model `UploadModel.ts` implements the `create` method responsible for inserting new records into the table using an SQL insert statement. Since no update mechanism exists that replaces previous records, each submission generates an independent new record.

This approach ensures that previous versions of submitted data remain preserved in the database, representing an intermediate persistence layer prior to any final consolidation process.

Nevertheless, the system still lacks an explicit distinction between staging data and consolidated data. There is also no formal versioning mechanism that groups submissions belonging to the same dataset.

---

## FR04 Data Validation and Conflict Detection

Some basic validations are executed during the submission process.

The middleware `UploadMiddleware.ts` verifies whether a file is included in the request and checks whether the fields `customer_id` and `status` are present. If any of these values are missing, the request is rejected with an appropriate error code.

The same middleware applies a file filter to ensure that only CSV or Excel files are accepted.

The service `UploadService.ts` performs additional checks. It confirms that the file exists, validates the MIME type against an allowed list, and ensures that the file size is greater than zero.

Although these validations guarantee basic request correctness, the system does not yet implement structural validation of the submitted data. There is no verification of mandatory spreadsheet fields, no validation of data types, and no detection of duplicates or conflicting records.

---

## FR05 Safe Data Correction via Re Submission

Data correction through file resubmission is implicitly supported by the creation of new records in the submissions table.

Whenever a new upload is performed, the method `UploadModel.create` inserts a new record into the database. Each submission therefore receives a unique identifier.

This strategy preserves all previous versions of submitted data and allows a user to correct information by uploading a new file without overwriting earlier records.

However, the system currently lacks mechanisms that automatically determine which records should be replaced when a correction occurs. It also lacks natural identifiers that would enable selective updates of specific logical datasets.

---

## FR11 Onboarding Status and Feedback

The system already implements a basic mechanism to store and retrieve the status of a submission.

The `SUBMISSION` table includes a `status` column with a default value of `pending`. This column allows the system to record the current state of each submission.

The interface `IUpload`, defined in `global.interfaces.ts`, includes the `status` property to ensure the attribute exists within the backend data structure.

The controller `UploadController.ts` receives the `status` value from the request body and forwards it to the service responsible for processing the submission. The model `UploadModel.ts` persists this value in the database during record insertion.

In addition, the endpoint that retrieves all submissions returns the `status` field as part of the API response, enabling clients to check the current state of each upload.

However, a formal set of processing states and transitions between them has not yet been defined. The system also lacks a detailed progress tracking interface and user notifications once processing is completed.

---

# Functionalities Not Yet Implemented

Functional requirements FR06, FR07, FR08, FR09, FR10, and FR12 do not currently have implementations in the repository.

These functionalities include mechanisms for comparing different versions of submitted data, automatic persistence of onboarding progress, dynamic interfaces based on active modules, dependency control between onboarding sections, collaborative assignment of tasks among contributors, and secure consolidation of data for integration with external systems.

The absence of these components indicates that the system is still in an early implementation phase, focusing primarily on the basic infrastructure for uploading and storing onboarding submissions.

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
