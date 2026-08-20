# StudyBuddy Backend API

## Overview
This repository contains the Node.js, Express and MongoDB backend for **StudyBuddy**.  
It provides authentication, project management, course and task tracking, Pomodoro session recording, and timetable endpoints for the StudyBuddy frontend.

## Related Links

- **Backend API:** [Deployed Backend URL](https://studybuddy-backend-xvhe.onrender.com)
- **Frontend Application:** Deployed Frontend URL
- **Frontend Repository:** [Frontend Github Repository URL](https://github.com/HoorHasan30/StudyBuddy-Frontend)

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
├── public/
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
| `public`       | ERD image and other static assets                          
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
git clone https://github.com/HoorHasan30/StudyBuddy-Backend
cd StudyBuddy-Backend
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
| Field          | Type   | Rules                                |
|----------------|--------|--------------------------------------|
| username       | String | required, unique, trimmed, lowercase |
| hashedPassword | String | required                             |

### Project
| Field         | Type       | Rules     |
|---------------|------------|-----------|
| title         | String     | required  |
| description   | String     | optional  |
| deadline      | Date       | optional  |
| owner         | ObjectId   | ref: User |
| collaberators | [ObjectId] | ref: User |
| tasks         | [ObjectId] | ref: Task |

### Course
| Field       | Type       | Rules             |
|-------------|------------|-------------------|
| title       | String     | required, trimmed |
| description | String     | optional, trimmed |
| owner       | ObjectId   | ref: User         |
| tasks       | [ObjectId] | ref: Task         |

### Task
| Field    | Type     | Rules                                        |
|----------|----------|----------------------------------------------|
| title    | String   | required                                     |
| deadline | Date     | required                                     |
| priority | String   | required                                     |
| status   | String   | required, default 'To Do', enum: To Do/Done  |
| owner    | ObjectId | ref: User                                    |

### Session
| Field    | Type     | Rules     |
|----------|----------|-----------|
| duration | Number   | required  |
| owner    | ObjectId | ref: User |

### TimeTable
| Field          | Type     | Rules     |
|----------------|----------|-----------|
| tableImage.url | String   | optional  |
| owner          | ObjectId | ref: User |

## Entity Relationships
![ERD image](/public/images/Project3.drawio%20(final).png)



## API Base URL

Local development:

```text
http://localhost:3000
```

Production:

```text
https://studybuddy-backend-xvhe.onrender.com
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

- Notification system for task deadlines and reminders
- Calendar page management
- Progress tracking across courses and projects 
- Task assignment within courses


## Team Members

| Name        | GitHub                                              | Responsibilities                                                                 |
| ----------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| Walaa Idrees | [GitHub profile](https://github.com/WA-2211)         | Session, Timetable, and Course features; cross-team bug fixes                     |
| Hoor Yousif | [GitHub profile](https://github.com/HoorHasan30/)    | Project and Task features; cross-team bug fixes                                   |

## Credits

- [nayaba/upload-images-multer-cloudinary](https://github.com/nayaba/upload-images-multer-cloudinary) — reference for Multer + Cloudinary image upload setup
- [YouTube tutorial](https://youtu.be/Rw_QeJLnCK4) — reference for backend/auth implementation
- [YouTube tutorial](https://youtu.be/rhWG5KbLwVs) — reference for backend/auth implementation
- General Assembly Software Engineering Immersive — project guidelines and mentorship