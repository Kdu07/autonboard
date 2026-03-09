# Test Case 04 (TC04)

## Test Case  
Large File Upload Performance (100MB)

## Objective

Ensure that the system is capable of uploading large onboarding files (up to **100MB**) while maintaining acceptable performance levels and preserving a responsive user interface during the entire upload operation.

This test validates the behavior described in **FR01 – Structured Onboarding Data Upload** and **NFR02 – Large File Handling and Responsiveness**, with emphasis on the system's ability to manage large data transfers while maintaining usability and stability.

Large onboarding datasets are common in enterprise environments where organizations import significant amounts of structured data during system initialization or migration. Therefore, the system must be able to receive and process these datasets without negatively affecting the user experience or system performance.

According to recommended testing practices described in the Software Engineering Body of Knowledge (SWEBOK), performance-related testing should verify whether the system behaves correctly under realistic operational conditions. This includes validating that the system can handle expected workloads, maintain responsiveness, and avoid system degradation when processing resource-intensive operations such as large file uploads.

This test case specifically verifies the following aspects of the system:

- The system’s ability to **accept large onboarding files** near the maximum supported upload size.
- The stability of the **file upload mechanism** when transferring large amounts of data from the client to the server.
- The responsiveness of the **user interface while the upload process is running**, ensuring that the application remains usable.
- The system’s ability to **store the uploaded file in the intermediate storage layer** without data corruption.
- The absence of failures such as **upload interruptions, server errors, memory issues, or timeout problems**.

Successful execution of this test confirms that the platform supports large onboarding datasets while maintaining a consistent and reliable user experience.

## Precondition

Before executing this test case, the following conditions must be satisfied to ensure the test is performed in a controlled and reproducible environment.

- The system is deployed in a **stable testing or staging environment** that reflects the expected production configuration.
- The user executing the test has a **valid authenticated account** with appropriate permissions to access the onboarding submission functionality.
- The onboarding submission page is fully operational and accessible through the application interface.
- The application server responsible for handling uploads is running normally and is properly connected to the storage infrastructure.
- The storage layer used to temporarily store uploaded onboarding files is available and operational.
- No known system errors or outages are affecting the environment at the time of testing.

A valid test file must also be prepared prior to executing the test.

The test file must meet the following characteristics:

| Parameter | Description |
|---|---|
| File Format | CSV or XLSX |
| File Size | Approximately 100MB |
| Dataset Type | Structured onboarding dataset |
| Dataset Volume | Large dataset with hundreds of thousands or millions of records |
| File Validity | File structure follows the expected onboarding format |

Additionally, the testing device should have:

- A **stable internet connection**
- A **modern web browser (e.g., Chrome, Firefox, Edge)**
- Sufficient local resources to handle file selection and upload.

These conditions ensure that any observed issues during the test are related to the system under evaluation rather than external environmental problems.

## Procedure

1. Open the system application using a supported web browser.
2. Log in to the platform using a **valid user account with onboarding submission permissions**.
3. After authentication, navigate to the **Onboarding Submission Page** through the application dashboard or menu system.
4. Locate the **file upload component** available on the onboarding page.
5. Click the upload button or file selection field.
6. Select the prepared **CSV or XLSX test file with a size close to 100MB** from the local device.
7. Confirm the file selection and initiate the upload process.
8. Observe the system behavior while the upload is in progress.

During the upload process, verify the following:

- The system displays **clear feedback to the user**, such as progress indicators, loading messages, or upload status notifications.
- The **upload progress indicator updates correctly** while the file is being transferred.
- The **user interface remains responsive**, allowing the user to interact with other parts of the application such as menus, navigation controls, or other UI elements.

9. Continue monitoring the system until the upload process is completed.
10. Verify whether the system displays a **confirmation message indicating that the upload was successful**.
11. Confirm that the uploaded file has been **successfully stored in the intermediate storage layer** used by the onboarding pipeline.
12. Record any abnormal behaviors observed during the upload process, such as performance degradation, error messages, or delays.

## Expected Result

The system should behave according to the following expected outcomes when the test case is executed.

- The file upload process completes successfully without interruption.
- The system accepts the file and processes the upload request without generating errors.
- The user interface remains **fully responsive throughout the entire upload operation**, allowing the user to continue interacting with the application.
- The system provides **clear and consistent feedback** indicating the progress and status of the upload operation.
- The uploaded file is **correctly transferred to the backend system** and stored in the intermediate storage layer used by the onboarding workflow.
- The uploaded dataset remains **complete and uncorrupted after the transfer**.
- The system does not experience performance degradation, memory failures, crashes, or timeout errors during the process.
- The upload process finishes within a **reasonable time frame based on network conditions** and does not introduce excessive delays to the user.

If all these conditions are satisfied, the system can be considered compliant with the functional and non-functional requirements related to large file uploads and system responsiveness.

# Requirement Traceability

| Business Driver | Requirement | Test Case |
|---|---|---|
| Support an efficient onboarding process by allowing users to upload large datasets without negatively affecting the user experience. | **FR01 – Structured Onboarding Data Upload:** The system must allow users to upload CSV and XLSX onboarding files containing large datasets while keeping the interface responsive. | Upload a large file (~100MB) through the onboarding interface and verify that the system accepts and processes the file while maintaining normal interface responsiveness. |
| Ensure the platform can handle large onboarding files without performance issues. | **NFR02 – Large File Handling and Responsiveness:** The system must support file uploads of up to 100MB while keeping user interaction responsive during processing. | Upload a CSV or XLSX file close to the maximum size limit and confirm that the system processes the file correctly without affecting responsiveness. |
| Maintain system stability when multiple users submit onboarding data at the same time. | **NFR05 – Concurrent Submission Handling:** The system must support simultaneous onboarding submissions without degrading system performance. | Simulate multiple users uploading files simultaneously and verify that the system processes all submissions correctly while maintaining stable performance. |