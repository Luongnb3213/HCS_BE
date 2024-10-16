import express from 'express';
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
import appointmentRoutes from "./routes/appoinmentRoutes.js"
import doctorRoutes from './routes/doctorRoutes.js'
const app = express();

app.use(cors())

app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 

app.use('/users', userRoutes);

app.use('/auth', authRoutes);

app.use('/email', mailRoutes);


app.use('/appointment', appointmentRoutes);

app.use('/doctors', doctorRoutes)

export default app;