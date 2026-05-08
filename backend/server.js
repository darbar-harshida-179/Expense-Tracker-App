// backend/server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import expenseRoutes from './routes/expenseRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.log("MongoDB Error:", err));

app.use('/api/auth', authRoutes);
app.use('/api', expenseRoutes);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
}); 