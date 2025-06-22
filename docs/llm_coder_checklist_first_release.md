# LLM Coder Checklist: Billing System - First Release

This checklist provides a detailed breakdown of tasks for developing the First Release of the Billing System. It's designed for execution by an LLM coder. Each task should be completed in sequence within its parent feature.

**Assumed Technologies (Confirm or Update as per Project Decisions):**
*   **Backend:** Node.js with Express.js, TypeScript
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **Authentication:** JWT
*   **Frontend:** React (Vite, TypeScript)
*   **UI Components:** Shadcn/UI
*   **State Management (Frontend):** Zustand (or Redux Toolkit if preferred)
*   **Testing:** Jest for backend unit/integration, React Testing Library for frontend components, Playwright/Cypress for E2E.

---

## Epic 1: Backend Foundation & Setup

### Feature 1.1: Technology Stack Finalization & Project Setup
*   **Task 1.1.1:** Create a new directory `backend/` in the repository root.
*   **Task 1.1.2:** Inside `backend/`, initialize a new Node.js project (`npm init -y`).
*   **Task 1.1.3:** Install Express.js, TypeScript, and necessary types: `npm install express && npm install -D typescript @types/express @types/node ts-node-dev`.
*   **Task 1.1.4:** Create `backend/tsconfig.json` with appropriate settings for an Express.js API (e.g., `target: "es6"`, `module: "commonjs"`, `outDir: "./dist"`, `rootDir: "./src"`, `esModuleInterop: true`, `strict: true`).
*   **Task 1.1.5:** Create `backend/src/server.ts` with a basic Express app setup listening on a port (e.g., 3001).
    ```typescript
    // backend/src/server.ts
    import express from 'express';
    const app = express();
    const PORT = process.env.PORT || 3001;
    app.get('/', (req, res) => res.send('Billing System Backend API'));
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    ```
*   **Task 1.1.6:** Add npm scripts in `backend/package.json` for `build` (`tsc`) and `dev` (`ts-node-dev src/server.ts`).
*   **Task 1.1.7:** Set up Prisma:
    *   Install Prisma CLI: `npm install -D prisma`.
    *   Initialize Prisma: `npx prisma init --datasource-provider postgresql`. This creates `backend/prisma/schema.prisma` and `backend/.env`.
    *   Update `backend/.env` with your PostgreSQL connection string (e.g., `DATABASE_URL="postgresql://user:password@localhost:5432/billing_system_dev?schema=public"`).
*   **Task 1.1.8:** Define initial Prisma schema in `backend/prisma/schema.prisma` based on `design/database_schema.md` for User, Product, Subscription, Invoice, Payment, TaxRate tables. Include `Tenant` if multi-tenancy is a strict immediate requirement, otherwise defer. Ensure relations are defined.
    *Example for User:*
    ```prisma
    // backend/prisma/schema.prisma
    model User {
      id        String   @id @default(uuid())
      email     String   @unique
      passwordHash String
      firstName String?
      lastName  String?
      isAdmin   Boolean  @default(false) // Added for admin role
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
      // subscriptions Subscription[]
      // invoices Invoice[]
    }
    // Define other models similarly: Product, Subscription, Invoice, Payment, TaxRate
    ```
*   **Task 1.1.9:** Run initial Prisma migration: `npx prisma migrate dev --name init`. This creates the tables in your database.
*   **Task 1.1.10:** Install Prisma Client: `npm install @prisma/client`.
*   **Task 1.1.11:** Create a Prisma client instance utility: `backend/src/lib/prisma.ts`.
    ```typescript
    // backend/src/lib/prisma.ts
    import { PrismaClient } from '@prisma/client';
    export const prisma = new PrismaClient();
    ```
*   **Task 1.1.12:** Add middleware to Express app for JSON parsing: `app.use(express.json());` in `backend/src/server.ts`.

### Feature 1.2: API Gateway Implementation (MVP)
*   **Task 1.2.1:** Create `backend/src/routes/index.ts` to act as a root router.
*   **Task 1.2.2:** In `backend/src/server.ts`, import and use this root router: `import apiRoutes from './routes'; app.use('/api/v1', apiRoutes);`.
*   **Task 1.2.3:** Install Zod for validation: `npm install zod`.

