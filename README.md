# StudyBuddy Backend API

## Overview
This repository contains the Node.js, Express and MongoDB backend for **StudyBuddy**.  
It provides authentication, project management, course and task tracking, Pomodoro session recording, and timetable endpoints for the StudyBuddy frontend.

## Related Links

- **Backend API:** Deployed Backend URL
- **Frontend Application:** Deployed Frontend URL
- **Frontend Repository:** Frontend Github Repository URL

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- dotenv
- Morgan
- CORS
- Cloudinary middleware

## Features
- User registration
- User login and authentication
- Authentication middleware
- CRUD API endpoints for projects, sessions, timetable, courses, and tasks
- Request handling with JSON support
- CORS support for frontend integration
- Cloudinary middleware support for file uploads

## Project Structure
```text
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── tests/
├── app.js
└── server.js
```

### Folder Responsibilities

| Folder        | Purpose                                         |
| ------------- | ----------------------------------------------- |
| `config`      | Database and application configuration          |
| `controllers` | HTTP request and response handling              |
| `middleware`  | Authentication, validation and error middleware |
| `models`      | Mongoose schemas and models                     |
| `routes`      | Express route definitions                       |
| `tests`       | Automated tests                                 |
| `app.js`      | Express application configuration               |
| `server.js`   | Database connection and server startup          |

## Getting Started

### Prerequisites

Install:

- node.js
- MongoDB locally or a MongoDB Atlas account

## Installation

### 1. Clone the repository

```bash
git clone BACKEND_REPOSITORY_URL
cd STUDYBUDDY_BACKEND_REPOSITORY_NAME
```

### 2. Install dependencies

```bash
npm i
```

### 3. Create the environment file

Create `.env` in the root directory:

```env
PORT=3000
MONGODB_URI=your-connection-string
CLIENT_URL=http://localhost:5173
JWT_SECRET=unique-password-no-one-would-guess
```

### 4. Start the development server

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:3000
```

## Database Models

### User
| Field       | Type   | Rules                       |



## Entity Relationships

Add your ERD image here:

## API Base URL

Local development:

```text
http://localhost:3000
```

Production:

```text
https://your-deployed-api.com
```

## Endpoints

### Auth

| Method | Endpoint       | Access | Description       |
| ------ | -------------- | ------ | ----------------- |
| `POST` | `/auth/register` | Public | Register user     |
| `POST` | `/auth/login`    | Public | Login user        |
| `POST` | `/auth/logout`   | Public | Logout user       |

### Projects

| Method   | Endpoint                  | Access        | Description           |
| -------- | ------------------------- | ------------- | --------------------- |
| `GET`    | `/projects`               | Authenticated | Get all projects      |
| `GET`    | `/projects/:projectId`    | Authenticated | Get project details   |
| `POST`   | `/projects`               | Authenticated | Create a project      |
| `PUT`  | `/projects/:projectId`    | Authenticated | Update a project      |
| `DELETE` | `/projects/:projectId`    | Authenticated | Delete a project      |

### Sessions

| Method | Endpoint         | Access        | Description                 |
| ------ | ---------------- | ------------- | --------------------------- |
| `GET`  | `/sessions`      | Authenticated | Get all study sessions      |
| `POST` | `/sessions`      | Authenticated | Create a new session        |
| `GET`  | `/sessions/:id`  | Authenticated | Get session details         |
| `PUT`| `/sessions/:id`  | Authenticated | Update session              |
| `DELETE`| `/sessions/:id` | Authenticated | Delete session              |

### Timetable

| Method   | Endpoint              | Access        | Description             |
| -------- | --------------------- | ------------- | ----------------------- |
| `GET`    | `/timetable`          | Authenticated | Get timetable entries   |
| `POST`   | `/timetable`          | Authenticated | Create timetable entry  |
| `GET`    | `/timetable/:id`      | Authenticated | Get timetable entry     |
| `PUT`  | `/timetable/:id`      | Authenticated | Update timetable entry  |
| `DELETE` | `/timetable/:id`      | Authenticated | Delete timetable entry  |

### Courses

| Method   | Endpoint              | Access        | Description              |
| -------- | --------------------- | ------------- | ------------------------ |
| `GET`    | `/courses`            | Authenticated | Get all courses         |
| `GET`    | `/courses/:id`        | Authenticated | Get course details      |
| `POST`   | `/courses`            | Authenticated | Create a course         |
| `PUT`  | `/courses/:id`        | Authenticated | Update a course         |
| `DELETE` | `/courses/:id`        | Authenticated | Delete a course         |

### Tasks

| Method   | Endpoint                    | Access        | Description             |
| -------- | --------------------------- | ------------- | ----------------------- |
| `GET`    | `/tasks`                    | Authenticated | Get all tasks           |
| `GET`    | `/tasks/:id`                | Authenticated | Get task details        |
| `POST`   | `/tasks`                    | Authenticated | Create a task           |
| `PUT`  | `/tasks/:id`                | Authenticated | Update a task           |
| `DELETE` | `/tasks/:id`                | Authenticated | Delete a task           |

## Status Codes

| Status | Meaning in this API                |
| -----: | ---------------------------------- |
| `200`  | Successful request                 |
| `201`  | Resource created                   |
| `400`  | Invalid request                    |
| `401`  | Authentication required or invalid |
| `403`  | Authenticated but not permitted    |
| `404`  | Resource not found                 |
| `409`  | Resource conflict                  |
| `500`  | Unexpected server error           |

## Testing

Run tests:

```bash
npm test
```
Tests should use a dedicated test database or an in-memory database.

## Future Enhancements


## Team Members

| Name         | GitHub           | Responsibilities       |
| ------------ | ---------------- | ---------------------- |
| Walaa Ahmed | [GitHub profile] |        |
| Hoor Yousif | [GitHub profile] |             |

## Credits
