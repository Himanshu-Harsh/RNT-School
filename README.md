<div align="center">
  <img src="https://img.icons8.com/color/150/000000/school.png" alt="School Icon" width="100"/>
  <h1>School Management System ERP</h1>
  <p><b>Advanced Full-Stack Educational Platform with Razorpay Fee Integration</b></p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS">
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
    <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
    <img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF" alt="Razorpay">
  </p>
</div>

<br/>

## 🏫 Overview

This **School Management System** is an end-to-end full-stack ERP web application that digitizes the entire administrative and academic workflow of an educational institute. 

Built with an ultra-modern, responsive UI architecture and powered by a highly secure Node.js relational database backend, this platform empowers Administrators, Teachers, and Students to handle everything from live attendance tracking to completely automated, cryptographically secure online fee transactions.

---

## ✨ Key Features

- **Role-Based Unified Architectures**: Dedicated dynamic dashboards for Admins, Teachers, and Students, automatically restricting data access via secure JSON Web Tokens (JWT).
- **Automated Fee Collection**: End-to-end integration with the **Razorpay Payment Gateway**, allowing parents and students to settle outstanding academic dues securely online with real-time MySQL receipt generation.
- **Academic Ecosystem**: Live tracking of Student Attendance, Notice Boards, Examination Results, Timetables, and Syllabus Assignments.
- **Premium Radix UI Dashboard**: A sleek, user-centric interface featuring responsive glassmorphism, instant Dark Mode toggling, and interactive dynamic metrics.
- **Employee & Asset Ledger**: Admins can securely monitor Staff Salaries, School Expenses, and Transportation (Bus Routing) details.

---

## 🚀 Quick Start

Ensure you have **Node.js** and **MySQL** (via XAMPP or native) installed on your machine.

### 1. Database Setup (MySQL)
1. Launch XAMPP and start **Apache** and **MySQL**.
2. Open phpMyAdmin (`http://localhost/phpmyadmin`) and create a new database named `school`.
3. Import the `school.sql` schema files found in the project.

### 2. Backend Setup
Navigate into the `school_backend` folder to set up the server:
```bash
cd school_backend
npm install
```

Configure your `.env` file with your Razorpay and Database credentials:
```env
PORT=5000
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=school
JWT_SECRET=your_super_secret_jwt_key
RAZORPAY_KEY_ID=rzp_test_YOURKEY
RAZORPAY_KEY_SECRET=YOURSECRET
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window and navigate into the React application:
```bash
cd school_frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173/` and log in to explore the dashboard!

> [!TIP]
> **Razorpay Test Mode:** When testing payments under the `My Fees` section, you can safely use Mock Netbanking (SBI -> Success) or use the Razorpay Domestic Mock Cards (e.g., `5200 0000 0000 0000`) without risking live transactions!

---

## 🗄️ File Structure

<details>
<summary><b>Click to expand: Master Directory Map</b></summary>
<br/>

```text
📁 school-management-system/
├── 📄 .gitignore                 # Enforces security over API keys
├── 📄 README.md                  # Project Documentation
│
├── 📁 school_backend/            # Node.js + Express API Server
│   ├── 📁 config/                # MySQL DB Connectors
│   ├── 📁 controllers/           # Application logic (Fees, Attendance, Payment)
│   ├── 📁 middleware/            # JWT authorization and caching protections
│   ├── 📁 routes/                # External REST API endpoints
│   ├── 📄 server.js              # Application entry point
│   └── 📄 .env                   # Secret Vault (Ignored by Git)
│
└── 📁 school_frontend/           # React + Vite Client
    ├── 📁 src/
    │   ├── 📁 components/        # Reusable Tailwind/Radix UI assets
    │   ├── 📁 pages/             # Major dashboard views (MyFees, Settings, Results)
    │   ├── 📁 layouts/           # Sidebar & Header structural outlines
    │   └── 📄 App.tsx            # Component Router
    └── 📄 tailwind.config.js     # Global design system configuration
```

</details>

<br/>

<div align="center">
  <sub>Engineered by Harsh. Do not use actual credit cards during Developer Testing modes!</sub>
</div>
