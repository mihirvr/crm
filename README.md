# SupportTicketing CRM

A production-ready Customer Support CRM designed for efficient ticket management, priority-based routing, and seamless team collaboration. The platform enables support teams to track customer issues, monitor ticket status in real time, maintain internal communication logs, and gain operational insights through a live dashboard.

## 🚀 Live Demo

**Application:** [Insert Vercel URL Here]

**Video Walkthrough:** [Insert Loom/YouTube Link Here]

---

## 📋 Overview

SupportTicketing CRM streamlines customer support workflows by providing a centralized platform for ticket creation, tracking, prioritization, and communication. Built with a modern React frontend and Spring Boot backend, the application delivers a responsive user experience while maintaining a scalable and robust architecture.

---

## ✨ Features

### 🎯 Priority-Based Ticket Routing
- Categorize tickets as High, Medium, or Low priority
- Visual color indicators for quick identification
- Improved workload management for support teams

### 📊 Live Dashboard Analytics
- Real-time ticket statistics
- Custom backend telemetry endpoint
- Instant visibility into support operations

### 🔍 Debounced Search System
- Real-time search functionality
- Filters across:
  - Customer names
  - Email addresses
  - Ticket IDs
- Optimized API calls using debouncing

### 📝 Internal Notes & Activity Tracking
- Chronological communication logs
- Timestamped ticket updates
- Centralized ticket history

### ⚡ Dynamic Status Filtering
- Filter tickets by current status
- Faster navigation and ticket management
- Improved workflow efficiency

### 🛡 Robust Error Handling
- Global exception handling using Spring Boot `@ControllerAdvice`
- User-friendly frontend notifications
- Consistent API error responses

---

## 🏗 Tech Stack

### Backend
- Java 21
- Spring Boot 3
- Spring Data JPA
- Hibernate
- Maven

### Database
- PostgreSQL 15

### Frontend
- React 18
- Vite
- React Router v6
- Tailwind CSS v4

### API Communication
- Axios
- Centralized API configuration

### UI & User Experience
- Lucide React
- React Hot Toast

---

## 📁 Project Structure

```text
SupportTicketing-CRM/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following software is installed:

- Java 21 or higher
- Node.js 18 or higher
- PostgreSQL
- Maven (optional if using Maven Wrapper)

---

## ⚙ Database Setup

1. Open PostgreSQL.
2. Create a database named:

```sql
CREATE DATABASE crm_db;
```

---

## 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Copy the environment template:

```bash
cp .env.example .env
```

Update the database credentials inside the `.env` file.

Start the Spring Boot application:

```bash
./mvnw spring-boot:run
```

The backend server will start at:

```text
http://localhost:8080
```

Database tables will be automatically generated on startup.

---

## 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend application will be available at:

```text
http://localhost:5173
```

---

## 📡 API Highlights

### Ticket Statistics

```http
GET /api/tickets/stats
```

Returns dashboard metrics and ticket telemetry.

### Ticket Search

Supports dynamic searching across:

- Ticket ID
- Customer Name
- Customer Email

### Internal Notes

Add and retrieve chronological notes associated with individual tickets.

---

## 📸 Screenshots

Add application screenshots here.

### Dashboard

```text
Insert Screenshot
```

### Ticket Management

```text
Insert Screenshot
```

### Ticket Details & Notes

```text
Insert Screenshot
```

---

## 🔮 Future Improvements

- User authentication and role-based access control
- Email notifications for ticket updates
- File attachment support
- SLA tracking and escalation workflows
- Ticket assignment automation
- Advanced analytics and reporting

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Mihir Revaskar**

Built as a full-stack CRM solution focused on customer support operations, ticket lifecycle management, and scalable backend architecture.