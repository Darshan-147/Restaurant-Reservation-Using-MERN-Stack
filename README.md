# Restaurant Reservation System

This is a MERN (MongoDB, Express, React, Node.js) stack application for managing restaurant reservations.

## Table of Contents

- [Installation](#installation)
- [Backend](#backend)
  - [Environment Variables](#environment-variables)
  - [Starting the Backend Server](#starting-the-backend-server)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
  - [Environment Variables](#frontend-environment-variables)
  - [Starting the Frontend Server](#starting-the-frontend-server)
- [Error Handling](#error-handling)
- [Database Connection](#database-connection)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Darshan-147/Restaurant-Reservation-Using-MERN-Stack.git
   
2. Install dependencies for both backend and frontend:
    ```sh
    cd backend
    npm install
    cd ../frontend
    npm install

## Backend
### Setting up the environment
- For security purposes, the actual .env file is not shared, but one can put their own values in the following fields:
    ```sh
    PORT=
    MONGO_URI=
    FRONTEND_URI=
    VITE_CLERK_PUBLISHABLE_KEY=
    VITE_REACT_APP_BACKEND_BASEURL=

### Starting the Backend Server
- Navigate to the backend directory and start the server:
    ```sh
    cd backend
    npm run dev

### API Endpoints
- POST 
    ```sh 
    /api/v1/reservation/send 
- Send a reservation.

## Frontend
### Setting up the environment
- For security purposes, the actual .env file is not shared, but one can put their own values in the following fields:
    ```sh
    VITE_CLERK_PUBLISHABLE_KEY=
    VITE_REACT_APP_BACKEND_BASEURL=

### Starting the Frontend Server
- Navigate to the frontend directory and start the server:
    ```sh
    cd frontend
    npm run dev
- The frontend server will start on the specified port (default is 5173).

## Error Handling
- The backend uses a custom error handling middleware to handle errors. The ErrorHandler function creates an error object with a message and status code. The errorMiddleware function handles different types of errors and sends appropriate responses.

## Database Connection
- MongoDB database is used for storing databases of users.