### Feature 1.3: User Service & Authentication
*   **Task 1.3.1:** Create user service directory: `backend/src/services/userService.ts`.
*   **Task 1.3.2:** Implement `createUser` function in `userService.ts` (hashes password using bcrypt, saves user via Prisma).
    *   Install bcrypt: `npm install bcrypt && npm install -D @types/bcrypt`.
*   **Task 1.3.3:** Create user controller directory: `backend/src/controllers/userController.ts`.
*   **Task 1.3.4:** Implement `registerUser` controller function in `userController.ts` (uses `createUser` service, handles request/response, basic Zod validation for email/password).
*   **Task 1.3.5:** Create user routes: `backend/src/routes/userRoutes.ts`. Add a POST `/users/register` route using `registerUser` controller.
*   **Task 1.3.6:** Mount `userRoutes` in `backend/src/routes/index.ts` (e.g., `router.use('/users', userRoutes)`).
*   **Task 1.3.7:** Implement `loginUser` function in `userService.ts` (finds user, compares password, generates JWT).
    *   Install JWT library: `npm install jsonwebtoken && npm install -D @types/jsonwebtoken`.
    *   Define `JWT_SECRET` in `.env`.
*   **Task 1.3.8:** Implement `login` controller function in `userController.ts`. Add POST `/users/login` route.
*   **Task 1.3.9:** Create authentication middleware `backend/src/middleware/authMiddleware.ts`.
    *   Middleware should verify JWT from `Authorization` header.
    *   Attach user object (from token payload) to `req`.
*   **Task 1.3.10:** Implement `getUserProfile` controller function (requires auth middleware) to fetch user details. Add GET `/users/profile` route.
*   **Task 1.3.11:** Implement `updateUserProfile` controller function. Add PUT `/users/profile` route.
*   **Task 1.3.12 (Admin):** Implement `getAllUsers` (admin only), `getUserById` (admin only), `updateUserById` (admin only), `deleteUserById` (admin only) in `userService.ts` and `userController.ts`. Add corresponding routes. Create an `adminMiddleware` that checks `req.user.isAdmin`.

### Feature 1.4: Seeding Initial Data
*   **Task 1.4.1:** Create a Prisma seed script: `backend/prisma/seed.ts`.
    *   Script should create an admin user (e.g., `admin@example.com`, hashed password).
    *   Script should create a basic HST tax rate (13% for 'CA_ON').
    ```typescript
    // backend/prisma/seed.ts (example snippet)
    // import { PrismaClient } from '@prisma/client';
    // import bcrypt from 'bcrypt';
    // const prisma = new PrismaClient();
    // async function main() {
    //   const adminPassword = await bcrypt.hash('password123', 10);
    //   await prisma.user.upsert({ ... });
    //   await prisma.taxRate.upsert({ ... });
    // }
    // main().catch(e => console.error(e)).finally(async () => await prisma.$disconnect());
    ```
*   **Task 1.4.2:** Update `backend/package.json` with `prisma.seed` script: `"prisma:seed": "ts-node prisma/seed.ts"`. (May need to configure ts-node for Prisma execution context or use plain JS for seed if simpler).
*   **Task 1.4.3:** Run the seed script: `npx prisma db seed`.

---

## Epic 2: Product & Subscription Management (Backend & Frontend)

### Feature 2.1: Product Management (Backend)
*   **Task 2.1.1:** Create `backend/src/services/productService.ts`.
*   **Task 2.1.2:** Implement CRUD functions in `productService.ts` for Products (name, description, price, currency, isActive).
*   **Task 2.1.3:** Create `backend/src/controllers/productController.ts`. Implement controller functions for Product CRUD using Zod for validation.
*   **Task 2.1.4:** Create `backend/src/routes/productRoutes.ts`. Add CRUD routes for products. Public GET routes, others admin-only.
*   **Task 2.1.5:** Mount `productRoutes` in `backend/src/routes/index.ts`.

