# Database Schema

## Overview

The system stores data in four main collections:

- Users
- Sales
- Financial Transactions
- Withdrawals

Each collection is responsible for storing a specific part of the system.

---

## 1. Users

Stores information about affiliate users.

| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique user id |
| name | String | User name |

### Relationships

- One User → Many Sales
- One User → Many Financial Transactions
- One User → Many Withdrawals

---

## 2. Sales

Stores every affiliate sale.

| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique sale id |
| userId | ObjectId | Reference to User |
| brand | String | Brand name |
| earning | Number | Sale earnings |
| status | String | pending, approved, rejected |
| advancePaid | Number | Advance payout amount |
| isAdvancePaid | Boolean | Prevents duplicate advance payouts |

### Relationships

- Many Sales → One User
- One Sale → Many Financial Transactions

---

## 3. Financial Transactions

Stores every movement of money.

| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique transaction id |
| userId | ObjectId | Reference to User |
| saleId | ObjectId | Related sale |
| type | String | Transaction type |
| amount | Number | Transaction amount |
| createdAt | Date | Transaction time |

### Relationships

- Many Transactions → One User
- Many Transactions → One Sale

---

## 4. Withdrawals

Stores withdrawal requests.

| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique withdrawal id |
| userId | ObjectId | Reference to User |
| amount | Number | Withdrawal amount |
| status | String | Withdrawal status |
| requestedAt | Date | Withdrawal request time |

### Relationships

- Many Withdrawals → One User

---

## Indexes

### Sales

- userId
- status

### Financial Transactions

- userId
- saleId

### Withdrawals

- userId
- requestedAt