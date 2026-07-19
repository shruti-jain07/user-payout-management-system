# Low-Level Design (LLD)

## 1. Architecture Overview

This project follows a "Layered Architecture".

Each layer has a specific responsibility, making the code easier to understand, maintain, and extend.

The application is divided into the following layers:

- Controller Layer
- Service Layer
- Repository Layer
- Database Layer

### Controller Layer

- Receives API requests.
- Validates the request.
- Calls the required service.
- Returns the response to the client.

### Service Layer

This layer contains all the business logic of the system.

Responsibilities include:

- Processing advance payouts.
- Reconciling sales.
- Calculating final payouts.
- Processing withdrawals.
- Recovering failed payouts.

### Repository Layer

This layer is responsible for interacting with the database.

Responsibilities include:

- Creating records.
- Fetching records.
- Updating records.
- Saving changes made by the service layer.

No business logic is written in this layer.

### Database Layer

Stores all the application data.

Main data stored in the database includes:

- Users
- Sales
- Financial Transactions
- Withdrawals

---

## 2. Why Layered Architecture?

I chose Layered Architecture because:

- It separates business logic from database operations.
- Each layer has a single responsibility.
- It makes the code easier to read and maintain.
- It is simple and fits the scope of this assignment.

---

## 3. Domain Model

The system revolves around four main business entities.

### 3.1 User

Represents an affiliate user who earns commission through sales.

A user can:

- Have multiple sales.
- Receive advance and final payouts.
- Initiate withdrawals.
- Have multiple financial transactions.

---

### 3.2 Sale

Represents a sale made by a user.

A sale contains:

- User information.
- Brand information.
- Sale status.
- Earnings.

Every sale starts with the "PENDING" status.

Later, an admin reconciles the sale by changing its status to either:

- APPROVED
- REJECTED

A sale is also responsible for tracking whether its advance payout has already been processed.

---

### 3.3 Financial Transaction

Represents every movement of money in the system.

Examples include:

- Advance payout
- Final payout
- Recovery adjustment
- Failed payout recovery

Instead of changing user balances directly, every money movement is recorded as a transaction.

This provides a complete financial history.

---

### 3.4 Withdrawal

Represents a withdrawal request made by a user.

A withdrawal stores:

- Requested amount.
- Withdrawal status.
- Request time.

It is also used to enforce the rule that a user can make only one withdrawal every 24 hours.

---

## 4. Entity Relationships

The relationships between the main entities are as follows.

### User → Sale (One-to-Many)

- One user can have multiple sales.
- Every sale belongs to exactly one user.

Example:

User A
- Sale 1
- Sale 2
- Sale 3

---

### User → Financial Transaction (One-to-Many)

- One user can have multiple financial transactions.
- Every financial transaction belongs to one user.

Examples of transactions include:

- Advance Payout
- Final Payout
- Recovery Adjustment
- Failed Payout Recovery

---

### User → Withdrawal (One-to-Many)

- One user can create multiple withdrawal requests over time.
- Every withdrawal belongs to one user.

The system ensures that only one withdrawal can be initiated within a 24-hour period.

---

### Sale → Financial Transaction (One-to-Many)

- One sale can generate multiple financial transactions during its lifecycle.
- Every financial transaction is associated with one sale.

For example:

Sale
    - Advance Payout
    - Final Payout
    - Recovery Adjustment (if rejected)
This relationship helps maintain a complete history of all payout activities related to a sale.

---

# 5. Entity Design

## 5.1 User

Represents an affiliate user who earns commission through sales.

### Responsibilities

- Owns multiple sales.
- Receives payouts.
- Initiates withdrawals.

### Attributes

| Attribute | Description |
|-----------|-------------|
| _id | Unique identifier of the user |
| name | Name of the user |
|withdrawableBalance| Credit the failed payout amount back into the user's withdrawable balance|
|lastWithdrawalAt| to check last withdrawal |
|timestamps|

---

## 5.2 Sale

Represents a sale made by a user.

### Responsibilities

- Stores sale details.
- Tracks sale status.
- Determines advance payout eligibility.
- Used for final payout calculation.

### Attributes

| Attribute | Description |
|-----------|-------------|
| _id | Unique identifier of the sale |
| userId | User who owns the sale |
| brand | Brand associated with the sale |
| earning | Commission earned from the sale |
| status | PENDING, APPROVED, REJECTED |
|advanceAmount | Needed later during reconciliation.|
| advancePaid | Advance payout amount for this sale |
| isAdvancePaid | Indicates whether advance payout has already been processed |
|reconciledAt|Indicates when reconciliation happened|
|timestamps|
---

## 5.3 Financial Transaction

Represents every movement of money in the system.

### Responsibilities

- Records every payout-related transaction.
- Maintains complete financial history.

### Attributes

| Attribute | Description |
|-----------|-------------|
| _id | Unique identifier of the transaction |
| userId | User associated with the transaction |
| saleId | Related sale |
| type | ADVANCE_PAYOUT, FINAL_PAYOUT, RECOVERY_ADJUSTMENT, FAILED_PAYOUT_RECOVERY |
| amount | Transaction amount |
| timestamps |