### Feature 2.2: Product Management (Admin Portal Frontend)
*   **Task 2.2.1:** In `billing-system/` frontend, create API utility functions for product CRUD (e.g., `src/lib/api/products.ts`) to call backend product endpoints. Include token handling.
*   **Task 2.2.2:** Create a new page component `src/components/admin/ProductsPage.tsx`.
*   **Task 2.2.3:** Implement UI to list products (table using Shadcn UI). Fetch products using API util.
*   **Task 2.2.4:** Implement UI for creating a new product (dialog/modal form). Call create product API.
*   **Task 2.2.5:** Implement UI for editing an existing product (dialog/modal form). Call update product API.
*   **Task 2.2.6:** Implement functionality to delete a product (confirmation dialog). Call delete product API.
*   **Task 2.2.7:** Add `ProductsPage` to admin routing in `billing-system/src/components/admin/AdminPortal.tsx`.
*   **Task 2.2.8:** If not already chosen, select and install a frontend state management library (e.g., Zustand: `npm install zustand` in `billing-system/`). Create a store for products if needed for complex state.

### Feature 2.3: Subscription Logic (Backend - Billing Service)
*   **Task 2.3.1:** Create `backend/src/services/subscriptionService.ts`.
*   **Task 2.3.2:** Implement `createSubscription` function in `subscriptionService.ts`.
    *   Takes `userId`, `productId`.
    *   Creates a `Subscription` record.
    *   Generates an initial `Invoice` for the subscription (see Task 2.3.5).
    *   Returns subscription and initial invoice details.
*   **Task 2.3.3:** Implement `getUserSubscriptions` (for a user to get their own) and `getAllSubscriptions` (admin) functions.
*   **Task 2.3.4:** Implement `cancelSubscription` function (sets status to 'canceled', updates `endsAt`).
*   **Task 2.3.5:** Create `backend/src/services/invoiceService.ts`. Implement `createInvoice` function.
    *   Takes `userId`, `subscriptionId` (optional), line items (product details), tax rate.
    *   Calculates subtotal, tax, total.
    *   Saves `Invoice` record with `InvoiceItem` records.
*   **Task 2.3.6:** Create `backend/src/controllers/subscriptionController.ts`. Implement controller functions for creating, getting, canceling subscriptions. Use Zod for validation.
*   **Task 2.3.7:** Create `backend/src/routes/subscriptionRoutes.ts`. Add routes.
    *   `POST /subscriptions` (user role, creates subscription and initial invoice).
    *   `GET /subscriptions/my` (user role, gets their subscriptions).
    *   `GET /subscriptions` (admin role, gets all subscriptions).
    *   `PATCH /subscriptions/:id/cancel` (user role for own, or admin).
*   **Task 2.3.8:** Mount `subscriptionRoutes` in `backend/src/routes/index.ts`.
*   **Task 2.3.9:** Create `backend/src/controllers/invoiceController.ts` and `backend/src/routes/invoiceRoutes.ts` for viewing invoices (e.g., `GET /invoices/my`, `GET /invoices/:id`).

### Feature 2.4: Basic Tax Calculation (Backend - Billing Service)
*   **Task 2.4.1:** Ensure `TaxRate` model in `schema.prisma` has `region` (e.g., "CA_ON"), `rate` (e.g., 0.13), `description`.
*   **Task 2.4.2:** In `invoiceService.ts` (`createInvoice`), fetch the applicable `TaxRate` based on user's region (assume a default region or add region to User model if necessary for this MVP).
*   **Task 2.4.3:** Apply the tax rate to the subtotal to calculate the tax amount. Store tax amount in the `Invoice` record.

---

## Epic 3: Payment Integration (Stripe - Test Mode)

### Feature 3.1: Stripe Integration (Backend - Payment Service)
*   **Task 3.1.1:** Sign up for a Stripe developer account and get test API keys (secret and publishable). Add to `backend/.env`.
*   **Task 3.1.2:** Install Stripe Node.js library: `npm install stripe` in `backend/`.
*   **Task 3.1.3:** Create `backend/src/lib/stripe.ts` to initialize Stripe client with secret key.
*   **Task 3.1.4:** Create `backend/src/services/paymentService.ts`.
*   **Task 3.1.5:** Implement `createStripeCustomer` function in `paymentService.ts` if user doesn't have a Stripe customer ID yet. Store `stripeCustomerId` on `User` model.
*   **Task 3.1.6:** Implement `createPaymentIntent` function in `paymentService.ts`.
    *   Takes `invoiceId`, `amount`, `currency`, `stripeCustomerId`.
    *   Creates a Stripe PaymentIntent.
    *   Returns `client_secret` for the PaymentIntent.
