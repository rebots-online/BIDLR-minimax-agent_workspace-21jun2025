# Payment Gateway Integration

This document describes the design of the payment gateway integration for the multi-payment gateway billing system. The system will use the adapter pattern to integrate with multiple payment gateways, providing a unified interface for processing payments.

## Adapter Pattern

The adapter pattern is a structural design pattern that allows objects with incompatible interfaces to collaborate. In our case, we will create a `PaymentGateway` interface that defines the common operations for processing payments, such as `charge` and `refund`. We will then create concrete adapter classes for each payment gateway that we want to support, such as `StripeGateway`, `SquareGateway`, and `PayPalGateway`. Each adapter class will implement the `PaymentGateway` interface and will translate the common operations into the specific API calls for that gateway.

## Code Example (Python)

```python
from abc import ABC, abstractmethod

class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float, token: str) -> str:
        pass

    @abstractmethod
    def refund(self, transaction_id: str, amount: float) -> bool:
        pass

class StripeGateway(PaymentGateway):
    def charge(self, amount: float, token: str) -> str:
        # Code to process a charge with Stripe
        pass

    def refund(self, transaction_id: str, amount: float) -> bool:
        # Code to process a refund with Stripe
        pass

class SquareGateway(PaymentGateway):
    def charge(self, amount: float, token: str) -> str:
        # Code to process a charge with Square
        pass

    def refund(self, transaction_id: str, amount: float) -> bool:
        # Code to process a refund with Square
        pass

class PayPalGateway(PaymentGateway):
    def charge(self, amount: float, token: str) -> str:
        # Code to process a charge with PayPal
        pass

    def refund(self, transaction_id: str, amount: float) -> bool:
        # Code to process a refund with PayPal
        pass
```
