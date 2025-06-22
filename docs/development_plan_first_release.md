# Development Plan: Billing System - First Release

This document outlines the development plan to achieve a "First Release" milestone for the Multi-Payment Gateway Billing System. The goal of this release is to have a functional system with core features for both administrators and users, including basic subscription management, user management, and integration with a single payment gateway in a test environment.

## 1. Goals for First Release

*   **Functional Admin Portal:**
    *   Secure login/logout.
    *   User management (CRUD operations for users).
    *   Product management (CRUD operations for service products/plans).
    *   View subscriptions (list, view details).
    *   Basic dashboard with key metrics (e.g., total users, total subscriptions - mock data initially, then live).
*   **Functional User Portal:**
    *   Secure login/logout.
    *   View and manage own subscriptions (e.g., view details, cancel subscription).
    *   View billing history (list of invoices - basic).
    *   Manage payment methods (add new card - integration with Stripe Elements).
*   **Core Backend Services (MVP):**
    *   **User Service:** Authentication, user CRUD.
    *   **Billing Service:** Product CRUD, subscription management (create, cancel, view), invoice generation (basic).
    *   **Payment Gateway Service:** Integration with Stripe (test mode) for processing payments and managing payment methods.
    *   **API Gateway:** Route requests to appropriate services.
*   **Database:**
    *   PostgreSQL database set up according to `design/database_schema.md` (relevant tables for first release).
    *   Integration with backend services using an ORM (e.g., Prisma or TypeORM).
*   **Tax Calculation (Basic):**
    *   Implement basic HST calculation (13% for Ontario, Canada) for invoices.
    *   Store tax rates and apply them during invoice generation.
*   **Technology Stack Choices (Recommendation if not explicitly defined elsewhere):**
    *   **Backend:** Node.js with Express.js (or NestJS for a more structured approach).
    *   **Database:** PostgreSQL.
    *   **ORM:** Prisma.
    *   **Authentication:** JWT-based authentication.
    *   **Frontend:** Continue with React/Vite/TypeScript.
    *   **State Management (Frontend):** Zustand or Redux Toolkit for more complex state.

## 2. Major Epics and Features

### Epic 1: Backend Foundation & Setup
    *   **Feature 1.1: Technology Stack Finalization & Project Setup**
        *   Confirm/select backend framework (e.g., Express.js with TypeScript).
        *   Set up backend monorepo/project structure (e.g., using Nx, or separate directories).
        *   Set up PostgreSQL database instance (local/Docker).
        *   Integrate Prisma ORM: schema generation from `database_schema.md`, client generation.
    *   **Feature 1.2: API Gateway Implementation (MVP)**
        *   Set up basic API Gateway to route requests to User and Billing services.
        *   Implement request validation (e.g., using Zod).
    *   **Feature 1.3: User Service & Authentication**
        *   Implement User CRUD endpoints (register, get user, update user, delete user).
        *   Implement JWT-based authentication (login, token generation, token validation middleware).
        *   Password hashing (e.g., bcrypt).
    *   **Feature 1.4: Seeding Initial Data**
        *   Create scripts to seed necessary initial data (e.g., admin user, sample tax rates).

### Epic 2: Product & Subscription Management (Backend & Frontend)
    *   **Feature 2.1: Product Management (Backend)**
        *   Implement Product CRUD endpoints in Billing Service (create, read, update, delete products/plans).
    *   **Feature 2.2: Product Management (Admin Portal Frontend)**
        *   Develop UI for Admin Portal to manage products (list, create, edit, delete).
    *   **Feature 2.3: Subscription Logic (Backend - Billing Service)**
        *   Endpoints for creating a subscription (linking user to product).
        *   Endpoints for viewing user subscriptions.
        *   Endpoint for canceling a subscription.
        *   Basic invoice generation logic upon subscription creation/renewal (mock renewal initially).
    *   **Feature 2.4: Basic Tax Calculation (Backend - Billing Service)**
        *   Integrate simple tax calculation (e.g., HST for Ontario) during invoice generation.
        *   Allow tax rates to be configurable/stored in the database.

