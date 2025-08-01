import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask, toggleTaskStatus } from '../controllers/taskController.js';
import { createTaskValidator, updateTaskValidator, toggleTaskStatusValidator } from '../validators/taskValidators.js';
import auth from '../middleware/auth.js'
const router = express.Router();

router.post('/', auth ,createTaskValidator, createTask);
router.get('/', auth, getTasks);
router.get('/:id',auth , getTaskById);
router.put('/:id', auth ,updateTaskValidator, updateTask);
router.delete('/:id', auth,deleteTask);
router.patch('/:id/toggle', auth,toggleTaskStatusValidator, toggleTaskStatus);

export default router;
