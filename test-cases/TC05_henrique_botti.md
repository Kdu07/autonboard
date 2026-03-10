### Test Case 05 — Read the Uploaded Excel Document

---

#### Identificationi

| Field | Details |
|---|---|
| **Test Case ID** | TC-05 |
| **Test Case Title** | Read the Uploaded Excel Document |
| **Test Type** | Non-Functional — Performance and Reliability |
| **Related Requirement** | REQ-DOC-03: The system shall be capable of reading and processing uploaded Excel (.xlsx / .xls) documents, preserving the integrity of all data contained in tables and rows without any unexpected modification. |
| **Priority** | High |
| **Author** | QA Team |
| **Version** | 1.0 |
| **Date** | 2026-03-09 |

---

#### Objective

The primary objective of this test case is to **verify and validate that the system correctly reads an uploaded Excel document**, processing all worksheets, tables, and rows with complete data fidelity. Specifically, the test aims to confirm that:

1. The system accepts Excel files in both `.xlsx` and `.xls` formats without rejection or corruption during the upload process.
2. All worksheets present in the uploaded document are detected and made accessible to the system.
3. Every row and column within each worksheet is read completely, without truncation, omission, or reordering of records.
4. All data types present in the document — including strings, integers, floating-point numbers, dates, boolean values, and formulas — are parsed and interpreted correctly, with no unintended type conversion or value alteration.
5. Special characters, accented characters, and Unicode text are preserved without encoding errors.
6. The system reads the document within an acceptable time threshold, demonstrating efficiency even for large files with multiple worksheets and thousands of rows.
7. Empty cells, merged cells, and cells containing null values are handled gracefully without causing processing errors or data misalignment.
8. The system does not alter, overwrite, or delete any data in the original uploaded file during or after the read operation.

This test case is aligned with the **Reliability** and **Performance** non-functional testing types defined in SWEBOK, as it evaluates both the consistency of the data-reading function and the efficiency with which the system processes the document.

---

#### Preconditions

The following conditions must be fully satisfied before the execution of this test case begins. If any precondition is not met, the test must be suspended and the relevant issue resolved prior to resuming.

1. **System Availability:** The application under test (AUT) must be deployed, running, and accessible in the designated test environment. The test environment must mirror the production environment in terms of software versions, configurations, and available resources.

