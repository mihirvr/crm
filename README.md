# Datastraw CRM — Customer Support Ticketing System

A full-stack, production-ready Customer Support CRM built for the Datastraw Engineering Assessment. It features live debounced searching, dynamic status filtering, and chronological ticket tracking.

🚀 **Live Demo:** [Insert Vercel URL Here]
📹 **Video Walkthrough:** [Insert Loom/YouTube Link Here]

## 🛠 Tech Stack
* **Backend:** Spring Boot 3 (Java 21), Spring Data JPA, Hibernate, Maven
* **Database:** PostgreSQL 15
* **Frontend:** React 18, Vite, React Router v6, Tailwind CSS v4
* **API Communication:** Axios with centralized configuration
* **UI/UX:** Lucide React (Icons), React Hot Toast (Notifications)

## ✨ Key Features
* **Priority-Based Routing:** Visual color-coding for High, Medium, and Low priority tickets.
* **Live Telemetry Dashboard:** Top-level metrics pulled from a custom `GET /api/tickets/stats` endpoint.
* **Debounced Search Engine:** Real-time table filtering across names, emails, and ticket IDs without overloading the API.
* **Chronological Internal Notes:** Timestamped communication logging for each specific ticket.
* **Production-Grade Error Handling:** `@ControllerAdvice` global exception interceptors on the backend and seamless toast notifications on the frontend.

## 🚀 Local Setup Instructions

### Prerequisites
* Java 21+ installed
* Node.js v18+ installed
* PostgreSQL installed and running locally

### 1. Database Setup
Create a new PostgreSQL database named `datastraw_crm`.

### 2. Backend Setup
```bash
cd backend
# Rename the example env file and insert your DB password
cp .env.example .env
./mvnw spring-boot:run