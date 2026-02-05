# Project and Business Understanding

## Table of Contents
- [Problem](#problem)
- [Partner Industry Context](#partner-industry-context)
- [Product Vision](#product-vision)
- [Product Scope (Does / Does Not Do)](#product-scope-does--does-not-do)
- [Product Goal](#product-goal)
- [Personas](#personas)
- [User Journey](#user-journey)
- [Business Flow](#business-flow)
- [Feature Brainstorming](#feature-brainstorming)
- [Delivery Sequencing and Prioritization](#delivery-sequencing-and-prioritization)
- [MVP Canvas](#mvp-canvas)
- [Project Risk Matrix](#project-risk-matrix)


## Problem

``` 
Complete here
```

## Partner Industry Context

```
Complete here
```

## Product Vision

```
Complete here
```

## Product Scope (Does / Does Not Do)

### What the Product Does
```
Complete here
```

### What the Product Does Not Do
```
Complete here
```

## Product Goal

```
Complete here
```

## Personas

```
Complete here:
- Name
- Role
- Goals
- Pain Points
- Context of use
```

## User Journey

```
Complete here:
Describe the steps users go through when interacting with the product.
Highlight needs, expectations, and pain points at each stage.
```

## Business Flow
#### Business Context
The business flow represents the onboarding and data ingestion process of new buildings into Equiem’s platform, focusing on how building data is collected, validated, standardized, and made available to internal systems.

#### Identified Business Processes
The main business processes involved in the project are:
- Building onboarding request
- Data submission by the client
- Data ingestion and validation
- Data standardization
- Data availability for internal systems

#### Business Flow Modeling (BPMN-Oriented Description)
This business flow is modeled using BPMN (Business Process Model and Notation), a standardized notation used to visually represent business processes, enabling clear communication between technical and non-technical stakeholders.

**Actors (Pools / Lanes):**
In BPMN, Pools represent different participants involved in the process, while Lanes subdivide a Pool to clarify responsibilities within the same participant.

- Client (Building Manager)
- Equiem Platform
- Data Processing Middleware

#### Process Flow
**Start Event**
The client initiates the onboarding of a new building.

**User Task – Submit Building Data**
The client uploads CSV and PDF files containing building information or fills out the form provided directly on the platform.

**System Task – Validate Files**
The platform validates file format, size, and basic data integrity.
- Exclusive Gateway – Files Valid?
**No:** The system notifies the client and requests corrections.
**Yes:** The process continues.

**Service Task – Ingest Data**
The middleware ingests the submitted data.

**Service Task – Standardize Data**
The middleware transforms the ingested data into a unified internal format.

**Exclusive Gateway – Standardization Successful?**
**No:** The error is logged and the user is notified.
**Yes:** The process continues.

**System Task – Store Standardized Data**
The standardized data is stored and made available to internal systems.

**End Event**
- The onboarding process is completed.

#### Notation and Modeling Approach.
The business flow is modeled following BPMN concepts, using:
- Start and End Events
- User Tasks
- System and Service Tasks
- Exclusive Gateways
- Swimlanes to separate responsibilities

This modeling approach ensures clear visibility of responsibilities, decision points, and system interactions throughout the entire onboarding process.


## Feature Brainstorming

```
Complete here
```

## Delivery Sequencing and Prioritization

```
Complete here
Describe the criteria used (e.g., value, risk, effort, dependencies).
```

## MVP Canvas

```
Complete here:
- Value Proposition
- Customer Segments
- Key Features
- Objectives
- Success Metrics
- Risks
```

## Project Risk Matrix

```
Complete here
For each risk, include:
- Risk Description
- Probability (Low / Medium / High)
- Impact (Low / Medium / High)
- Prevention Actions
- Contingency Actions
```