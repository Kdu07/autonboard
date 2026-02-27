# Service Blueprint

## Sumário

- [1. Blueprint](#1-blueprint)
- [2. Swim Lanes](#2-swim-lanes)
  - [2.1Physical Evidences](#21-physical-evidences)
  - [2.2 Customer Actions](#22-customer-actions)
  - [2.3 Frontstage](#23-frontstage)
  - [2.4 Backstage](#24-backstage)
  - [2.5 Supporting Processes](#25-supporting-processes)
- [3. Mapeamento das Linhas do Blueprint](#3-mapeamento-das-linhas-do-blueprint)
- [4. Etapas do Processo](#4-etapas-do-processo)
  - [4.1 Acesso e Cadastro](#41-acesso-e-cadastro)
  - [4.2 Upload do Arquivo](#42-upload-do-arquivo)
  - [4.3 Tratamento de Erro e Reenvio](#43-tratamento-de-erro-e-reenvio)
  - [4.4 Processamento](#44-processamento)
- [5. Melhorias Técnicas](#5-melhorias-técnicas)
  - [5.1 Duração Estimada](#51-duração-estimada)
  - [5.2 Gargalos (Fail Points)](#52-gargalos-fail-points)


## 1. BLueprint

<div align="center">
<sub>Figure 1 - Blueprint</sub><br>
  <img src="../assets/serviceblueprint.png" width="80%" alt="Blueprint"><br>
  <sup>Source: Material produced by the authors, 2026.</sup>
</div>

## 2. Swim Lanes

### 2.1 Physical Evidences

- Onboarding landing page  
- Basic data registration screen  
- File upload component  
- Format error notification  
- Upload status in validation (standby)  

### 2.2 Customer Actions

- Accesses the landing page  
- Clicks "Start"  
- Fills in the basic data  
- Confirms the provided data  
- Adds the spreadsheet file  
- Fixes the file and confirms the error notification  
- Uploads the corrected file  
- Waits for validation  

### 2.3 Frontstage

- Loads the landing page  
- Starts the registration flow  
- Validates fields in real time  
- System enables the upload step  
- Performs automatic format validation  
- Notifies error due to invalid format  
- System validates new upload  
- Processing status (standby)  

### 2.4 Backstage

- Onboarding service creates and maintains the user's progress session.  
- Validation service checks the format and integrity of the uploaded file.  
- Queue system places the file into processing.  
- Ingestion service processes, standardizes, and writes the data to the database.  

### 2.5 Supporting Processes

- Messaging infrastructure supports asynchronous processing.  
- Processing worker executes parsing and data normalization.  
- Database stores the processed information.  

## 3. Blueprint Lines Mapping

### 3.1 Line of Interaction

Separates customer actions from activities performed by the visible system (Frontstage).  
Represents all direct touchpoints between the user and the interface.

- Physical Evidences  
- Customer Actions  
- Frontstage  

### 3.2 Line of Visibility

Separates what is visible to the user from what happens internally in the system.  
Everything below this line is not directly perceived by the customer.

- Frontstage  
- Backstage  

### 3.3 Line of Internal Interaction

Separates the main internal processes from the supporting processes.  
Represents the technical integrations and dependencies that sustain the service operation.

- Backstage  
- Supporting Processes  

## 4. Process Stages

### 4.1 Access and Registration

Customer accesses the landing page and starts the registration process.

Physical Evidence:
- Onboarding landing page  
- Basic data registration screen  

Customer Actions:
- Accesses the landing page  
- Clicks "Start"  
- Fills in the basic data  
- Confirms the provided data  

Frontstage:
- Loads the landing page (5 seconds)  
- Starts the registration flow (2 to 3 seconds)  
- Validates fields in real time (up to 500 ms)  

Backstage:
- Onboarding service creates and maintains the user's progress session.  

Supporting Processes:
- Authentication and session infrastructure  


### 4.2 File Upload

Customer uploads the spreadsheet for validation.

Physical Evidence:
- File upload component  

Customer Actions:
- Adds the spreadsheet file  
- Uploads the file  

Frontstage:
- System enables the upload step (1 second)  
- Performs automatic format validation (1 second)  

Backstage:
- Validation service checks the format and integrity of the uploaded file.  


### 4.3 Error Handling and Resubmission

If the file is in an incorrect format, the system notifies the customer.

Physical Evidence:
- Format error notification  

Customer Actions:
- Fixes the file  
- Confirms the error notification  
- Uploads the corrected file  

Frontstage:
- Notifies error due to invalid format (1 second)  
- System validates new upload (5 seconds)  

Backstage:
- Validation service performs a new check.  


### 4.4 Processing

Validated file proceeds to internal processing.

Physical Evidence:
- Upload status in validation (standby)  

Customer Actions:
- Waits for validation  

Frontstage:
- Processing status (standby) (1 second)  

Backstage:
- Queue system places the file into processing.  
- Ingestion service processes, standardizes, and writes the data to the database.  

Supporting Processes:
- Messaging infrastructure supports asynchronous processing.  
- Processing worker executes parsing and data normalization.  
- Database stores the processed information.  

## 5. Technical Improvements  

### 5.1 Estimated Duration

The “Estimated Duration” labels were not incorporated into the Service Blueprint due to the impossibility of accurately mapping this concept within the proposed structure. However, the following explanatory text provides a more detailed clarification of this issue.

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


### 5.2 Bottlenecks (Fail Points)

| Bottleneck (Critical Point) | What happens in the Frontstage if it fails or becomes overloaded? |
|-----------------------------|-------------------------------------------------------------------|
| File Validation Service | When handling large files or heavy processing loads, validation time can increase significantly. If the service fails or takes longer than expected, the user may only see a “processing” status indefinitely or receive a generic error message. This creates a perception of system freezing, uncertainty about whether the file was successfully submitted, and the possibility of duplicate re-uploads. Without proper handling, the experience is perceived as unstable and unreliable. |
| Asynchronous Processing Queue | Since multiple users submit files that enter the same validation queue, if the system does not process them concurrently or scale properly, a backlog can form. In the Frontstage, this appears as excessive delay after file submission. The user may believe the system did not respond, leading to frustration, abandonment of the process, or repeated submission attempts. Without transparency regarding queue position or estimated processing time, a temporal expectation breakdown occurs. |

