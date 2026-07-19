# User Payout Management System

A Low-Level Design (LLD) implementation of a system that manages user payouts for affiliate sales.

The system handles:
- Advance payout processing for pending sales
- Sale reconciliation
- Final payout calculation
- User withdrawal management
- Failed payout recovery workflow

Implemented using Node.js, Express.js, and MongoDB.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript (ES6)

---
## Architecture

The project follows a layered architecture:
Responsibilities:

- Controllers handle API requests and responses
- Services contain business logic
- Repositories manage database operations
- MongoDB stores application data

---


---

## Documentation

Detailed design documentation is available here:
Controller Layer
|
|
Service Layer
|
|
Repository Layer
|
|
Database Layer

src
|
├── controllers
├── services
├── repositories
├── models
├── routes
├── config
└── app.js

docs
├── 01-problem-understanding.md
├── 02-lld.md
├── 03-database-schema.md
├── 04-api-design.md

diagrams 
├── advance-payout-workflow.png
├── system-architecture.png
├── failed-payout-recovery.png

---


## Setup Instructions

## Install Dependencies
npm install

## create a .env file
PORT=3000
MONGODB_URI=your_mongodb_connection_string

## Run Application 
npm run dev

## API Testing
postman\user_payout_management_system.postman_collection.json

### Clone Repository

```bash
git clone (https://github.com/shruti-jain07/user-payout-management-system.git)
---

