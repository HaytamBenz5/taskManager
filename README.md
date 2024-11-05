# Task Manager Test

![Task Manager Screenshot](Demo/1.png) 

![Task Manager Screenshot](Demo/2.png) 

This project is a simple task management application with a backend in Node.js (TypeScript) and a frontend in React.

## Objective

The goal of this exercise is to test your skills in creating a TypeScript API in Node.js without any frameworks and a frontend component in React that interacts with this API.

## Requirements

### Backend (in `/backend`):

- TypeScript setup for Node.js with routes in `/routes`.
- Implement two routes:
  - `GET /tasks` - Fetches all tasks.
  - `POST /tasks` - Adds a new task with a title.
- Store tasks in-memory for this test. Each task should have a unique ID and title.
- Respond with error code `400` if the title is missing or the JSON is invalid in the POST request.

### Frontend (in `/frontend/src/TaskManager.js`):

- Create a `TaskManager` component that displays tasks and allows adding new ones.
- Use `fetch` to interact with the backend API.
- Display a list of all tasks and a form to add a new task.

## Instructions

### Setup Backend

1. Navigate to the `backend` folder.
2. Run `npm install` to install dependencies.
3. Compile the TypeScript code into JavaScript using : tsc (this step is already done).
4. Run the server with the following command: node ./dist/server.js
  

### Setup Backend
   - Navigate to the frontend folder.
   - Run npm install to install dependencies.
   - Run npm start to start the frontend server on port 3001.

### Notes
- The backend and frontend should work together; the frontend makes requests to `http://localhost:3000` for the backend API.
- You are encouraged to document your code for readability and maintainability.

