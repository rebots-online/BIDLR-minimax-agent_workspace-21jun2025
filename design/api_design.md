# API Design

This document provides the OpenAPI/Swagger specifications for the system's APIs. The APIs are designed to be RESTful and follow the principles of the OpenAPI specification.

## Billing Service API

```yaml
openapi: 3.0.0
info:
  title: Billing Service API
  description: API for managing subscriptions, invoices, and payments.
  version: 1.0.0
servers:
  - url: https://api.example.com/billing
paths:
  /subscriptions:
    get:
      summary: Get a list of subscriptions
      responses:
        '200':
          description: A list of subscriptions
    post:
      summary: Create a new subscription
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Subscription'
      responses:
        '201':
          description: The created subscription

components:
  schemas:
    Subscription:
      type: object
      properties:
        id:
          type: string
          format: uuid
        user_id:
          type: string
          format: uuid
        product_id:
          type: string
          format: uuid
        status:
          type: string
```

  /subscriptions/{id}:
    get:
      summary: Get a subscription by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: The subscription with the specified ID
    put:
      summary: Update a subscription
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Subscription'
      responses:
        '200':
          description: The updated subscription
    delete:
      summary: Delete a subscription
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '204':
          description: The subscription was deleted successfully
  /invoices:
    get:
      summary: Get a list of invoices
      responses:
        '200':
          description: A list of invoices
    post:
      summary: Create a new invoice
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Invoice'
      responses:
        '201':
          description: The created invoice


  /invoices/{id}:
    get:
      summary: Get an invoice by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: The invoice with the specified ID
  /payments:
    post:
      summary: Process a payment
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Payment'
      responses:
        '201':
          description: The created payment

components:
  schemas:
    Invoice:
      type: object
      properties:
        id:
          type: string
          format: uuid
        user_id:
          type: string
          format: uuid
        subscription_id:
          type: string
          format: uuid
        status:
          type: string
        total:
          type: number
          format: float
        tax:
          type: number
          format: float
        currency:
          type: string
    Payment:
      type: object
      properties:
        invoice_id:
          type: string
          format: uuid
        payment_gateway:
          type: string
        token:
          type: string