### Epic 3: Payment Integration (Stripe - Test Mode)
    *   **Feature 3.1: Stripe Integration (Backend - Payment Service)**
        *   Set up Stripe test account.
        *   Implement Payment Service to interact with Stripe API (Customers, PaymentIntents, PaymentMethods, Subscriptions).
        *   Endpoint to create a Stripe PaymentIntent for an invoice.
        *   Endpoint to handle Stripe webhooks (e.g., `payment_intent.succeeded`, `invoice.paid`).
    *   **Feature 3.2: User Payment Method Management (User Portal Frontend)**
        *   Integrate Stripe Elements in User Portal for adding a new payment method (card).
        *   Securely send payment method details to backend to be saved with Stripe.
    *   **Feature 3.3: Subscription Payment (User Portal & Backend)**
        *   When a user subscribes to a product (from User Portal or via Admin action), create a Stripe Customer and Subscription if applicable, or process a one-time payment for initial invoice.
        *   Update local invoice status based on Stripe webhook.

### Epic 4: Admin Portal Core Features
    *   **Feature 4.1: Admin Authentication**
        *   Integrate Admin login form with backend User Service (differentiate admin role).
        *   Protected routes for admin section.
    *   **Feature 4.2: User Management (Admin Portal Frontend)**
        *   Develop UI for Admin Portal to list, view, create, edit, and delete users.
    *   **Feature 4.3: Subscription Viewing (Admin Portal Frontend)**
        *   Develop UI for Admin Portal to list all subscriptions and view details of a specific subscription.
    *   **Feature 4.4: Basic Dashboard (Admin Portal Frontend)**
        *   Display simple metrics: total users, total active subscriptions, total revenue (mock/basic calculation).

### Epic 5: User Portal Core Features
    *   **Feature 5.1: User Authentication**
        *   Integrate User login form with backend User Service.
        *   Protected routes for user section.
    *   **Feature 5.2: View Subscriptions (User Portal Frontend)**
        *   Develop UI for User Portal to display their active/past subscriptions.
        *   Allow users to cancel their subscriptions.
    *   **Feature 5.3: View Billing History (User Portal Frontend)**
        *   Develop UI for User Portal to list their invoices (basic details: date, amount, status).
        *   Allow downloading/viewing invoice details (simple format for now).

### Epic 6: Testing & Deployment Preparation
    *   **Feature 6.1: Backend Unit & Integration Tests**
        *   Write unit tests for critical business logic in services (auth, billing calculations, payment processing).
        *   Write integration tests for API endpoints.
    *   **Feature 6.2: Frontend Component & Basic E2E Tests**
        *   Write component tests for key UI components.
        *   Implement basic E2E tests for main user flows (login, subscribe, cancel - using Cypress or Playwright).
    *   **Feature 6.3: Dockerization**
        *   Create Dockerfiles for backend services and frontend.
        *   Create `docker-compose.yml` for easy local development setup.
    *   **Feature 6.4: Basic CI/CD Setup**
        *   Set up a simple CI pipeline (e.g., GitHub Actions) to run tests and linters on push.

## 3. Prioritization (High-Level)

1.  **Epic 1: Backend Foundation & Setup:** Essential to unblock all other development.
2.  **Epic 2 (Backend parts) & Epic 3 (Backend parts):** Core logic for products, subscriptions, and payments.
3.  **Epic 4 (Admin Auth, User Management, Product Management) & Epic 5 (User Auth):** Get basic user and admin access working with core data.
4.  **Epic 2 (Frontend parts) & Epic 3 (Frontend parts):** Implement UI for managing products and payments.
5.  **Epic 5 (User Subscription Management, Billing History):** Complete user-facing subscription features.
6.  **Epic 4 (Admin Subscription Viewing, Dashboard):** Complete admin oversight features.
7.  **Epic 6: Testing & Deployment Preparation:** Crucial for stability and future development, can be interleaved but needs focus before "release".

## 4. Out of Scope for First Release

*   Multiple payment gateway integrations (beyond Stripe).
*   Advanced tax compliance for multiple regions (beyond basic HST).
*   Extensible ontology framework implementation.
*   Notification Service (email notifications, etc.).
*   Data Warehouse and advanced analytics/reporting.
*   Full UI/UX polish as per detailed wireframes (focus on functionality).
*   Mobile application.
*   Full internationalization/localization.
*   Performance optimization beyond reasonable defaults.
*   Security hardening beyond essentials (e.g., detailed penetration testing, advanced WAF rules).

This plan provides a roadmap to a functional first release. Each feature will be broken down further into smaller, actionable tasks in the LLM coder checklist.
