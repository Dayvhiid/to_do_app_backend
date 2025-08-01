import Task from '../models/Task.js';

const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            user: req.user.userId 
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const { status } = req.query; 
        
        const filter = { user: req.user.userId };
        if (status && ['pending', 'completed'].includes(status)) {
            filter.status = status;
        }
        const tasks = await Task.find(filter);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id, user: req.user.userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user.userId },
            { title, description },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOneAndDelete({ _id: id, user: req.user.userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


const toggleTaskStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id, user: req.user.userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

         if (task.status === 'pending') {
            task.status = 'completed';
        } else {
            task.status = 'pending';
        }
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export { createTask, getTasks, getTaskById, updateTask, deleteTask, toggleTaskStatus };