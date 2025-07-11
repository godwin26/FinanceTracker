# FinanceTracker

# 💸 Personal Finance Tracker

A simple full-stack web application to manage personal finances. Track income and expenses, set monthly budgets, and view summaries — built using **Spring Boot** and **ReactJS**.

---

## 🔧 Tech Stack

- **Frontend**: ReactJS
- **Backend**: Spring Boot (Java), Spring Security with JWT
- **Database**: MySQL
- **Tools**: Axios, Postman

---

## 🚀 How to Run

### Backend (Spring Boot)
1. Clone the repo and navigate to the backend folder:
   cd backend
2. Create a MySQL database named finance_db.

3. Update application.properties with your DB credentials.

Run the app:
./mvnw spring-boot:run

Frontend (React)
1. Open a new terminal and navigate to the frontend folder:
   cd frontend
2. Install dependencies:
   npm install
3. Start the frontend: 
   npm run dev

✨ Features
User Registration & Login (JWT Auth)
Add / Edit / Delete Transactions
Filter by Type / Date / Category
Monthly Budget & Summary View

📌 Notes
React runs on http://localhost:5173
Spring Boot runs on http://localhost:8080
All API routes are secured and require a valid JWT token

