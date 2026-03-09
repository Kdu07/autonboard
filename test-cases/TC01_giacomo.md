# Caso de Teste de Carga — Onboarding Concorrente

## Rastreabilidade (RTM)

| Business Driver | Requirement | Test Case |
|-----------------|-------------|-----------|
| **Performance / Escalabilidade** | O sistema deve suportar múltiplos envios de onboarding simultâneos sem degradação de responsividade ou precisão da validação (NFR05 – Concurrent Submission Handling). | TC-01 |

---

## Caso de Teste: TC-01

### Título
**Teste de carga em envios simultâneos de onboarding**

### Objetivo
Validar que o sistema mantém responsividade e precisão da validação quando vários usuários (ou sessões) realizam upload e processamento de dados de onboarding ao mesmo tempo, garantindo que não haja degradação perceptível nem perda de integridade dos dados (alinhado ao NFR05 e ao driver de negócio Performance / Escalabilidade).

### Pré-condição
- Ambiente de teste (backend, frontend e camada de persistência) disponível e estável.
- Utilizadores de teste autenticados (ou tokens/sessões válidas) para simular múltiplos clientes.
- Conjunto de arquivos de onboarding (CSV/XLSX) representativos em tamanho e variedade (ex.: até o limite de 100 MB por arquivo, conforme NFR02), preparados para envio.
- Definição dos parâmetros de carga: número de usuários concorrentes (ex.: 10, 25, 50), duração da janela de teste e taxa de chegada de requisições (se aplicável).

### Procedimento
1. Configurar o cenário de carga: número de usuários virtuais/sessões simultâneas, duração do teste e sequência de ações (login → upload de arquivo → aguardar processamento/feedback).
2. Iniciar o teste com todos os usuários virtuais executando o fluxo de upload de onboarding em paralelo dentro da mesma janela de tempo.
3. Durante a execução, coletar métricas de:
   - Tempo de resposta das requisições (upload, validação, feedback de status).
   - Taxa de sucesso vs. falha (HTTP e erros de negócio).
   - Consistência dos resultados de validação (nenhum dado corrompido ou misturado entre sessões).
4. Repetir o procedimento para diferentes níveis de carga (ex.: 10, 25 e 50 usuários simultâneos) para observar o ponto de degradação, se houver.
5. Registrar todos os resultados observados (tempos, erros, logs relevantes) para preenchimento do Resultado obtido.

### Resultado esperado
- Todas as submissões são aceitas e processadas sem degradação inaceitável da responsividade (ex.: tempo de resposta dentro dos limites definidos para o ambiente).
- A validação mantém precisão: dados de um usuário não afetam ou misturam com dados de outro; relatórios de erro correspondem aos arquivos enviados.
- Nenhuma perda de dados ou corrupção; estado de staging e persistência permanecem corretos para cada onboarding (NFR03).
- O sistema não retorna erros de disponibilidade ou timeout acima de um limiar aceitável (ex.: 1% de falhas por carga planejada).

### Resultado obtido  
(Ex.: número de usuários simulados, duração, tempo médio de resposta, taxa de sucesso, incidentes observados.)

### Pós-condição
- Ambiente pode ser restaurado ao estado anterior ao teste (dados de teste isolados ou removidos).
- Relatório de teste de carga documentado e vinculado a este caso (TC-LOAD-01) e ao NFR05 na RTM.

---

