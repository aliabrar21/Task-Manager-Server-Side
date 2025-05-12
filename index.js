import express from 'express';
import { Client } from 'pg'; // PostgreSQL client
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// PostgreSQL Client Configuration
const client = new Client({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'postgres',
    password: 'getjar@123A', // Replace with your PostgreSQL password
    port: 5432,
});

client.connect(); // Connect to PostgreSQL

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching tasks from database' });
    }
});

// GET task by ID
app.get('/api/tasks/:id', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching task from database' });
    }
});

// CREATE task
app.post('/api/tasks', async (req, res) => {
    const { title, description, dueDate, status } = req.body;

    if (!title || !description || !dueDate || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    try {
        const result = await client.query(
            'INSERT INTO tasks (title, description, due_date, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, dueDate, status, createdAt, updatedAt]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating task in database' });
    }
});

// UPDATE task
app.put('/api/tasks/:id', async (req, res) => {
    const { title, description, dueDate, status } = req.body;

    try {
        const result = await client.query(
            'UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [title, description, dueDate, status, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating task in database' });
    }
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const result = await client.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted', task: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting task from database' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
