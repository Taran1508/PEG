# UDBHAVX

## Project Overview

This project is a MERN-based authentication system that allows users to register and log in as different roles (Student, Investor, Company) while handling authentication securely.

## Features

- **User Registration and Authentication**: Users can register and log in based on their role (Student, Investor, Company).
- **Role-based Access Control**: Users will have role-based access, each role having different access permissions.
- **Secure Password Handling**: Passwords are hashed using bcryptjs for secure storage.
- **JWT-based Authentication**: JSON Web Tokens (JWT) are used for session management and user authentication.
- **RESTful API**: The backend is built with Express.js, MongoDB, and uses JSON Web Tokens for authentication.

## Tech Stack

- **Frontend**:
  - React
  - React Router DOM
  - React Scripts
- **Backend**:
  - Node.js
  - Express.js
  - Mongoose
  - concurrently
  - JSON Web Tokens (JWT)
  - Express Validator
  - CORS
- **Database**:
  - MongoDB
- **Authentication**:
  - JWT-based authentication

## Installation & Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js & npm**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/docs/manual/installation/)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name

```

### Setup Frontend
```bash
cd frontend
npm install
npm start
```

### Setup Backend
```bash
cd backend
npm install
npm start
```

### Run Full Stack Application

To start both frontend and backend concurrently:
```bash
npm run dev
```

## API Endpoints

### Authentication

#### Login

Method       | Endpoint            | Description
-------------|---------------------|----------------------------------------------------
POST         | /login/student      | Login as a Student
POST         | /login/investor     | Login as an Investor
POST         | /login/company      | Login as a Company

#### Registration

Method       | Endpoint            | Description
-------------|---------------------|----------------------------------------------------
POST         | /register/student   | Register a new Student
POST         | /register/investor  | Register a new Investor
POST         | /register/company   | Register a new Company

### Frontend Route Handling

Method       | Endpoint            | Description
-------------|---------------------|----------------------------------------------------
GET          | /login/student      | Render login page for Student
GET          | /login/investor     | Render login page for Investor
GET          | /login/company      | Render login page for Company
GET          | /register/student   | Render registration page for Student
GET          | /register/investor  | Render registration page for Investor
GET          | /register/company   | Render registration page for Company

## Folder Structure
```
mern-auth-system/
│
├── .env             # Environment variables
├── package.json     # NPM dependencies
├── frontend/        # React frontend
├── backend/         # Express backend
   ├── controllers/     # Controller functions for handling requests
   ├── routes/          # API routes
   ├── models/          # Database models
   └── server.js        # Main server file
└── README.md        # Readme File
```

## Environment Variables

Create a .env file in the backend directory and set up the following variables:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:5000
```

