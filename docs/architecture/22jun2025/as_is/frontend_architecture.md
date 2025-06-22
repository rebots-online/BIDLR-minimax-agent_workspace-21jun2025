```mermaid
graph TD
    subgraph Browser
        A[React App: App.tsx]
    end

    A --> R[React Router]
    R --> LP[LandingPage.tsx]
    R --> AP[AdminPortal.tsx (Stub)]
    R --> UP[UserPortal.tsx (Stub)]

    subgraph "Core Providers"
        AuthP[AuthProvider.tsx]
        ThemeP[ThemeProvider]
    end

    A --> AuthP
    A --> ThemeP

    LP --> AuthP
    LP --> UIC[UI Components: Shadcn/ui]
    LP --> Hooks[Custom Hooks: useToast, useAuth]

    subgraph "UI Components (src/components/ui)"
        Button[Button.tsx]
        Card[Card.tsx]
        Input[Input.tsx]
        Badge[Badge.tsx]
        Toaster[Toaster (sonner)]
         وغيرها
    end

    subgraph "Custom Hooks (src/hooks)"
        useToast[use-toast.ts]
        useAuth[useAuth - from AuthProvider]
        useMobile[use-mobile.tsx]
    end

    subgraph "Static Assets (public/)"
        Data[JSON Data Files: users.json, etc.]
        Images[Images: admin-portal.webp, etc.]
    end

    A -.-> Data  # Conceptually, data is loaded, currently via static serving
    A -.-> Images # Displayed in components

    classDef component fill:#f9f,stroke:#333,stroke-width:2px;
    classDef provider fill:#ccf,stroke:#333,stroke-width:2px;
    classDef stub fill:#lightgrey,stroke:#333,stroke-width:2px;
    classDef static fill:#cfc,stroke:#333,stroke-width:2px;

    class A,LP,AP,UP,UIC,Button,Card,Input,Badge,Toaster component;
    class AuthP,ThemeP provider;
    class AP,UP stub;
    class Data,Images static;
    class Hooks,useToast,useAuth,useMobile component;
```

**Notes:**
*   The Admin and User portals are currently stubs with no real functionality.
*   `AuthProvider` is present but likely uses mock authentication logic.
*   Data is loaded from static JSON files in the `public/data` directory; no backend API calls are made for data fetching.
*   UI components are primarily from `shadcn/ui`.
