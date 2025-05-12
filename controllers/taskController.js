import pool from '../models/db.js';

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get task by ID
const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a task
const createTask = async (req, res) => {
    const { title, description, due_date, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, description, due_date, status, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *',
            [title, description, due_date, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
            [title, description, due_date, status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Search tasks by title or description
const searchTasks = async (req, res) => {
    const { q } = req.query;
    try {
        const result = await pool.query(
            `SELECT * FROM tasks WHERE title ILIKE $1 OR description ILIKE $1 ORDER BY created_at DESC`,
            [`%${q}%`]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    searchTasks
};