2. **Test File Preparation:** A set of test Excel files must be prepared in advance, covering the following scenarios:

   | File ID | File Name | Format | Description |
   |---|---|---|---|
   | FILE-01 | `test_simple.xlsx` | .xlsx | Single worksheet, 50 rows, 10 columns, mixed data types (string, integer, date) |
   | FILE-02 | `test_large.xlsx` | .xlsx | Single worksheet, 10,000 rows, 20 columns, numeric and string data |
   | FILE-03 | `test_multisheet.xlsx` | .xlsx | 5 worksheets, each with 200 rows and varying column structures |
   | FILE-04 | `test_special_chars.xlsx` | .xlsx | Data containing special characters: accented letters (é, ã, ü), symbols (@, #, %, &), and Unicode characters |
   | FILE-05 | `test_legacy.xls` | .xls | Legacy Excel format, single worksheet, 100 rows |
   | FILE-06 | `test_empty_cells.xlsx` | .xlsx | Worksheet with intentional empty cells, merged cells, and null values distributed across rows |
   | FILE-07 | `test_formulas.xlsx` | .xlsx | Worksheet containing cells with Excel formulas (SUM, AVERAGE, IF) and their computed values |

3. **Reference Data:** For each test file, a **reference data set** must be prepared independently (e.g., exported as CSV or documented in a test data sheet), containing the exact expected values for every cell. This reference will be used to validate the data read by the system.

4. **User Authentication:** The test executor must be logged into the system with a user account that has the necessary permissions to upload and read documents (at minimum: `document_upload` and `document_read` roles).

5. **Network Conditions:** The test environment must have a stable network connection. For performance-related assertions, the network bandwidth must be documented prior to test execution.

6. **Storage Availability:** The server must have sufficient disk space to receive and temporarily store the uploaded files. Minimum available storage: 500 MB.

7. **Logging Enabled:** Application logs must be enabled and accessible to the test executor, so that any errors or warnings generated during the read operation can be captured and analyzed.

8. **No Concurrent Uploads:** No other large file upload or processing operations should be running simultaneously on the test environment during the execution of this test case, to avoid interference with performance measurements.

---

#### Procedure

The following steps must be executed sequentially. Each step must be completed and its result verified before proceeding to the next. The test executor must document the actual result of each step.

**Step 1 — Access the Document Upload Interface**

Navigate to the document management section of the application. Locate and open the file upload interface. Verify that the upload form is rendered correctly, that the file input field is active, and that any instructions or accepted format indicators are visible on the screen.

*Verification:* The upload interface loads without errors. The accepted file types displayed include `.xlsx` and `.xls`.

---

**Step 2 — Upload FILE-01 (Simple Worksheet)**

Using the upload interface, select `test_simple.xlsx` from the prepared test files directory. Initiate the upload by clicking the designated upload or submit button. Observe the system's response during and after the upload.

*Verification:* The system displays a progress indicator during upload. Upon completion, a success notification is displayed. The file appears in the document list with the correct file name and upload timestamp.

---

**Step 3 — Trigger the Read Operation for FILE-01**

Navigate to the uploaded document entry for `test_simple.xlsx`. Initiate the read/parse operation by selecting the appropriate action (e.g., "Process", "Read", or "Import"). Record the start time of the operation.

*Verification:* The system acknowledges the read request and begins processing. No error messages are displayed at initiation.

---

**Step 4 — Validate Data Integrity for FILE-01**

Once the read operation completes, access the data output or preview generated by the system. Compare the displayed data row by row and column by column against the reference data set prepared for FILE-01.

Specifically verify:
- Total number of rows read matches the expected count (50 rows).
- Total number of columns read matches the expected count (10 columns).
- String values are identical to the source, with no truncation or encoding alteration.
- Integer values are numerically equal to the source.
- Date values are parsed in the correct format (e.g., `YYYY-MM-DD`) and match the source dates exactly.
- No additional rows or columns have been inserted or generated by the system.

*Verification:* All 50 rows and 10 columns match the reference data set exactly.

---

**Step 5 — Measure Read Performance for FILE-01**

Record the end time of the read operation. Calculate the total elapsed time from Step 3 initiation to completion. Document the result.

*Verification:* The read operation for a 50-row, 10-column file completes within **3 seconds**.

---

**Step 6 — Upload and Read FILE-02 (Large File)**

Repeat Steps 2 through 5 for `test_large.xlsx` (10,000 rows, 20 columns). Record the elapsed time for the read operation.

*Verification:* All 10,000 rows and 20 columns are read correctly. The operation completes within **30 seconds**. No timeout errors or memory overflow messages are generated.

---

**Step 7 — Upload and Read FILE-03 (Multi-Sheet Workbook)**

Upload `test_multisheet.xlsx`. After the upload, trigger the read operation. Verify that the system detects and reads all 5 worksheets. For each worksheet, validate that the row count and column count match the reference data.

*Verification:* All 5 worksheets are identified and listed. Data from each sheet is read independently and matches the reference data set.

---

**Step 8 — Upload and Read FILE-04 (Special Characters)**

Upload `test_special_chars.xlsx`. After reading, inspect the output data for all cells containing special characters, accented letters, and Unicode text. Compare each value against the reference data set.

*Verification:* All special characters are preserved without substitution, corruption, or loss. No "?" or replacement characters appear in place of valid Unicode characters.

---

**Step 9 — Upload and Read FILE-05 (Legacy .xls Format)**

Upload `test_legacy.xls`. Verify that the system accepts the legacy format and successfully reads all 100 rows.

*Verification:* The system does not reject the `.xls` file. All 100 rows are read correctly and match the reference data.

---

**Step 10 — Upload and Read FILE-06 (Empty and Merged Cells)**

Upload `test_empty_cells.xlsx`. After reading, verify that:
- Empty cells are represented as null or empty values in the output, not as zero or any default value.
- Merged cells are handled without causing row misalignment or column offset errors.
- The total row and column structure remains consistent with the source document.

*Verification:* Empty cells are correctly represented. Merged cell regions do not cause data displacement. No processing errors are thrown.

---

**Step 11 — Upload and Read FILE-07 (Formulas)**

Upload `test_formulas.xlsx`. After reading, verify that formula cells are read as their **computed values** (not as formula strings), and that these computed values match the expected results documented in the reference data set.

*Verification:* Formula cells return their computed numeric or string results. No formula syntax strings (e.g., `=SUM(A1:A10)`) appear in the output data.

---

**Step 12 — Verify Original File Integrity**

After all read operations are complete, download the originally uploaded files from the system and compare them against the original source files using a file hash comparison (MD5 or SHA-256).

*Verification:* The hash values of the downloaded files are identical to the hash values of the original source files, confirming that the system did not modify the uploaded documents during the read process.

---

**Step 13 — Review Application Logs**

Access the application logs generated during the execution of all read operations. Inspect for any warnings, errors, or exceptions related to file parsing, data type conversion, encoding, or memory usage.

*Verification:* No ERROR-level log entries are present. Any WARN-level entries are reviewed and assessed for impact on data integrity.

---

#### Expected Results

The following table consolidates the expected outcomes for each step of the procedure. All expected results must be met for the test case to be considered **passed**.

| Step | Expected Result |
|---|---|
| Step 1 | Upload interface loads correctly; accepted formats include `.xlsx` and `.xls` |
| Step 2 | FILE-01 uploads successfully; success notification displayed |
| Step 3 | Read operation initiates without errors |
| Step 4 | All 50 rows and 10 columns of FILE-01 match the reference data exactly; no data alteration |
| Step 5 | Read operation for FILE-01 completes in ≤ 3 seconds |
| Step 6 | All 10,000 rows and 20 columns of FILE-02 are read correctly; operation completes in ≤ 30 seconds |
| Step 7 | All 5 worksheets of FILE-03 are detected and read; all data matches reference |
| Step 8 | All special characters in FILE-04 are preserved without corruption |
| Step 9 | FILE-05 (.xls) is accepted and all 100 rows are read correctly |
| Step 10 | Empty cells are represented as null; merged cells do not cause misalignment |
| Step 11 | Formula cells return computed values; no formula strings appear in output |
| Step 12 | File hashes of downloaded files match original source files (no modification) |
| Step 13 | No ERROR-level log entries; all WARN entries are non-critical |

---

#### Obtained Results

> **Note:** This section must be completed by the test executor during or immediately after test execution. Each field should record the actual observed behavior of the system.

| Step | Obtained Result | Status (Pass / Fail / Blocked) | Observations |
|---|---|---|---|
| Step 1 | | | |
| Step 2 | | | |
| Step 3 | | | |
| Step 4 | | | |
| Step 5 | | | |
| Step 6 | | | |
| Step 7 | | | |
| Step 8 | | | |
| Step 9 | | | |
| Step 10 | | | |
| Step 11 | | | |
| Step 12 | | | |
| Step 13 | | | |
| **Overall** | | | |

**Defects Identified:** *(List any defects found during execution, with ID, description, and severity)*

| Defect ID | Description | Severity | Step Found |
|---|---|---|---|
| | | | |

---

#### Post-Conditions

Upon completion of this test case — regardless of whether the overall result is a pass or fail — the following post-conditions must be verified and actions taken:

1. **Test Data Cleanup:** All test files uploaded to the system during this test case (`FILE-01` through `FILE-07`) must be removed from the test environment's document repository to prevent interference with subsequent test cases.

2. **Log Archival:** All application logs generated during the execution of this test case must be exported and archived in the designated test evidence repository, linked to the test case ID `TC-05`.

3. **Test Report Update:** The test execution results, including the completed "Obtained Results" table and any identified defects, must be recorded in the test management tool (e.g., Jira, TestRail, or equivalent) under the test cycle associated with this document.

4. **Defect Registration:** Any defects identified during execution must be formally registered in the defect tracking system with the following minimum information: defect ID, title, description, steps to reproduce, severity, priority, and the test case ID (`TC-05`) as the source.

5. **Environment State Verification:** The test environment must be verified to be in a stable and clean state after test execution — no orphaned processes, no residual temporary files from the upload operations, and no locked database records related to the test files.

6. **Regression Consideration:** If any step fails due to a data integrity issue (Steps 4, 6, 7, 8, 9, 10, or 11), the defect must be flagged for **regression testing** after the fix is applied, ensuring that the corrective action does not introduce new failures in adjacent functionality.

7. **Performance Baseline Recording:** If the performance measurements obtained in Steps 5 and 6 represent the first execution of this test case in the environment, the results must be recorded as the **performance baseline** for future comparative analysis.

---

#### Traceability

| Artifact | Reference |
|---|---|
| Related Requirement | REQ-DOC-03 |
| Related User Story | US-12: As a system user, I want to upload an Excel file and have the system read all its data accurately |
| Related Non-Functional Test Types (SWEBOK) | Performance Testing (TC-05 Steps 5, 6), Reliability Testing (TC-05 Steps 12, 13) |
| Test Environment | QA Environment v2.1 |
| Dependent Test Cases | TC-03 (File Upload Validation), TC-04 (File Format Rejection) |

---
