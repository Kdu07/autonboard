# Test Case 04 (TC04)

## Test Case  
Large File Upload Performance (100MB)

## Objective

Ensure that the system is capable of uploading large onboarding files (up to 100MB) while keeping the interface responsive for the user. This test validates the behavior described in **FR01** and **NFR02**, focusing on upload performance and system responsiveness.

## Precondition

- The user is logged into the system with a valid account.  
- The onboarding submission page is available and accessible.  
- A valid **CSV or XLSX file** with a size close to **100MB** is prepared for the test.  
- The system environment is running normally and connected to the storage layer.

## Procedure

1. Log in to the system using a valid user account.  
2. Access the onboarding submission page.  
3. Select a CSV or XLSX file with a size of approximately **100MB**.  
4. Upload the file using the upload feature available on the page.  
5. Monitor the system behavior while the upload is in progress.  
6. Check whether the interface remains responsive during the process.

## Expected Result

- The file is uploaded successfully without errors.  
- The user interface remains responsive during the upload.  
- The uploaded file is stored in the intermediate storage layer.  
- The upload process completes successfully without noticeable failures or interruptions.

# Requirement Traceability

| Business Driver | Requirement | Test Case |
|---|---|---|
| Support an efficient onboarding process by allowing users to upload large datasets without negatively affecting the user experience. | **FR01 – Structured Onboarding Data Upload:** The system must allow users to upload CSV and XLSX onboarding files containing large datasets while keeping the interface responsive. | Upload a large file (~100MB) through the onboarding interface and verify that the system accepts and processes the file while maintaining normal interface responsiveness. |
| Ensure the platform can handle large onboarding files without performance issues. | **NFR02 – Large File Handling and Responsiveness:** The system must support file uploads of up to 100MB while keeping user interaction responsive during processing. | Upload a CSV or XLSX file close to the maximum size limit and confirm that the system processes the file correctly without affecting responsiveness. |
| Maintain system stability when multiple users submit onboarding data at the same time. | **NFR05 – Concurrent Submission Handling:** The system must support simultaneous onboarding submissions without degrading system performance. | Simulate multiple users uploading files simultaneously and verify that the system processes all submissions correctly while maintaining stable performance. |