---

## 5.4 Withdrawal

Represents a withdrawal request created by the user.

### Responsibilities

- Stores withdrawal details.
- Tracks withdrawal status.
- Supports failed payout recovery.

### Attributes

| Attribute | Description |
|-----------|-------------|
| _id | Unique identifier |
| userId | User requesting withdrawal |
| amount | Requested withdrawal amount |
| status | PENDING, SUCCESS, FAILED, CANCELLED, REJECTED |
| timestamps |

---

# 6. Service Design

The Service Layer contains all the business logic of the application. Each service is responsible for a specific part of the system.

## 6.1 Sale Service

Handles all operations related to sales.

### Responsibilities

- Create a new sale.
- Get sale details.
- Update sale status during reconciliation.

---

## 6.2 Payout Service

Handles all payout-related business logic.

### Responsibilities

- Process advance payouts for eligible pending sales.
- Ensure advance payout is processed only once per sale.
- Skip sales that are not in the PENDING state.
- Calculate final payout after reconciliation.
- Create recovery adjustments for rejected sales.
- Record all payout transactions.

---

## 6.3 Withdrawal Service

Handles user withdrawals.

### Responsibilities

- Process withdrawal requests.
- Check available withdrawable balance.
- Enforce the one-withdrawal-per-24-hours rule.
- Update withdrawal status.

---

## 6.4 Recovery Service

Handles failed payout recovery.

### Responsibilities

- Detect failed, cancelled, or rejected withdrawals.
- Credit the failed amount back to the user's withdrawable balance.
- Record the recovery transaction.

---

# 7. Workflow

## 7.1 Advance Payout Workflow

1. A user makes a sale.
2. The sale is created with the "PENDING" status.
3. The system checks whether the sale is eligible for an advance payout.
4. If eligible and not already processed:
   - Calculate 10% of the sale earnings.
   - Create an Advance Payout transaction.
   - Mark the sale as advance payout processed.

---

## 7.2 Sale Reconciliation Workflow

1. An admin reviews a pending sale.
2. The sale status is updated to either:
   - APPROVED
   - REJECTED

### If Approved

- Calculate the remaining payout. (Earning − Advance Paid).
- Create a Final Payout transaction.
- Create a Final Payout transaction.

### If Rejected

- Create a Recovery Adjustment transaction with the amount equal to the advance already paid.

---

## 7.3 Withdrawal Workflow

1. User requests a withdrawal.
2. The system checks:
   - Is there enough withdrawable balance?
   - Has the user already withdrawn in the last 24 hours?
3. If all validations pass:
   - Create a withdrawal request.
   - Update the withdrawal status after processing.

---

## 7.4 Failed Payout Recovery Workflow

1. A processed withdrawal later becomes:
   - FAILED
   - CANCELLED
   - REJECTED
2. The system credits the withdrawn amount back to the user's withdrawable balance.
3. A recovery transaction is created.
4. The user can initiate another withdrawal for that amount.

# 8. Class Design

## 8.1 User

### Responsibility

Represents an affiliate user who owns sales, receives payouts, and initiates withdrawals.

### Methods

- createUser()
- getUserById()
- updateUser()
- updateWithdrawableBalance()
---

## 8.2 Sale

### Responsibility

Represents a sale and maintains its payout lifecycle.

### Methods
- createSale()
- getSaleById()
- updateSale()
- getEligibleSalesForAdvancePayout()


---

## 8.3 FinancialTransaction

### Responsibility

Represents every financial movement and maintains the transaction history.

### Methods

- createTransaction()

---

## 8.4 Withdrawal

### Responsibility

Represents a user's withdrawal request and tracks its lifecycle.

### Methods
- createWithdrawal()
- getWithdrawalById()
- updateWithdrawal()

---

## 8.5 SaleService

### Responsibility

Handles all operations related to sales.

### Methods

- createSale() → Sale
- getSaleById() → Sale
- reconcileSale() → Sale
- getEligibleSalesForAdvancePayout()→sale
---

## 8.6 PayoutService

### Responsibility

Handles all payout-related business logic.

### Methods

- processAdvancePayout() → FinancialTransaction
- processFinalPayout() → FinancialTransaction
- createRecoveryAdjustment() → FinancialTransaction

---

## 8.7 WithdrawalService

### Responsibility

Handles withdrawal requests and enforces withdrawal rules.

### Methods

- createWithdrawal() → Withdrawal
- processWithdrawal() → Withdrawal

---

## 8.8 RecoveryService

### Responsibility

Handles failed payout recovery by restoring the withdrawn amount to the user's withdrawable balance.

### Methods

- recoverFailedPayout() → FinancialTransaction

# 9. Design Principles

The design follows these principles:

- Single Responsibility Principle (SRP)
- Separation of Concerns
- Layered Architecture
- Ledger-based transaction recording for financial consistency