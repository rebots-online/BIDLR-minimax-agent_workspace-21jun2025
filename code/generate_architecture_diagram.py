
import os

def generate_architecture_diagram():
    mermaid_syntax = """
graph TD
    subgraph Frontend
        A[Admin Portal]
        B[User Portal]
    end

    subgraph Backend
        C[API Gateway]
        D[Billing Service]
        E[Payment Gateway Service]
        F[Tax Service]
        G[Notification Service]
        H[User Service]
    end

    subgraph Data Stores
        I[Primary Database]
        J[Cache]
        K[Data Warehouse]
    end

    subgraph Third-Party Services
        L[Stripe]
        M[Square]
        N[PayPal]
        O[BTC Pay]
        P[Web3]
    end

    A --> C
    B --> C
    C --> D
    C --> E
    C --> F
    C --> G
    C --> H
    D --> I
    D --> J
    E --> L
    E --> M
    E --> N
    E --> O
    E --> P
    F --> I
    G --> I
    H --> I
    D --> K
"""

    output_file = 'design/system_architecture_diagram.md'
    with open(output_file, 'w') as f:
        f.write('```mermaid\n')
        f.write(mermaid_syntax)
        f.write('\n```')

if __name__ == '__main__':
    generate_architecture_diagram()
