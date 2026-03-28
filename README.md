# 🏦 Banking Transaction Ledger Backend

A robust and scalable backend system for managing **banking transactions, ledger entries, and secure authentication**.
Built with a focus on **data integrity, financial accuracy, and production-level architecture**.

---

## 🚀 Features

* 🔐 **Authentication & Authorization (JWT)**
* 🚫 **Token Blacklisting (Secure Logout)**
* 💸 **Transaction Management (Transfer, Deposit)**
* 📘 **Double-entry Ledger System**
* 🔁 **Idempotency Support (Duplicate-safe APIs)**
* ⚡ **MongoDB Transactions (Atomic Operations)**
* 🧠 **Balance derived from Ledger (Audit-safe)**
* 🛡️ **Validation & Error Handling**

---

## 🧩 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Security:** Token Blacklisting, Idempotency Keys

---

## 📂 Project Structure

```
src/
│
├── controllers/        # Business logic
├── models/             # Mongoose schemas
├── routes/             # API routes
├── middlewares/        # Auth, validation
├── config/             # DB connection
└── utils/              # Helper functions
```

---

## 🔐 Authentication Flow

1. User logs in → receives JWT
2. Token is sent with each request
3. Middleware verifies token
4. Blacklist check prevents reuse of invalid tokens

---

## 💸 Transaction Flow

1. Validate sender & receiver accounts
2. Check sufficient balance
3. Create transaction record
4. Create ledger entries:

   * DEBIT (sender)
   * CREDIT (receiver)
5. Commit using MongoDB transaction

---

## 📘 Ledger System (Core Concept)

* Every transaction creates **2 ledger entries**
* Balance is **derived from ledger**, not stored blindly
* Ensures:

  * ✔ Accuracy
  * ✔ Auditability
  * ✔ Fraud prevention

---

## 🔁 Idempotency (Duplicate Protection)

Prevents duplicate transactions:

```
Idempotency-Key: unique_key
```

* Same key → same response
* No duplicate transactions

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

⚠️ Never commit `.env` to GitHub

---

## ▶️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ujjwalsingh1704/BankingTransactionledger-Backend.git
cd BankingTransactionledger-Backend
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Run the server

```bash
npm run dev
```

---

## 📡 API Endpoints (Sample)

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | /auth/register        | Register user       |
| POST   | /auth/login           | Login user          |
| POST   | /account              | Create account      |
| POST   | /transaction/transfer | Transfer money      |
| GET    | /account/:accountId   | Get account details |

---

## 🛡️ Security Features

* JWT Authentication
* Token Blacklisting
* Input Validation
* Idempotency Keys
* Secure Environment Variables

---

## 💡 Future Improvements

* 🔄 Refresh Tokens
* 📊 Transaction Analytics
* 💳 Payment Gateway Integration
* 🚀 Deployment (Docker, AWS)

---

## 👨‍💻 Author

**Ujjwal Singh**

---

## ⭐ Contribution

Feel free to fork, contribute, and improve the project!

---

## 📜 License

This project is licensed under the **MIT License**
