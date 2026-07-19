# Problem Understanding

## 1. What is this project?

This project is about building a **User Payout Management System** for affiliate sales.

The project consists of two parts:

- Managing advance payouts, final payouts, reconciliation, and withdrawals.
- Recovering failed payouts by crediting the amount back to the user's withdrawable balance.

When a user makes a sale, the sale does not become successful immediately. It first goes into a "Pending" state.

Instead of making the user wait until the sale is verified, the system gives an "Advance Payout" equal to "10% of the sale earnings".

Later, an admin reviews the sale and changes its status to either:

- Approved
- Rejected

Based on the final status, the system calculates how much money the user should actually receive.

The system also allows users to withdraw their available payout while making sure they can withdraw only once every 24 hours.

If a payout fails, gets cancelled, or is rejected, the withdrawn amount should be returned to the user's withdrawable balance so they can withdraw it again.

---

## 2. Business Flow

The overall flow of the system is:
Sale Created
      |
      ▼
Status = Pending
      │
      ▼
Advance Payout (10%)
      │
      ▼
Admin Reconciliation
      │
      ├──────────────┐
      ▼              ▼
 Approved        Rejected
      │              │
      ▼              ▼
Remaining       Recover Advance
Payout          from Future Payout
      │
      ▼
User Withdrawal
      │
      ▼
If Withdrawal Fails
      │
      ▼
Credit Amount Back

---

## 3. Business Rules

### Advance Payout

- Every pending sale is eligible for an advance payout.
- Advance payout is always "10% of the sale earnings".
- A sale should receive an advance payout only once, even if the payout process runs multiple times.

---

### Sale Reconciliation

An admin verifies every pending sale.

After verification, the sale status becomes either:

- Approved
- Rejected

---

### Final Payout

If the sale is approved:

Final Payout = Earnings − Advance Paid

Example:

- Earnings = ₹30
- Advance Paid = ₹3

Final Payout = ₹27

If the sale is rejected:

The advance payout should be recovered from the user's future payouts.

Example:

- Earnings = ₹50
- Advance Paid = ₹5

Adjustment = -₹5

---

### Withdrawal

- A user can withdraw only once in every 24 hours.

---

### Failed Payout Recovery (Question 2)

If a payout becomes:

- Failed
- Cancelled
- Rejected

The withdrawn amount should be added back to the user's withdrawable balance.

The user should be able to withdraw that amount again.

---

## 4. Assumptions Made

- Every sale belongs to one user.
- One user can have multiple sales.
- Every sale has a fixed earning amount.
- Sale status can change only during reconciliation.
- Advance payout is always 10% of the sale earnings.
- Users cannot withdraw more than their available withdrawable balance.

---

## 5. What the System Should Do

The system should be able to:

- Store users and their sales.
- Process advance payouts.
- Make sure the same advance payout is never processed twice.
- Reconcile pending sales.
- Calculate final payouts.
- Recover advance payouts for rejected sales.
- Allow users to withdraw available payouts.
- Restrict withdrawals to once every 24 hours.
- Recover failed payouts back into the user's withdrawable balance.
- Keep records of every payout-related transaction.

---

## 6. What We Want From the System

- Correct payout calculations.
- No duplicate advance payouts.
- Consistent financial records.
- Simple and maintainable design.
- Clear separation between different parts of the system.