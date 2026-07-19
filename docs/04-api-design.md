# API Design

The following APIs are designed based on the business requirements of the User Payout Management System.

---

# 1. Create Sale

**Endpoint**

```
POST /sales
```

### Purpose

Creates a new sale with the "PENDING" status.

### Request Body

```json
{
  "userId": "user123",
  "brand": "brand_1",
  "earning": 40
}
```

### Success Response

"201 Created"

```json
{
  "message": "Sale created successfully."
}
```

---

# 2. Get Sale

"Endpoint"

```
GET /sales/:saleId
```

### Purpose

Returns the details of a specific sale.

### Success Response

"200 OK"

```json
{
  "saleId": "...",
  "userId": "...",
  "brand": "brand_1",
  "earning": 40,
  "status": "PENDING"
}
```

---

# 3. Reconcile Sale

"Endpoint"

```
PATCH /sales/:saleId/reconcile
```

### Purpose

Updates a pending sale to either "APPROVED" or "REJECTED".

### Request Body

```json
{
  "status": "APPROVED"
}
```

or

```json
{
  "status": "REJECTED"
}
```

### Success Response

"200 OK"

```json
{
  "message": "Sale reconciled successfully."
}
```

---

# 4. Process Advance Payout

"Endpoint"

```
POST /payouts/advance
```

### Purpose

Processes advance payouts for all eligible pending sales.

### Success Response

"200 OK"

```json
{
  "message": "Advance payouts processed successfully."
}
```

---

# 5. Create Withdrawal

"Endpoint"

```
POST /withdrawals
```

### Purpose

Creates a withdrawal request for the user.

### Request Body

```json
{
  "userId": "user123",
  "amount": 100
}
```

### Success Response

"201 Created"

```json
{
  "message": "Withdrawal request created successfully."
}
```

---

# 6. Get Withdrawal

"Endpoint"

```
GET /withdrawals/:withdrawalId
```

### Purpose

Returns the details of a withdrawal request.

### Success Response

"200 OK"

```json
{
  "withdrawalId": "...",
  "amount": 100,
  "status": "PENDING"
}
```

---

# 7. Update Withdrawal Status

"Endpoint"

```
PATCH /withdrawals/:withdrawalId/status
```

### Purpose

Updates the withdrawal status.

This endpoint is also responsible for handling failed payout recovery.

### Request Body

```json
{
  "status": "SUCCESS"
}
```

or

```json
{
  "status": "FAILED"
}
```

or

```json
{
  "status": "CANCELLED"
}
```

or

```json
{
  "status": "REJECTED"
}
```

### Success Response

**200 OK**

```json
{
  "message": "Withdrawal status updated successfully."
}
```