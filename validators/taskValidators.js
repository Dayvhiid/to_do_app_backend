import pkg from 'express-validator';
const { body, param } = pkg;

const createTaskValidator = [
    body('title').notEmpty().withMessage('Title is required').withMessage('Title must be at least 3 characters long'),
    body('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must not exceed 500 characters')
];

const updateTaskValidator = [
    body('title').notEmpty().withMessage('Title must be at least 3 characters long'),
    body('description')
        .notEmpty()
        .isLength({ max: 500 })
        .withMessage('Description must not exceed 500 characters')
];

const toggleTaskStatusValidator = [
    param('id').isMongoId().withMessage('Invalid task ID')
];

export { createTaskValidator, updateTaskValidator, toggleTaskStatusValidator };
