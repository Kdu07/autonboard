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

## 4. Etapas do Processo

### 4.1 Acesso e Cadastro

Cliente acessa a landing page e inicia o processo de cadastro.

Physical Evidence:
- Landing page de onboarding
- Tela de cadastro de dados básicos

Customer Actions:
- Acessa a landing page
- Clica em "Start"
- Preenche os dados básicos
- Confirma os dados informados

Frontstage:
- Carrega a landing page (5 segundos)
- Inicia o fluxo de cadastro (2 a 3 segundos)
- Valida os campos em tempo real (até 500 ms)

Backstage:
- Serviço de onboarding cria e mantém a sessão de progresso do usuário.

Supporting Processes:
- Infraestrutura de autenticação e sessão

### 4.2 Upload do Arquivo

Cliente realiza o envio da planilha para validação.

Physical Evidence:
- Componente de upload de arquivo

Customer Actions:
- Adiciona arquivo da planilha
- Envia o arquivo

Frontstage:
- Sistema libera a etapa de upload (1 segundo)
- Realiza validação automática de formato (1 segundo)

Backstage:
- Serviço de validação verifica formato e integridade do arquivo enviado.

### 4.3 Tratamento de Erro e Reenvio

Caso o arquivo esteja em formato incorreto, o sistema notifica o cliente.

Physical Evidence:
- Notificação de erro de formato

Customer Actions:
- Corrige o arquivo
- Confirma a notificação de erro
- Envia o arquivo corrigido

Frontstage:
- Notifica erro por formato inválido (1 segundo)
- Sistema valida novo upload (5 segundos)

Backstage:
- Serviço de validação executa nova verificação.

### 4.4 Processamento

Arquivo validado segue para processamento interno.

Physical Evidence:
- Status de upload em validação (standby)

Customer Actions:
- Aguarda a validação

Frontstage:
- Status de processamento (standby) (1 segundo)

Backstage:
- Sistema de filas coloca o arquivo em processamento.
- Serviço de ingestão processa, padroniza e grava os dados no banco.

Supporting Processes:
- Infraestrutura de mensageria suporta o processamento assíncrono.
- Worker de processamento executa parsing e normalização dos dados.
- Banco de dados armazena as informações processadas.

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

