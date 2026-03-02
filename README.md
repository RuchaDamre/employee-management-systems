# Employee Management System

A full-stack Employee Management System designed for admin users to efficiently manage employee data through a clean, responsive, and accessible interface.

# ✨ Key Features

Secure admin authentication using JWT (JSON Web Token)

Password encryption using BCrypt

Employee management with full CRUD operations

RESTful API architecture

Searchable and paginated employee data

Responsive, mobile-first UI

Role-based secure endpoints

# 🛠️ Tech Stack

Frontend: React, Next.js, TypeScript, Tailwind CSS
Backend: Spring Boot, Spring Security, JWT, BCrypt Password Encoder
Database: PostgreSQL

# 🏗️ Architecture

Frontend (Next.js) → REST APIs → Spring Boot Backend → PostgreSQL Database

Authentication Flow:

Admin logs in with email & password

Backend validates credentials

JWT token is generated

Token is sent in Authorization header for secured APIs

# 🚀 Getting Started
Prerequisites

Node.js (v18+ recommended)

Java 17+

Maven

PostgreSQL

# Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/employee-management-system.git
2️⃣ Backend Setup (Spring Boot)

Navigate to backend folder:
cd backend

Update application.properties with your PostgreSQL configuration:
spring.datasource.url=jdbc:postgresql://localhost:5432/ems
spring.datasource.username=your_username
spring.datasource.password=your_password

Run the application:
mvn spring-boot:run

Backend runs on:
http://localhost:8080
3️⃣ Frontend Setup (Next.js)

Navigate to frontend folder:
cd frontend

Install dependencies:
npm install

Create .env.local file:
NEXT_PUBLIC_API_URL=http://localhost:8080

Start the development server:
npm run dev

Frontend runs on:
http://localhost:3000

# 🔐 Authentication

Admin users can securely log in using email and password credentials to access the management dashboard.
Admin Email - admin@gmail.com
Admin Password - admin123

# 📌 Project Highlights

Modular React component architecture for scalability

Clean UI built with Tailwind CSS

Real-world admin panel use case

# 👩‍💻 Author

Rucha Damre
Fullstack Developer | React + Java

📧 Email: ruchadamre2000@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/rucha-damre-23392119a/
🐙 GitHub: https://github.com/RuchaDamre
