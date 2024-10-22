
# Task Management API

This project is a simple Task Management API built with Node.js. It allows users to create, read, update, and delete tasks while maintaining an organized structure for task management. The API features the ability to export tasks to a CSV file for easy sharing and viewing.

# Features
- CRUD Operations: Create, Read, Update, and Delete tasks.
- CSV Export: Download tasks in CSV format.
- Task Completion: Mark tasks as completed with a timestamp.
- Search Functionality: Filter tasks based on title.
- Data Persistence: Uses a JSON file to store task data.
# Technologies Used
- Node.js
- HTTP module
- JSON for data storage
- json2csv for CSV export
# Getting Started
Clone the repository:

```
 git clone https://github.com/Endrio-Maciel/task-management-api.git
```

Navigate to the project directory:

```
cd task-management-api
```

Install the dependencies:

```
npm install
```

Run the application:

```
npm run dev
```

- Access the API at http://localhost:3333.


# Endpoints
- GET /tasks: Retrieve all tasks.
- POST /tasks: Create a new task.
- PUT /tasks/:id: Update an existing task.
- PATCH /tasks/:id/complete: Mark a task as completed.
- DELETE /tasks/:id: Delete a task.
- GET /tasks/csv: Download tasks as a CSV file.
