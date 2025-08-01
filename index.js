import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use('/', (req, res) => {
    console.log('Route not found');
});

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(process.env.PORT, () => {
                console.log(`Server is running on port ${process.env.PORT}`);
            });
        })
        .catch(err => {
            console.error('Error connecting to MongoDB:', err);
        });