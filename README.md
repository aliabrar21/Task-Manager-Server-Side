🗂️ Task Management Backend - README
📖 Overview
This backend module powers the Task Management System, enabling CRUD operations on tasks with robust API endpoints. The backend is built using Node.js, Express.js, and PostgreSQL, adhering to the MVC pattern and supporting RESTful API calls for seamless integration with the frontend.

🔧 Technology Stack
Programming Language: JavaScript (Node.js)

Framework: Express.js

Database: PostgreSQL

ORM/Query Builder: pg (native)

Architecture: MVC (Model-View-Controller)

Tools: Git, Postman, VS Code

🧩 DB Design

2. Data Dictionary
Field Name	Data Type	Description
id	UUID (PK)	Unique identifier for the task
title	VARCHAR	Title of the task
description	TEXT	Detailed description
due_date	DATE	Due date of the task
status	VARCHAR	Task status - Pending/In Progress/Completed

3. Indexes Used
PRIMARY KEY on id

Index on due_date for efficient filtering and sorting

4. Approach
Code-First: Tables and schema were created through code using SQL scripts in migration files for better control and consistency.

🏛️ Application Architecture
Type
✅ RESTful API using MVC pattern

❌ No server-side rendering used

Structure
pgsql
Copy
Edit
/backend
│
├── controllers/
│   └── taskController.js
├── models/
│   └── taskModel.js
├── routes/
│   └── taskRoutes.js
├── db/
│   └── db.js
├── server.js
└── package.json
📌 API Endpoints
Method	Endpoint	Description
GET	/api/tasks	Fetch all tasks
GET	/api/tasks/:id	Fetch task by ID
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update an existing task
DELETE	/api/tasks/:id	Delete a task

All endpoints use JSON format and follow REST standards.

⚙️ Environment Setup
Dependencies
Node.js >= 18.x

PostgreSQL >= 14.x

Installation Steps
Clone the repository:

bash
Copy
Edit
git clone https://github.com/aliabrar21/Task-Manager-Server-Side
cd task-manager-backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file with the following:

env
Copy
Edit
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/taskdb
Create the database and run schema:

sql
Copy
Edit
CREATE DATABASE taskdb;

-- Then connect to the database and run schema.sql if available
Start the server:

bash
Copy
Edit
npm run dev
Server should be running at: http://localhost:5000/api/tasks

📦 Folder Descriptions
controllers/: Business logic

models/: Database queries

routes/: API routing

db/: PostgreSQL connection setup

server.js: Application entry point

🧪 Testing
Use Postman or Thunder Client to test API endpoints locally. Make sure to use correct headers:

json
Copy
Edit
Content-Type: application/json
📑 Documentation Summary
Section	Status
Data Dictionary	✅ Done
Index Details	✅ Done
Code-First Approach	✅ Done
API List & Explanation	✅ Done
MVC Folder Structure	✅ Done
Setup Instructions	✅ Done
Environment Config	✅ Done

✅ CRUD + Search Functionalities
✅ Create a task

✅ Read all tasks / single task

✅ Update task data

✅ Delete a task

✅ Search/Filter: Built-in via frontend, can be enhanced via backend params

👨‍💻 Developed By
Your Name
Email: [sonuabrar1999@gmail.com]
GitHub: https://github.com/aliabrar21/Task-Manager-Server-Side
