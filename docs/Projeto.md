## Technical Infrastructure and Deploy Mapping

## UML Deployment Diagram

The following UML Deployment Diagram illustrates the physical and logical distribution of the system across cloud infrastructure, utilizing a decoupled, highly available architecture to handle asynchronous file processing and data integrity.

```mermaid
graph TD
    %% Define Client Node
    subgraph "Client Node: Customer Device"
        Browser["Web Browser (React SPA)"]
    end

    %% Define Cloud Edge / Gateway
    subgraph "Cloud Edge Network"
        CDN["CDN & Static Web Hosting\n(Frontend Assets)"]
        WAF["Web Application Firewall & API Gateway\n(Traffic Routing & Security)"]
    end

    %% Define Compute Nodes
    subgraph "Compute Tier: Application Servers"
        API["Backend API Node\n(TypeScript Kestrel Server)"]
        Worker["Background Worker Node\n(Async Data Processing Service)"]
    end

    %% Define Middleware & Messaging
    subgraph "Middleware Tier"
        Queue["Message Broker\n(Event Queue)"]
    end

    %% Define Data Nodes
    subgraph "Data Storage Tier"
        DB["Relational Database Server\n(SQL Database)"]
        Blob["Object Storage Node\n(Files & Images)"]
    end

    %% Connections
    Browser -- "HTTPS (TLS 1.3)" --> CDN
    Browser -- "HTTPS (TLS 1.3)\nREST/JWT" --> WAF
    WAF -- "HTTPS" --> API
    API -- "AMQP (TCP 5672)\nPublish Event" --> Queue
    Queue -- "AMQP (TCP 5672)\nConsume Event" --> Worker
    API -- "HTTPS\nUpload/Download" --> Blob
    Worker -- "HTTPS\nStream Large Files" --> Blob
    API -- "TCP (1433)\nRead/Write" --> DB
    Worker -- "TCP (1433)\nBulk Upsert" --> DB
```

---
