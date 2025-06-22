# Database Schema

This document defines the database schema for the multi-payment gateway billing system. The schema is designed to be extensible and scalable, and it supports multi-tenancy, subscriptions, and tax compliance.

## Tables

### `users`

| Column | Data Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key |
| `tenant_id` | `UUID` | Foreign key to `tenants` table |
| `email` | `VARCHAR(255)` | User's email address (must be unique) |
| `password_hash` | `VARCHAR(255)` | Hashed password |
| `first_name` | `VARCHAR(255)` | User's first name |
| `last_name` | `VARCHAR(255)` | User's last name |
| `created_at` | `TIMESTAMP` | Timestamp of when the user was created |
| `updated_at` | `TIMESTAMP` | Timestamp of when the user was last updated |

### `tenants`

| Column | Data Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key |
| `name` | `VARCHAR(255)` | Name of the tenant |
| `created_at` | `TIMESTAMP` | Timestamp of when the tenant was created |
| `updated_at` | `TIMESTAMP` | Timestamp of when the tenant was last updated |

### `products`

| Column | Data Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key |
| `tenant_id` | `UUID` | Foreign key to `tenants` table |
| `name` | `VARCHAR(255)` | Name of the product |
| `description` | `TEXT` | Description of the product |
| `price` | `DECIMAL(10, 2)` | Price of the product |
| `currency` | `VARCHAR(3)` | Currency of the price (e.g., USD, CAD) |
| `created_at` | `TIMESTAMP` | Timestamp of when the product was created |
| `updated_at` | `TIMESTAMP` | Timestamp of when the product was last updated |

### `subscriptions`

| Column | Data Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key |
| `user_id` | `UUID` | Foreign key to `users` table |
| `product_id` | `UUID` | Foreign key to `products` table |
| `status` | `VARCHAR(255)` | Status of the subscription (e.g., active, canceled, paused) |
| `trial_ends_at` | `TIMESTAMP` | Timestamp of when the trial period ends |
| `starts_at` | `TIMESTAMP` | Timestamp of when the subscription starts |
| `ends_at` | `TIMESTAMP` | Timestamp of when the subscription ends |
| `created_at` | `TIMESTAMP` | Timestamp of when the subscription was created |
| `updated_at` | `TIMESTAMP` | Timestamp of when the subscription was last updated |

### `invoices`

| Column | Data Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key |
| `user_id` | `UUID` | Foreign key to `users` table |
| `subscription_id` | `UUID` | Foreign key to `subscriptions` table |
| `status` | `VARCHAR(255)` | Status of the invoice (e.g., paid, unpaid, overdue) |
| `total` | `DECIMAL(10, 2)` | Total amount of the invoice |
| `tax` | `DECIMAL(10, 2)` | Tax amount of the invoice |
| `currency` | `VARCHAR(3)` | Currency of the invoice (e.g., USD, CAD) |
| `due_at` | `TIMESTAMP` | Timestamp of when the invoice is due |
| `paid_at` | `TIMESTAMP` | Timestamp of when the invoice was paid |
| `created_at` | `TIMESTAMP` | Timestamp of when the invoice was created |
| `updated_at` | `TIMESTAMP` | Timestamp of when the invoice was last updated |

### `payments`

| Column | Data Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key |
| `invoice_id` | `UUID` | Foreign key to `invoices` table |
| `payment_gateway` | `VARCHAR(255)` | Name of the payment gateway used |
| `transaction_id` | `VARCHAR(255)` | Transaction ID from the payment gateway |
| `amount` | `DECIMAL(10, 2)` | Amount of the payment |
| `currency` | `VARCHAR(3)` | Currency of the payment (e.g., USD, CAD) |
| `status` | `VARCHAR(255)` | Status of the payment (e.g., successful, failed) |
| `created_at` | `TIMESTAMP` | Timestamp of when the payment was created |
| `updated_at` | `TIMESTAMP` | Timestamp of when the payment was last updated |

### `tax_rates`

| Column | Data Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key |
| `region` | `VARCHAR(255)` | Region for which the tax rate applies (e.g., CA_ON, US_NY) |
| `rate` | `DECIMAL(5, 4)` | Tax rate (e.g., 0.13 for 13% HST) |
| `description` | `TEXT` | Description of the tax rate |
| `created_at` | `TIMESTAMP` | Timestamp of when the tax rate was created |
| `updated_at` | `TIMESTAMP` | Timestamp of when the tax rate was last updated |

### `audit_logs`

| Column | Data Type | Description |
|---|---|---|
| `id` | `UUID` | Primary key |
| `user_id` | `UUID` | Foreign key to `users` table (the user who performed the action) |
| `action` | `VARCHAR(255)` | The action that was performed (e.g., created_invoice, updated_subscription) |
| `details` | `JSONB` | Details of the action that was performed |
| `created_at` | `TIMESTAMP` | Timestamp of when the action was performed |
