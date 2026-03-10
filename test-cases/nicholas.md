# Test case 02: See all uploaded sheets.

## Objective: 
Verify that the system correctly retrieves all uploaded sheets stored in the database.


## Precondition: 
1. The conection with the database must be stablished.
2. There must be at least one file stored into the DB.
3. The function `getAll()` must has been created.

## Procedure:
1. Ensure the application is running and has connected with the database
2. Call the repository function `getAll()`.
3. Capture the returned result.
4. Verify if the output follows the `IUpload` interface.

## Expected result:
The function returns an array of objects representing the uploaded sheets stored in the database.

Each object in the returned array follows the `IUpload` interface structure:
```ts
{
  id: number,
  customer_id: number,
  status: string,
  file_path: string,
  upload_date: Date,
  mimetype: string,
  size: number
}
```
Example of returned data:
```json
[
  {
    "id": 1,
    "customer_id": 12,
    "status": "processed",
    "file_path": "/uploads/customer_sheet.xlsx",
    "upload_date": "2026-03-09T15:30:00.000Z",
    "mimetype": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "size": 28451
  }
]
```


## Post-condition
- No changes are made to the database.
- All sheet records remain stored in the database.



## Table: Business Driver / Requirement / Test Case

| Business Driver | Requirement | Test Case |
|----------------|-------------|-----------|
| Support efficient onboarding data submission | FR01 – Structured Onboarding Data Upload | Verify that the system accepts valid onboarding files (CSV/XLSX) and stores the upload successfully |
| Ensure reliable storage of uploaded onboarding data | FR03 – Intermediate Data Persistence | Verify that uploaded files are saved in the staging database before validation or consolidation |
| Improve reliability of onboarding data quality | FR04 – Data Validation and Conflict Detection | Verify that the system checks required fields and identifies duplicated or invalid records |
| Enable safe updates to onboarding information | FR05 – Safe Data Correction via Re-Submission | Verify that a new submission can replace previous onboarding data without breaking data consistency |
| Provide visibility of onboarding progress | FR11 – Onboarding Status and Feedback | Verify that users can view the processing status and outcome of their uploaded files |