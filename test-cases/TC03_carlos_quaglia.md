# Test Case 03 - Validation of Unsupported File Extensions & MIME Types

### Test Case:

Rejection of non-compliant file formats and malicious MIME-type spoofing.

### Objective:

To ensure the system strictly enforces file type constraints at both the client and server levels, preventing unauthorized file processing or server-side resource exhaustion.

### Preconditions:

* A valid authenticated user session.
* Access to a suite of test assets including:
* Standard unsupported types (`.pdf`, `.docx`, `.png`).
* Null-byte injected filenames (e.g., `malicious.php%00.csv`).



---

### Procedure:

1. **Environment Setup:** Initialize `uploadService.ts` and ensure the interceptor logs are active.
2. **Standard Rejection:** Invoke `processUpload()` with a standard unsupported file (`sample.pdf`).
3. **Double Extension Test:** Upload a file named `report.csv.exe` to verify the regex parser identifies the *final* extension.
4. **Case Sensitivity Check:** Upload a file with a valid extension but atypical casing (`data.XLSX`) to ensure the whitelist is case-insensitive.
5. **UI Interruption:** Drag and drop an invalid file into the UI component to verify the "drop zone" immediately triggers a validation error before the API call is even made.
6. **Response Capture:** Log the HTTP status code, headers, and the `error_code` from the JSON response body.

---

### Expected Result:

* **API Response:** Service returns `415 Unsupported Media Type` for all non-compliant formats.
* **Error Payload:** Response body must return a standardized error object:
`{ "status": 415, "error": "UNSUPPORTED_FORMAT", "message": "Invalid file type. Only CSV and Excel (.xlsx) files are allowed." }`.
* **Frontend Behavior:** * The UI displays a high-visibility "Format Not Supported" notification.
* The upload progress bar is immediately terminated and the file is cleared from the queue.


* **Security:** The server must not save the file to a temporary directory before validation is complete.

---

## Test Case Table

| Business Driver | Requirement | Test Case |
| --- | --- | --- |
| **Data Integrity** | System must only process structured spreadsheet data to prevent parsing errors. | **TC03** - Validation of Unsupported File Extensions |
| **System Security** | Prevent "File Upload Vulnerabilities" by blocking executable or script-based files from reaching server storage. | **TC03** - Malicious Script Rejection |