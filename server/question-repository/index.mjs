import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import questions from "./routes/question.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/question", questions);

// start the Express server
app.listen(PORT, () => {
  console.log(`Question Repository Server is running on port: ${PORT}`);
});