*   **Task 3.1.7:** Create `backend/src/controllers/paymentController.ts`. Add endpoint `POST /payments/create-intent` for an invoice.
*   **Task 3.1.8:** Implement Stripe webhook handler:
    *   Create `POST /payments/stripe-webhooks` endpoint in `paymentController.ts`.
    *   Use `express.raw({type: 'application/json'})` middleware for this specific route.
    *   Verify webhook signature using `stripe.webhooks.constructEvent`.
    *   Handle `payment_intent.succeeded`: Update corresponding `Invoice` status to 'paid', `Payment` record.
    *   Handle `invoice.paid` (if using Stripe Invoices/Subscriptions directly later).
*   **Task 3.1.9:** Add payment routes to `backend/src/routes/index.ts`.
*   **Task 3.1.10 (Stripe Subscriptions):** If directly creating subscriptions in Stripe:
    *   Implement `createStripeSubscription` in `paymentService.ts` (creates Stripe Customer, attaches PaymentMethod, creates Stripe Subscription from a Price ID). Link Stripe Subscription ID to local `Subscription` model.
    *   Handle `customer.subscription.created/updated/deleted` webhooks.

### Feature 3.2: User Payment Method Management (User Portal Frontend)
*   **Task 3.2.1:** In `billing-system/`, install Stripe.js: `npm install @stripe/stripe-js @stripe/react-stripe-js`.
*   **Task 3.2.2:** Create `src/components/user/PaymentMethodsPage.tsx`.
*   **Task 3.2.3:** Wrap relevant part of User Portal with `<Elements>` provider from `@stripe/react-stripe-js`.
*   **Task 3.2.4:** Use `CardElement` (or other Stripe Elements) to create a form for adding a new payment method.
*   **Task 3.2.5:** On form submission, use `stripe.createPaymentMethod` to get a `paymentMethodId`.
*   **Task 3.2.6:** Create backend endpoint `POST /users/attach-payment-method` in `userController.ts` (Stripe: attach payment method to customer).
*   **Task 3.2.7:** Call this backend endpoint from frontend to save the payment method with Stripe for the user.
*   **Task 3.2.8:** Create backend endpoint `GET /users/payment-methods` to list user's saved Stripe payment methods (cards). Display these on `PaymentMethodsPage.tsx`.

### Feature 3.3: Subscription Payment (User Portal & Backend)
*   **Task 3.3.1:** When user subscribes to a product on frontend (e.g., from a `ProductsListPage.tsx` in User Portal):
    *   If using Stripe Subscriptions directly: Call backend endpoint that uses `createStripeSubscription` (Task 3.1.10). Stripe will handle future payments.
    *   If managing invoicing locally and charging one-time for invoices:
        *   Frontend calls `POST /subscriptions` (Task 2.3.7) to create local Subscription and initial Invoice.
        *   Frontend then takes the `invoiceId` and `amount` from the response.
        *   Frontend calls `POST /payments/create-intent` (Task 3.1.7) to get `client_secret`.
        *   Frontend uses `stripe.confirmCardPayment(client_secret, {payment_method: ...})` to process the payment for the first invoice.
*   **Task 3.3.2:** Ensure Stripe webhooks update local `Invoice` and `Subscription` statuses correctly.

---

## Epic 4: Admin Portal Core Features

### Feature 4.1: Admin Authentication
*   **Task 4.1.1:** Update `billing-system/src/components/LandingPage.tsx` login form. On admin login attempt:
    *   Call backend `POST /api/v1/users/login`.
    *   Store JWT in `AuthProvider` (e.g., in context state and localStorage).
    *   Verify user has `isAdmin: true` in JWT payload or by fetching profile.
    *   Navigate to `/admin`.
*   **Task 4.1.2:** Create `billing-system/src/components/admin/AdminLayout.tsx`. This layout should:
    *   Check for admin authentication status from `AuthProvider`. Redirect to login if not authenticated or not admin.
    *   Include common admin navigation (sidebar/header).
