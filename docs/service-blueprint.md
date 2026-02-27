# Service Blueprint

## Summary

- [1. Introduction](#1-introduction)
- [2. The Persona: Mia King](#2-the-persona-mia-king)
- [3. Service Blueprint Components](#3-service-blueprint-components)
  - [3.1 Physical/Digital Evidence](#31-physicaldigital-evidence)
  - [3.2 Customer Actions](#32-customer-actions)
  - [3.3 Frontstage (Visible Software)](#33-frontstage-visible-software)
  - [3.4 Backstage (Internal Processes)](#34-backstage-internal-processes)
  - [3.5 Support Processes](#35-support-processes)
- [4. Mapping the Blueprint Lines](#4-mapping-the-blueprint-lines)
  - [4.1 Line of Interaction](#41-line-of-interaction)
  - [4.2 Line of Visibility](#42-line-of-visibility)
  - [4.3 Line of Internal Interaction](#43-line-of-internal-interaction)
- [5. Process Stages: Mia's Journey](#5-process-stages-mias-journey)
  - [5.1 Access and Registration](#51-access-and-registration)
  - [5.2 File Upload](#52-file-upload)
  - [5.3 Error Handling and Resubmission](#53-error-handling-and-resubmission)
  - [5.4 Processing](#54-processing)
- [6. Technical Enhancements](#6-technical-enhancements)
  - [6.1 Estimated Duration](#61-estimated-duration)
  - [6.2 Bottlenecks (Failure Points)](#62-bottlenecks-failure-points)

## 1. Introduction

This document aims to map the complete lifecycle of the **customer onboarding process**, as represented by the persona Mia King. It identifies the connections between user actions, front-end interfaces, and back-end logic, including external APIs and databases, to ensure a clear, fast, and predictable experience.

<div align="center">
<sub>Figure 1 - Service Blueprint</sub><br>
  <img src="../assets/serviceblueprint.png" width="80%" alt="Blueprint"><br>
  <sup>Source: Material produced by the authors, 2026.</sup>
</div>

## 2. The Persona: Mia King

To guide our blueprint, we've defined the persona representing our primary customer in this process.

| Characteristic | Description |
| :--- | :--- |
| **Name** | Mia King |
| **Age** | 28 years old |
| **Role** | Customer Onboarding Specialist |
| **Quote** | "If the data comes in right from the start, everything else flows." |
| **Context** | Mia is analytical and process-oriented. She values precision, organization, and data traceability. She acts as the quality gatekeeper during onboarding, ensuring that everything delivered for integration is technically sound and reliable. |
| **Pain Points** | Manual data review; consolidating information in spreadsheets; dependence on multiple back-and-forth interactions with clients to fix errors. |
| **Needs** | Automatic data validation; organization by module and by responsible owner; clear visualization of errors and the status of each submitted section. |

## 3. Service Blueprint Components

Before detailing the blueprint, it's crucial to identify the five "Swim Lanes" as defined by IxDF [1].

### 3.1 Physical Evidence

This represents everything Mia interacts with. For her, who prefers precision and organization, the clarity and traceability of the interface are paramount.

- Clear and objective onboarding landing page
- Basic data registration screen with clearly marked mandatory fields
- File upload component with straightforward instructions
- Instant format error notification with guidance for correction
- Upload status in validation (standby) with clear visual feedback

### 3.2 Customer Actions

Describes the steps Mia takes to efficiently achieve her goal of completing the onboarding.

- Accesses the landing page
- Clicks "Start"
- Fills in basic data, focusing on mandatory fields
- Confirms the provided data
- Adds the spreadsheet file (CSV, JSON, etc.)
- Corrects the file immediately after error notification
- Uploads the corrected file
- Waits for validation, trusting the system's feedback

### 3.3 Frontstage

This corresponds to what Mia sees the system doing, addressing her need for a step-by-step process with clear visibility.

- Loads the landing page
- Initiates the guided registration flow
- Validates fields in real-time, indicating what is mandatory
- System enables the upload step after correct completion
- Performs automatic format validation
- Notifies error due to invalid format
- System validates new upload
- Displays processing status (standby)

### 3.4 Backstage

Refers to actions Mia doesn't see, but which are triggered by her actions to ensure the information is correct.

- Onboarding service creates and maintains Mia's progress session.
- Validation service checks the format and integrity of the uploaded file.
- Queue system places the file into processing.
- Ingestion service processes, standardizes, and writes data to the database.

### 3.5 Support Processes

Background systems or third-party services that enable the service to function.

- Messaging infrastructure supports asynchronous processing.
- Processing worker executes data parsing and normalization.
- Database stores the processed information.

## 4. Mapping the Blueprint Lines

When designing the service blueprint, two critical boundaries must be defined:

### 4.1 Line of Interaction

Separates Mia's actions from activities performed by the visible system (Frontstage).

### 4.2 Line of Visibility

Separates what is visible to Mia from what happens internally within the system.

### 4.3 Line of Internal Interaction

Separates the main internal processes from the support processes.

## 5. Process Stages: Mia's Journey

The following stages detail Mia's journey, filling the lanes for each action.

### 5.1 Access and Registration

Mia accesses the landing page and begins the registration process, expecting a simple and fast flow.

**Physical/Digital Evidence:** Onboarding page and registration screen.

**Customer Actions:** Accesses, clicks "Start," fills in, and confirms data.

**Frontstage:** Loads page, initiates flow, and validates fields in real-time.

**Backstage:** Onboarding service manages the session.

**Support Processes:** Authentication infrastructure.

### 5.2 File Upload

Mia uploads the spreadsheet, expecting the system to guide her.

**Physical/Digital Evidence:** Upload component.

**Customer Actions:** Adds and uploads the file.

**Frontstage:** Enables upload and validates format.

**Backstage:** Validation service checks the file.

### 5.3 Error Handling and Resubmission

If the format is incorrect, the system notifies Mia, who needs clear instructions to correct it.

**Physical/Digital Evidence:** Error notification.

**Customer Actions:** Corrects and resubmits the file.

**Frontstage:** Notifies error and validates the new upload.

**Backstage:** Validation service performs a new check.

### 5.4 Processing

The validated file proceeds to internal processing, and Mia awaits final confirmation.

**Physical/Digital Evidence:** Validation status.

**Customer Actions:** Waits for validation.

**Frontstage:** Displays processing status.

**Backstage:** Queue and ingestion service process data.

**Support Processes:** Messaging, worker, and database.

## 6. Technical Improvements  
To make the blueprint useful for Software Engineering, IxDF-recommended notations are added [1].

### 6.1 Estimated Duration


| Process Stage | Layer | Estimated Duration (Target) | Impact on Frontstage | Mitigation Strategy |
|---------------|--------|----------------------------|----------------------|--------------------|
| File Validation Service | Backstage | < 3s | User remains in “processing” state longer than expected | Display validation progress indicator and immediate feedback |
| Asynchronous Queue Placement | Backstage | < 1s | Delay before actual processing begins | Auto-scaling queue system |
| Ingestion Service (Processing + DB Write) | Backstage | 5–8s | Increased perceived waiting time during processing | Real-time status updates |
| Database Write Operation | Support Process | < 2s | May delay final confirmation to the user | Query optimization and indexing |


Defining the “Estimated Duration” for background processes is essential to ensure a positive user experience. It is important to measure the maximum expected time for these processes to be completed. However, this duration may vary depending on the technology used, the available infrastructure, the volume of processed data, and other technical factors that directly impact performance.

More than the absolute execution time, what truly influences user perception is whether feedback is provided during processing. In many cases, users do not abandon a request because it takes a few extra seconds, but because they receive no indication that the system is functioning properly.

For example, imagine a user accesses the application, completes all steps in the flow, and finally submits a `.csv` file containing the necessary information for an onboarding process. If, after submission, there is no visual feedback indicating that the file is being processed, a situation of uncertainty is created.

In this scenario, the following perceptions may arise:

- A feeling that the system has frozen;
- A seemingly stalled screen, with no indication of progress;
- Possible abandonment of the process by the user;
- Multiple attempts to resubmit the same file, generating duplicate requests.

This phenomenon is known as a temporal expectation breakdown. Users hold an implicit expectation regarding how long a given action should take. When the system fails to communicate its processing state, this expectation is disrupted, undermining trust, usability, and even the operational efficiency of the application.

Therefore, in addition to estimating and optimizing technical execution time, it is essential to implement mitigation strategies, such as loading indicators, progress bars, status messages (“Processing file…”, “Validation in progress…”), or even remaining time estimates. These measures do not necessarily reduce the actual processing time, but they significantly reduce the negative perception associated with waiting.


### 6.2 Bottlenecks (Fail Points)

| Bottleneck (Critical Point) | What happens in the Frontstage if it fails or becomes overloaded? |
|-----------------------------|-------------------------------------------------------------------|
| File Validation Service | When handling large files or heavy processing loads, validation time can increase significantly. If the service fails or takes longer than expected, the user may only see a “processing” status indefinitely or receive a generic error message. This creates a perception of system freezing, uncertainty about whether the file was successfully submitted, and the possibility of duplicate re-uploads. Without proper handling, the experience is perceived as unstable and unreliable. |
| Asynchronous Processing Queue | Since multiple users submit files that enter the same validation queue, if the system does not process them concurrently or scale properly, a backlog can form. In the Frontstage, this appears as excessive delay after file submission. The user may believe the system did not respond, leading to frustration, abandonment of the process, or repeated submission attempts. Without transparency regarding queue position or estimated processing time, a temporal expectation breakdown occurs. |

## References

[1] Interaction Design Foundation (IxDF). *Service Blueprint*. Available at: [https://www.interaction-design.org/literature/topics/service-blueprint](https://www.interaction-design.org/literature/topics/service-blueprint). Accessed on: Feb 26, 2026.
