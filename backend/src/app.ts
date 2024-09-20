import express from "express";
import cors from "cors";
import router from "./Router/pdf"; 
import connectDB from "./Db/connect";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Appliction level middlewares

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors());
app.use('/api/pdf/v3', router);

// Initializing server and connecting to database

const start = async () => {
    try {
        await connectDB(process.env.DB_URL as string); 
        console.log("DB Connected");
        app.listen(process.env.PORT, () => console.log("Server started on port 3000"));
    } catch (error) {
        console.log('Error:');
    }
};

start();