*   **Task 4.1.3:** Update `billing-system/src/components/admin/AdminPortal.tsx` to use `AdminLayout` and contain `<Outlet />` for nested admin routes.
*   **Task 4.1.4:** Implement logout functionality in `AdminLayout` (clear token from `AuthProvider` and localStorage, navigate to login).

### Feature 4.2: User Management (Admin Portal Frontend)
*   **Task 4.2.1:** Create API utility functions for admin user CRUD (`src/lib/api/adminUsers.ts`).
*   **Task 4.2.2:** Create `src/components/admin/UsersPage.tsx`.
*   **Task 4.2.3:** Implement UI to list users (table), fetch from backend GET `/api/v1/users` (admin).
*   **Task 4.2.4:** Implement UI to view user details (dialog/separate page).
*   **Task 4.2.5:** Implement UI to create a new user (form, call backend endpoint).
*   **Task 4.2.6:** Implement UI to edit a user (form, call backend endpoint).
*   **Task 4.2.7:** Implement UI to delete a user (confirmation, call backend endpoint).
*   **Task 4.2.8:** Add `UsersPage` to admin routing.

### Feature 4.3: Subscription Viewing (Admin Portal Frontend)
*   **Task 4.3.1:** Create API utility functions for admin subscription viewing.
*   **Task 4.3.2:** Create `src/components/admin/SubscriptionsPage.tsx`.
*   **Task 4.3.3:** Implement UI to list all subscriptions (table), fetch from backend `GET /api/v1/subscriptions` (admin).
*   **Task 4.3.4:** Implement UI to view subscription details (dialog/separate page).
*   **Task 4.3.5:** Add `SubscriptionsPage` to admin routing.

### Feature 4.4: Basic Dashboard (Admin Portal Frontend)
*   **Task 4.4.1:** Create `src/components/admin/DashboardPage.tsx`.
*   **Task 4.4.2:** Create backend endpoints to provide aggregate data (e.g., `GET /api/v1/stats/summary` - total users, active subscriptions, total revenue for a period).
*   **Task 4.4.3:** On `DashboardPage.tsx`, fetch data from stats endpoint.
*   **Task 4.4.4:** Display these metrics using Shadcn UI cards or simple text.
*   **Task 4.4.5:** Set `DashboardPage` as the default page for `/admin`.

---

## Epic 5: User Portal Core Features

### Feature 5.1: User Authentication
*   **Task 5.1.1:** Update `billing-system/src/components/LandingPage.tsx` login form. On user login attempt:
    *   Call backend `POST /api/v1/users/login`.
    *   Store JWT in `AuthProvider`.
    *   Navigate to `/user`.
*   **Task 5.1.2:** Create `billing-system/src/components/user/UserLayout.tsx`. This layout should:
    *   Check for user authentication status. Redirect to login if not authenticated.
    *   Include common user navigation.
*   **Task 5.1.3:** Update `billing-system/src/components/user/UserPortal.tsx` to use `UserLayout` and contain `<Outlet />`.
*   **Task 5.1.4:** Implement logout functionality in `UserLayout`.

### Feature 5.2: View Subscriptions (User Portal Frontend)
*   **Task 5.2.1:** Create API utility functions for user subscriptions (`src/lib/api/subscriptions.ts`).
*   **Task 5.2.2:** Create `src/components/user/MySubscriptionsPage.tsx`.
*   **Task 5.2.3:** Fetch user's subscriptions from `GET /api/v1/subscriptions/my`. Display in a list/cards.
*   **Task 5.2.4:** Implement UI to cancel a subscription. Call backend `PATCH /api/v1/subscriptions/:id/cancel`. Update UI.
*   **Task 5.2.5:** Add `MySubscriptionsPage` to user routing.
*   **Task 5.2.6 (Optional for MVP):** Create `src/components/user/BrowseProductsPage.tsx` to list available products (from `GET /api/v1/products`) and allow users to subscribe (initiates flow from Task 3.3.1).

### Feature 5.3: View Billing History (User Portal Frontend)
*   **Task 5.3.1:** Create API utility functions for user invoices.
*   **Task 5.3.2:** Create `src/components/user/BillingHistoryPage.tsx`.
*   **Task 5.3.3:** Fetch user's invoices from `GET /api/v1/invoices/my`. Display in a table (date, amount, status, download link).
*   **Task 5.3.4 (Placeholder):** Download link can be a placeholder or link to a simple backend endpoint that generates a plain text/HTML invoice detail for now.
*   **Task 5.3.5:** Add `BillingHistoryPage` to user routing.

