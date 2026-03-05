# Task Manager - MVC CRUD Application

A full-stack CRUD application with **React** (frontend) and **Java Spring Boot** (backend).

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Java 17, Spring Boot 3.2, Spring Data JPA
- **Database**: H2 (in-memory)

## Project Structure

```
Spring_last_Day/
├── backend/          # Java Spring Boot API
│   └── src/main/java/com/crud/taskmanager/
│       ├── controller/  # REST endpoints
│       ├── model/       # Entity
│       ├── repository/  # JPA repository
│       └── service/     # Business logic
└── frontend/         # React SPA
    └── src/
        ├── components/
        └── App.jsx
```

## Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **Maven** (or use Maven wrapper if available)

### Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

API runs at: `http://localhost:8080`

Endpoints:
- `GET  /api/tasks`     - List all tasks
- `GET  /api/tasks/{id}` - Get task by ID
- `POST /api/tasks`     - Create task
- `PUT  /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Run Both

1. Start the backend first.
2. Then start the frontend.

The React app proxies API requests to the backend via Vite.

## Features

- Create, read, update, delete tasks
- Mark tasks as complete/incomplete
- Dark theme with modern CSS
- Responsive layout
- Error handling and loading states
