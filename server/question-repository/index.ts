import cors from 'cors';
import express, { Application } from 'express';
import "./loadEnvironment";
import questions from "./routes/question";

const PORT = process.env.MONGO_PORT || 5050;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/question", questions);

app.listen(PORT, () => {
    console.log(`Question Repository Server is running on port: ${PORT}`);
});