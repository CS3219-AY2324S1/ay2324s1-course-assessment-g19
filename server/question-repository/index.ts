import cors from 'cors';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import questions from "./routes/question";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/question", questions);

app.listen(PORT, () => {
    console.log(`Question Repository Server is running on port: ${PORT}`);
});