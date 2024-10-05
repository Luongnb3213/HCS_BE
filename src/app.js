import express from 'express';
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
const app = express();

app.use(cors())

app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 

app.use('/users', userRoutes);

app.use('/auth', authRoutes);

app.use('/email', mailRoutes);


export default app;