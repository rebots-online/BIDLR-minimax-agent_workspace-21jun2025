# Payment Gateway API Analysis

## Btcpay

**Summary:** The BTCPay Server Greenfield API is a REST API providing extensive functionalities for managing cryptocurrency payments, stores, applications, and user interactions. It supports both Basic Auth and API Key authentication, with API Keys being recommended for security and granular permission control. The API uses predictable resource-oriented URLs, accepts form-encoded request bodies, and returns JSON-encoded responses with standard HTTP response codes and verbs. It also provides Webhook capabilities for real-time event notifications.

**Key Features:**

*   **API Management**
    *   Authentication: Supports Basic Auth and API Key authentication. API keys can be restricted by store and permissions.
    *   API Key Management: Create new API keys (with labels and specific permissions), revoke API keys (current or target user's), and retrieve current API key information.
    *   Authorization Endpoint: Allows predefining permissions and redirecting users to the BTCPay Server Authorization UI for API key creation.
    *   Permissions: Granular permission system for API keys including unrestricted access, user management (view, create, manage, delete), server settings modification, internal lightning node usage, and store-specific permissions (modify settings, webhooks, view reports, create/view/modify invoices, manage/view payment requests, manage/view/archive/create pull payments, manage/view payouts, use lightning nodes, view/create lightning invoices).
*   **Application Management (Apps)**
    *   Point of Sale (PoS) App Management: Create, update, get data for PoS apps. Customize PoS app display (title, description, default view), item selection, custom amounts, discounts, search, categories, tipping, currency, button texts, tip prompts, custom tip percentages, notification/redirect URLs, SEO meta tags, and form integration. Manage app items including images and inventory.
    *   Crowdfund App Management: Create and get data for Crowdfund apps. Configure details like title, description, enabled status, target amount enforcement, start/end dates, target currency, main image, notification URL, tagline, Disqus integration, sounds/animations on contributions, reset frequency, perk display, and custom perks with prices, descriptions, and images.
    *   General App Operations: Get basic app data, delete apps, upload/delete app item images.
    *   App Statistics: Retrieve sales statistics and top items statistics for apps.
*   **Invoice Management**
    *   Invoice Creation: Create new invoices with customizable metadata (buyer info, product info, order info, PoS cart data), checkout settings (speed policy, payment methods, expiration, monitoring, payment tolerance, redirect URLs, language), and receipt settings. Supports top-up invoices (unspecified amount) and custom search terms.
    *   Invoice Retrieval: Get a list of invoices for a store, filterable by order ID, text search, status, and date range. Retrieve specific invoice details.
    *   Invoice Status Management: Archive invoices, unarchive invoices, mark invoice status (invalid or settled).
    *   Payment Method Management for Invoices: View payment methods for a specific invoice, activate payment methods (for lazy payment mode).
    *   Invoice Refund: Refund invoices, specifying refund variant (current rate, custom, fiat, overpaid amount, rate at time of payment), percentage to subtract, custom amount/currency, and payout method (On-chain, Lightning).
*   **Lightning Network Management**
    *   Node Information: Get node URIs, block height, alias, color, version, peer counts, active/inactive/pending channel counts for internal and store-associated Lightning nodes.
    *   Balance: View on-chain (confirmed, unconfirmed, reserved) and off-chain (opening, local, remote, closing) balances.
    *   Balance Histogram: View off-chain balance histograms.
    *   Connectivity: Connect to other Lightning nodes.
    *   Channel Management: Get information about current channels, open new channels with specified amounts and fee rates.
    *   Deposit Address: Get on-chain deposit addresses for Lightning nodes.
    *   Payment Management: Get details of specific Lightning payments, view lists of all Lightning payments (including pending).
    *   Invoice Management: Get details of specific Lightning invoices, view lists of all Lightning invoices (including pending).
    *   Invoice Payment: Pay Lightning invoices (BOLT11) with optional explicit amounts, max fee percentages, max flat fees, and send timeouts.
    *   Invoice Creation: Create Lightning invoices with specified amount, description, expiry, and private route hints.
*   **Store Management**
    *   Store Creation/Management: Create, retrieve, update, and remove stores. Configure store details like name, website, support URL, logo/CSS/payment sound URLs, brand color, default currency, invoice expiration settings, refund BOLT11 expiration, display expiration timer, monitoring expiration, speed policy (confirmation requirements), lightning description templates, payment tolerance, archiving status, anonymous invoice creation, receipt settings, lightning amount display, private route hints, on-chain/LN invoice fallback, automatic redirect, recommended fee display, default language, HTML title, network fee mode, Payjoin enablement, auto-language detection, 'Pay in wallet' button display, store header display, payment celebration/sounds, lazy payment methods, and default payment methods.
    *   Store Logo Management: Upload and delete store logos.
    *   Store Roles: View user roles available for a specific store.
    *   Store Email Settings: Retrieve and update SMTP email settings for stores, including 'from' address, server, port, login, certificate check, and password.
    *   Store Email Sending: Send emails using the store's configured SMTP server.
    *   Store Payment Methods: View, update, and delete configured payment methods for a store. Supports enabling/disabling and configuring specific payment method settings (e.g., Bech32 for BTC-CHAIN).
    *   Store Rate Settings: View and update store-specific rate settings, including spread, preferred source, custom script usage, and effective script. Allows previewing rate configuration results for various currency pairs.
    *   Store Rates: Get current rates for specified currency pairs based on store configuration.
    *   Store User Management: View, add, update, and remove users associated with a store. Supports setting user roles (Owner, Manager, Employee, Guest).
*   **On-Chain Wallet Management**
    *   Wallet Overview: Get wallet balance (total, unconfirmed, confirmed).
    *   Balance History: View balance histograms.
    *   Fee Rate: Get recommended on-chain fee rates based on block targets.
    *   Address Management: Get or generate new addresses for the wallet, unreserve the last generated address.
    *   Transaction Management: Get a list of on-chain transactions (filterable by label, limit, skip, status), create new transactions with multiple destinations, fee rates, Payjoin options, broadcast control, RBF, UTXO exclusion, and selected inputs. Retrieve specific transaction details and patch transaction info (e.g., add comments, labels).
    *   UTXO Management: Get a list of unspent transaction outputs (UTXOs).
    *   Wallet Generation: Generate a new wallet and update a store's payment method, optionally using an existing mnemonic or generating a new one with specified word list/count and script public key type. Allows saving private keys or importing to RPC.
    *   Address Preview: Preview addresses generated by current or proposed payment methods (derivation schemes).
*   **User Management**
    *   Current User Information: Get and update current user profile (email, name, image, password). Delete user profile and associated data. Upload/delete profile pictures.
    *   All Users: Get a list of all users (for administrators).
    *   User Creation: Create new users (with email, name, image, password, and admin status) even without authentication if no admin exists or registration is enabled.
    *   Specific User Management: Get user by ID or email. Delete users (requires admin, prevents deleting the only admin). Toggle user lock status. Approve or unapprove users.
    *   Notifications: View current user's notifications (filterable by store ID, seen status, limit, skip). Get specific notification details. Update notification status (mark as seen/unseen). Remove notifications. View and update notification settings (enable/disable specific notification types like new version, plugin update, payout, invoice state changes etc.).
*   **Payment Request Management**
    *   Payment Request Creation: Create new payment requests with amount, title, currency, email, description, expiry date, reference ID, custom payment amount allowance, form ID, and form response.
    *   Payment Request Retrieval: View existing payment requests for a store, retrieve specific payment request details.
    *   Payment Request Status Management: Archive payment requests, update payment requests.
    *   Invoice Generation from Payment Request: Create a new invoice for a payment request, or reuse an existing pending one.
*   **Payout Management**
    *   Payout Processors: Get a list of available payout processors in the BTCPay Server instance.
    *   Pull Payments (Management): Get a store's pull payments (including archived). Create new pull payments with name, description, amount, currency, BOLT11 expiration, auto-approve claims, start/expiry dates, and supported payout methods. Archive pull payments.
    *   Pull Payments (Public): Link a Boltcard to a pull payment for NFC payments. Get public information about a pull payment. Get payouts associated with a pull payment (including cancelled). Create payouts for a pull payment, specifying destination, amount, and payout method.
    *   Store Payouts: Create new payouts for a store (can be linked to a pull payment), with destination, amount, payout method, approval status, and metadata. Get a list of store payouts (including cancelled). Get details of specific store payouts.
    *   Payout Approval: Approve payouts, optionally specifying a rate rule for calculation.
    *   Payout Cancellation: Cancel payouts.
    *   Payout Status Marking: Mark payouts as paid or set to any specific state (AwaitingApproval, AwaitingPayment, Cancelled, Completed, InProgress) with optional payment proof.
*   **Webhook Management**
    *   Webhook Creation/Management: Create, retrieve, update, and delete webhooks for a store. Configure webhook enablement, automatic redelivery, URL, and authorized events (e.g., 'everything' or specific events). Add a secret for signature verification.
    *   Delivery Management: Get the latest webhook deliveries. Get information about a specific webhook delivery. Retrieve the JSON request sent for a delivery. Redeliver failed deliveries.
    *   Event Types: Supports various event types including Invoice Created, Expired, Received Payment, Payment Settled, Processing, Invalid, Settled. Also, Payment Request Created, Updated, Archived, Status Changed. Payout Created, Approved, Updated.
*   **Miscellaneous**
    *   Rate Sources: Get available rate providers for currency conversion.
    *   Permissions Metadata: Retrieve metadata about available permissions.
    *   Language Codes: Get supported language codes.
    *   Invoice Checkout: View the HTML checkout page for an invoice, with language selection.

## Woocommerce

**Summary:** The WooCommerce Payment Gateway API provides a class-based framework for developers to integrate custom payment methods into WooCommerce. It allows for the creation of various gateway types, handles payment processing, manages order statuses, and provides mechanisms for admin configuration and callback handling. This API focuses on extending WooCommerce's core payment capabilities through a plugin-driven approach, utilizing PHP classes and hooks.

**Key Features:**


## Revenuecat

**Summary:** The RevenueCat REST API allows developers to perform customer and transaction-related actions from their own servers. It is particularly useful for sensitive actions like refunding purchases, granting promotional entitlements, and for migrating existing users to RevenueCat or checking subscription status from a backend. The API is authenticated using Bearer tokens with public or secret API keys, depending on the endpoint.

**Key Features:**

*   **Transactions**
    *   Create a Purchase: Records a purchase for a Customer from various platforms (iOS, Android, Stripe, Roku, Paddle). Can create a new Customer if one doesn't already exist. Requires platform and fetch token (receipt data). Allows optional product_id, price, currency, payment_mode, introductory_price, is_restore flag, presented_offering_identifier, and custom attributes.
    *   Google Play: Refund and Revoke Subscription: Immediately revokes access to a Google Subscription and issues a refund for the last purchase.
    *   Google Play: Defer a Subscription: Defers the purchase of a Google Subscription to a later date by setting a new expiry time.
    *   Google Play: Refund and Revoke Purchase: Issues a refund for the most recent purchase of a Google product (subscription or non-subscription) and revokes access. Works for purchases within the last 365 days.
    *   Google Play: Cancel a Subscription: Cancels a Google subscription.
*   **Customers**
    *   Get or Create Customer: Retrieves the latest Customer Info for a given App User ID, or creates a new customer if not found. Can optionally update the Customer's 'last_seen' field by setting the X-Platform header.
    *   Delete Customer: Permanently deletes a customer and all associated data. Requires a secret API key.
    *   Add Customer Attribution Data (Deprecated): Attaches attribution data from supported networks (Apple Search AdSupport, Adjust, AppsFlyer, Branch, Tenjin, Facebook) to a subscriber.
    *   Update Customer Attributes: Updates custom attributes for a customer. Attributes can be deleted by setting their value to null or an empty string. Conflict resolution is handled via an 'updated_at_ms' timestamp.
*   **Offerings**
    *   Override a Customer's Current Offering: Sets a specific Offering as the current offering for a customer, overriding any other targeting or experiments.
    *   Remove a Customer's Current Offering Override: Resets the offering override for a customer, allowing their current offering to be determined by normal RevenueCat logic (targeting, experiments).
    *   Get Offerings: Retrieves all configured offerings for the app. The 'app_user_id' can influence the 'current_offering_id' based on experiments or overrides. The X-Platform header can be used to filter packages by platform for legacy API keys.
*   **Entitlements**
    *   Grant an Entitlement: Grants a promotional entitlement to a customer. This does not interfere with store transactions. The duration can be specified by an 'end_time_ms' (Unix epoch in milliseconds) or a predefined 'duration' (daily, weekly, monthly, etc.).
    *   Revoke Granted Entitlements: Revokes all previously granted promotional entitlements for a specific entitlement identifier and customer.

## Lemonsqueezy

**Summary:** The Lemon Squeezy API is a REST API designed for e-commerce operations, providing predictable resource-oriented URLs, valid JSON:API encoded responses, and standard HTTP response codes, authentication, and verbs. It supports a comprehensive set of operations for managing various aspects of an online store, including customers, products, orders, subscriptions, and licensing. The API includes a test mode for development and testing, is versioned to ensure backward compatibility, and has rate limiting in place to prevent abuse. Official and community-contributed SDKs are available to facilitate integration.

**Key Features:**

*   **Getting Started**
    *   Understand Requests
    *   Understand Responses
    *   View API changelog
*   **Users**
    *   Retrieve user object details
    *   Retrieve user
*   **Stores**
    *   Retrieve store object details
    *   Retrieve a store
    *   List all stores
*   **Customers**
    *   Retrieve customer object details
    *   Create a customer
    *   Retrieve a customer
    *   Update a customer
    *   List all customers
*   **Products**
    *   Retrieve product object details
    *   Retrieve a product
    *   List all products
*   **Variants**
    *   Retrieve variant object details
    *   Retrieve a variant
    *   List all variants
*   **Prices**
    *   Retrieve price object details
    *   Retrieve a price
    *   List all prices
*   **Files**
    *   Retrieve file object details
    *   Retrieve a file
    *   List all files
*   **Orders**
    *   Retrieve order object details
    *   Retrieve an order
    *   List all orders
    *   Generate order invoice
    *   Issue a refund
*   **Order Items**
    *   Retrieve order item object details
    *   Retrieve an order item
    *   List all order items
*   **Subscriptions**
    *   Retrieve subscription object details
    *   Update a subscription
    *   Retrieve a subscription
    *   List all subscriptions
    *   Cancel a subscription
*   **Subscription Invoices**
    *   Retrieve subscription invoice object details
    *   Retrieve a subscription invoice
    *   List all subscriptions invoices
    *   Generate a subscription invoice
    *   Issue a refund
*   **Subscription Items**
    *   Retrieve subscription item object details
    *   Retrieve a subscription item
    *   Retrieve item's current usage
    *   Update a subscription item
    *   List all subscriptions items
*   **Usage Records**
    *   Retrieve usage record object details
    *   Create a usage record
    *   Retrieve a usage record
    *   List all usage records
*   **Discounts**
    *   Retrieve discount object details
    *   Create a discount
    *   Retrieve a discount
    *   Delete a discount
    *   List all discounts
*   **Discount Redemptions**
    *   Retrieve discount redemption object details
    *   Retrieve a discount redemption
    *   List all discounts redemptions
*   **License Keys**
    *   Retrieve license key object details
    *   Retrieve a license key
    *   Update a license key
    *   List all license keys
*   **License Key Instances**
    *   Retrieve license key instance object details
    *   Retrieve a license key instance
    *   List all license key instances
*   **Checkouts**
    *   Retrieve checkout object details
    *   Create a checkout
    *   Retrieve a checkout
    *   List all checkouts
*   **Webhooks**
    *   Retrieve webhook object details
    *   Create a webhook
    *   Retrieve a webhook
    *   Update a webhook
    *   Delete a webhook
    *   List all webhooks
*   **License API**
    *   Activate a license key
    *   Deactivate a license key
    *   Validate a license key
*   **Affiliates**
    *   Retrieve affiliate object details
    *   Retrieve an affiliate
    *   List all affiliates

## Helcim

**Summary:** The Helcim API allows integration with existing websites or applications to process payments and access other Helcim functionalities. It supports retrieving, creating, or modifying various data objects beyond payments, including customers, card batches, and invoices. The API is structured into several subcategories, each with distinct use cases and functions.

**Key Features:**


## Square

**Summary:** The Square API allows developers to securely take payments, integrate applications with Square products, and customize Square for various business needs. It is structured into several key categories, each encompassing multiple APIs with specific functionalities.

**Key Features:**


## Stripe

**Summary:** The Stripe documentation provides an overview of various Stripe products and their capabilities. For payments, it highlights online payment processing, prebuilt checkout pages, secure UI components, and in-person payment solutions. For subscriptions, it details options for setting up recurring payments and managing them through the 'Billing' product. Invoicing capabilities are mentioned for issuing invoices to clients and customers. The content also emphasizes developer resources like API reference and sample projects for integrating these functionalities.

**Key Features:**

*   **Payments**
    *   Online payments: Core capability for processing payments online.
    *   Payment Links: No-code option to sell and get paid online.
    *   Checkout: Prebuilt, Stripe-hosted checkout page for accepting payments.
    *   Elements: Secure frontend UI components for building custom payment flows.
    *   Terminal: Solutions for in-person and omnichannel payments.
    *   Connect: Payments for platforms and marketplaces.
    *   Radar: Fraud and risk management for payments.
*   **Subscriptions**
    *   Recurring Payments: Ability to set up and manage recurring payments.
    *   Billing: Product specifically for subscriptions and recurring payments.
    *   Customer Portal: Stripe-hosted portal for customers to manage their subscriptions.
*   **Invoicing**
    *   Invoice clients and customers: No-code option to generate and send invoices.
*   **Developer Resources**
    *   API Reference: Comprehensive documentation for interacting with the Stripe API programmatically.
    *   Development Quickstart: Guidance for setting up a development environment.
    *   Sample Projects: Browseable examples for common integrations.