---

## Epic 6: Testing & Deployment Preparation

### Feature 6.1: Backend Unit & Integration Tests
*   **Task 6.1.1:** Set up Jest for backend: `npm install -D jest @types/jest ts-jest supertest @types/supertest`. Configure `jest.config.js`.
*   **Task 6.1.2:** Write unit tests for `userService.ts` (e.g., password hashing, user creation logic - mock Prisma).
*   **Task 6.1.3:** Write unit tests for `productService.ts`, `subscriptionService.ts`, `invoiceService.ts`, `paymentService.ts` (core logic).
*   **Task 6.1.4:** Write integration tests for user auth endpoints (`/api/v1/users/register`, `/login`) using Supertest.
*   **Task 6.1.5:** Write integration tests for product CRUD endpoints.
*   **Task 6.1.6:** Write integration tests for subscription creation/cancellation.
*   **Task 6.1.7:** Add test scripts to `backend/package.json`.

### Feature 6.2: Frontend Component & Basic E2E Tests
*   **Task 6.2.1:** Ensure Vitest (default with Vite) or install Jest for frontend: `npm install -D jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom` in `billing-system/`. Configure.
*   **Task 6.2.2:** Write component tests for `LandingPage.tsx` login form.
*   **Task 6.2.3:** Write component tests for key admin components (e.g., `ProductsPage` table rendering, `UsersPage` form).
*   **Task 6.2.4:** Write component tests for key user components (e.g., `MySubscriptionsPage` list, `BillingHistoryPage` table).
*   **Task 6.2.5:** Install Playwright or Cypress: `npm install -D playwright` (or `cypress`) in root or `billing-system/`.
*   **Task 6.2.6:** Write basic E2E test for admin login flow.
*   **Task 6.2.7:** Write basic E2E test for user login flow.
*   **Task 6.2.8:** Write basic E2E test for user subscribing to a product (if product browsing page is built).
*   **Task 6.2.9:** Add test scripts to `billing-system/package.json`.

### Feature 6.3: Dockerization
*   **Task 6.3.1:** Create `backend/Dockerfile` for the Node.js Express backend.
    *   Use a Node base image (e.g., `node:18-alpine`).
    *   Copy `package.json`, `package-lock.json`, install dependencies.
    *   Copy Prisma schema and generate client: `RUN npx prisma generate`.
    *   Copy compiled code (`dist/`).
    *   Expose port, set CMD.
*   **Task 6.3.2:** Create `billing-system/Dockerfile` for the React frontend.
    *   Use a Node base image for building (e.g., `node:18-alpine as builder`).
    *   Copy `package.json`, `package-lock.json`, install dependencies, run build.
    *   Use a static server image (e.g., `nginx:alpine`) for serving. Copy built files from builder stage. Configure Nginx to serve SPA.
*   **Task 6.3.3:** Create `docker-compose.yml` in the repository root.
    *   Define services for `backend`, `frontend`, `postgres_db`.
    *   Use official PostgreSQL image for `postgres_db`. Configure volumes for data persistence.
    *   Set up environment variables, ports, networks.
    *   Ensure backend waits for DB to be ready (e.g., using `depends_on` with healthcheck, or a wait script).

### Feature 6.4: Basic CI/CD Setup
*   **Task 6.4.1:** Create GitHub Actions workflow file (e.g., `.github/workflows/ci.yml`).
*   **Task 6.4.2:** Configure workflow to trigger on push/pull_request to main/develop branches.
*   **Task 6.4.3:** Add steps to:
    *   Checkout code.
    *   Set up Node.js.
    *   Install backend dependencies (`cd backend && npm ci`).
    *   Run backend linters/formatters (`npm run lint`).
    *   Run backend tests (`npm test`).
    *   Install frontend dependencies (`cd billing-system && npm ci`).
    *   Run frontend linters/formatters (`npm run lint`).
    *   Run frontend tests (`npm test`).
    *   (Optional) Build Docker images.

---
This checklist should guide the LLM coder through the development of the first release. Each task is intended to be relatively small and self-contained.
