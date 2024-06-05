//server/index.js

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from 'dotenv';
import { getPosts } from "./controllers/posts.js";
import colors from 'colors'
dotenv.config();

const app = express();
app.get('/',(req, res) =>
    res.send('Hello to Memory API')
)

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/posts", postRoutes);

const CONNECTION_URL =  process.env.CONNECTION_URL;
const PORT = process.env.PORT || 9090;

console.log('Attempting to connect to MongoDB...')








mongoose.connect(CONNECTION_URL,{connectTimeoutMS: 10000})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}...`);
        });
    })
    .catch((error) => {
        console.error('Connection error', error.message);
        process.exit(1);
    });

// mongoose.set('useFindAndModify',false)
