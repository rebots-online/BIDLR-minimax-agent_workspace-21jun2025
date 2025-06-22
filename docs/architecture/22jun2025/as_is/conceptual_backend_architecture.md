```mermaid
graph TD
    subgraph "Clients (Conceptual)"
        AdminFE[Admin Portal Frontend]
        UserFE[User Portal Frontend]
        MobileApp[Mobile App (Future)]
        ExternalAPI[External API Consumers (Future)]
    end

    subgraph "Backend Services (As Designed - Not Implemented)"
        APIG[API Gateway]

        subgraph "Core Services"
            UserService[User Service]
            BillingService[Billing Service]
            PaymentSvc[Payment Gateway Service]
            TaxService[Tax Service]
        end

        subgraph "Supporting Services"
            NotificationSvc[Notification Service]
        end

        subgraph "Data Stores"
            DB[(Primary Database: SQL)]
            Cache[(Cache: Redis/Memcached)]
            DataWarehouse[(Data Warehouse)]
        end
    end

    subgraph "Third-Party Integrations (Conceptual)"
        Stripe[Stripe API]
        PayPal[PayPal API]
        Square[Square API]
        BTCPay[BTCPay Server]
        Web3[Web3 Providers]
        TaxJarAvalara[TaxJar / Avalara (Future)]
    end

    AdminFE --> APIG
    UserFE --> APIG
    MobileApp -.-> APIG
    ExternalAPI -.-> APIG

    APIG --> UserService
    APIG --> BillingService
    APIG --> PaymentSvc
    APIG --> TaxService
    APIG --> NotificationSvc

    UserService --> DB
    BillingService --> DB
    BillingService --> Cache
    BillingService --> DataWarehouse
    PaymentSvc --> DB
    TaxService --> DB
    NotificationSvc --> DB

    PaymentSvc --> Stripe
    PaymentSvc --> PayPal
    PaymentSvc --> Square
    PaymentSvc --> BTCPay
    PaymentSvc --> Web3

    TaxService -.-> TaxJarAvalara

    classDef service fill:#lightblue,stroke:#333,stroke-width:2px;
    classDef datastore fill:#lightgreen,stroke:#333,stroke-width:2px;
    classDef thirdparty fill:#orange,stroke:#333,stroke-width:2px;
    classDef client fill:#f9f,stroke:#333,stroke-width:2px;

    class APIG,UserService,BillingService,PaymentSvc,TaxService,NotificationSvc service;
    class DB,Cache,DataWarehouse datastore;
    class Stripe,PayPal,Square,BTCPay,Web3,TaxJarAvalara thirdparty;
    class AdminFE,UserFE,MobileApp,ExternalAPI client;
```

**Notes:**
*   This diagram represents the backend architecture *as designed* in `design/system_architecture.md`.
*   Currently, **none of these backend services or integrations are implemented.**
*   The React frontend (`billing-system`) is intended to interact with this backend via the API Gateway.
*   The design mentions specific payment gateways and the potential for third-party tax services.
