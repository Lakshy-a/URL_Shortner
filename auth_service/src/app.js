import express from "express";
import dotenv from "dotenv"

export const app = express();
app.use(express.json());

dotenv.config();

