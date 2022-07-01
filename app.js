import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/connectDB.js';
import userRoutes from './routes/user.js';

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DB_URL;

// CORS policy
app.use(cors());

// DATABASE Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

// Load Routes
app.use('/api/user', userRoutes);

app.listen(port, () => {
    console.log("Server listening...");
})