# Test Plan – Equiem Project

## Table of Contents
1. [General Planning](#general-planning)  
2. [Testing Tools and Technologies](#testing-tools-and-technologies)  
3. [Functional Test Planning](#functional-test-planning)  
   1. [Overview](#functional-tests-overview)  
   2. [Functional Test Cases](#functional-test-cases)  
   3. [Functional Test Coverage](#functional-test-coverage)  
4. [Non-Functional Test Planning (NFRs)](#non-functional-test-planning-nfrs)  
   1. [Overview](#non-functional-tests-overview)  
   2. [NFR Test Cases](#nfr-test-cases)  
   3. [NFR Test Coverage](#nfr-test-coverage)  
5. [Usability Testing](#usability-testing)  
   1. [Participant Profiles](#participant-profiles)  
   2. [Test Execution Script](#test-execution-script)  
6. [Final Considerations](#final-considerations)

# General Planning

The tests described in this document aim to ensure the **quality, reliability, performance, and usability** of the Equiem system. The planning includes positive and negative scenarios, evaluating both functional behavior and non-functional attributes, as well as the real experience of end users.

The tests were defined considering the business requirements, the constraints of the academic project, and the feasibility of execution in a controlled environment.

# Testing Tools and Technologies

The following tools were selected to support the testing process:

- **Postman**: manual and automated testing of REST APIs  
- **Jest** (or equivalent tool): automated testing of business logic  
- **Google Chrome**: manual functional tests and usability testing  
- **k6 / Apache JMeter**: load and concurrency simulation  
- **Google Sheets**: recording results and feedback from usability tests  
- **Markdown (.md)**: versioned and structured documentation of the test plan  

These tools were chosen due to their wide adoption in the industry, ease of use, and suitability for the academic context of the project.

# Functional Test Planning

## Functional Tests Overview

Functional tests aim to validate whether all functionalities of the Equiem system correctly meet the defined **Functional Requirements (FRs)**. The focus is on the complete onboarding workflow, from the initial upload to the final consolidation and external integration.

The planning includes both main flows and exception scenarios, ensuring that the system responds correctly to invalid inputs, operational errors, and unexpected interruptions.

