import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import todoRoutes from './routes/route.js';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());        
app.use("/api/todos",todoRoutes);





connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Server is running ');
        console.log('it is working');
    });
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
