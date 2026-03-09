# Test Case 03 - Validation of Unsupported File Extensions

### Test case:
Reject files of type different from .csv and .xlsx

### Objective:
Prevent non-spreadsheet files from reaching the server.
Make it clear for the user that the file type is invalid.

### Precondition:
A valid user session is active.
Invalid file is availabe in the test assets.

### Procedure:
1. Initialize uploadService.ts
2. Invoke the processUpload() method passing a non-compliant file (test_document.pdf, test_document.docx).
3. Capture the service response.

### Expected Result:
Service returns a 415 Unsupported Media Type.
The response body contains a message: "Invalid file type. Only CSV and Excel files are allowed."
Frontend displays a "Format Not Supported" alert to user.

## Test Case Table
| Business Driver | Requirement | Test Case |
| :---        |    :---   | :--- |
| ...    | ... | TC03 |