# Service Blueprint

## Sumário

- [Parte 1 – Preparação (Os Componentes)](#parte-1--preparação-os-componentes)
  - [1.1 Evidência Física/Digital](#11-evidência-físicadigital)
  - [1.2 Ações do Cliente](#12-ações-do-cliente)
  - [1.3 Frontstage (Software Visível)](#13-frontstage-software-visível)
  - [1.4 Backstage (Processos Internos)](#14-backstage-processos-internos)
  - [1.5 Processos de Suporte](#15-processos-de-suporte)
- [Parte 2 – Mapeamento das Linhas](#parte-2--mapeamento-das-linhas)
- [Parte 3 – Etapas de Execução](#parte-3--etapas-de-execução)
  - [3.1 Identificar o Processo](#31-identificar-o-processo)
  - [3.2 Identificar o Cliente](#32-identificar-o-cliente)
  - [3.3 Mapear a Jornada](#33-mapear-a-jornada)
  - [3.4 Preencher as Swim Lanes Verticalmente](#34-preencher-as-swim-lanes-verticalmente)
- [Parte 4 – Melhorias Técnicas](#parte-4--melhorias-técnicas)
- [BluePrint](#parte-5--entrega-e-avaliação)

## 1. Swim Lanes

### 1.1 Physical Evidences

- Landing page de onboarding
- Tela de cadastro de dados básicos
- Componente de upload de arquivo
- Notificação de erro de formato
- Status de upload em validação (standby)


### 1.2 Customer Actions

- Acessa a landing page
- Clica em "Start"
- Preenche os dados básicos
- Confirma os dados informados
- Adiciona arquivo da planilha
- Corrige o arquivo e confirma a notificação de erro
- Envia o arquivo corrigido
- Aguarda a validação


### 1.3 Frontstage

- Carrega a landing page
- Inicia o fluxo de cadastro
- Valida os campos em tempo real
- Sistema libera a etapa de upload
- Realiza validação automática de formato
- Notifica erro por formato inválido
- Sistema valida novo upload
- Status de processamento (standby)


### 1.4 Backstage

- Serviço de onboarding cria e mantém a sessão de progresso do usuário.
- Serviço de validação verifica formato e integridade do arquivo enviado.
- Sistema de filas coloca o arquivo em processamento.
- Serviço de ingestão processa, padroniza e grava os dados no banco.


### 1.5 Supporting Processes

- Infraestrutura de mensageria suporta o processamento assíncrono.
- Worker de processamento executa parsing e normalização dos dados.
- Banco de dados armazena as informações processadas.

## 2. Mapeamento das Linhas do Blueprint

### 2.1 Linha de Interação

Separa as ações do cliente das atividades executadas pelo sistema visível (Frontstage).  
Representa todos os pontos de contato diretos entre o usuário e a interface.

- Physical Evidences
- Customer Actions
- Frontstage


### 2.2 Linha de Visibilidade

Separa o que é visível ao usuário do que acontece internamente no sistema.  
Tudo abaixo dessa linha não é percebido diretamente pelo cliente.

- Frontstage
- Backstage


### 2.3 Linha de Interação Interna

Separa os processos internos principais dos processos de suporte.  
Representa as integrações e dependências técnicas que sustentam o funcionamento do serviço.

- Backstage
- Supporting Processes

## 3. Etapas do Processo

### 3.1 Acesso e Cadastro

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

### 3.2 Upload do Arquivo

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

### 3.3 Tratamento de Erro e Reenvio

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

### 3.4 Processamento

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

## 4. Melhorias Técnicas

### 4.1 Tempo
Adicionar duração estimada para processos de Backstage:

- Processo:
  - Duração estimada:
  - Impacto no Frontstage:

(Repetir conforme necessário)


### 4.2 Gargalos (Fail Points)

Identificar pontos de falha:

- Ponto de falha:
  - O que acontece no Frontstage:
  - Impacto no usuário:

(Repetir conforme necessário)

## 5. BLUEPRINT

assets/image