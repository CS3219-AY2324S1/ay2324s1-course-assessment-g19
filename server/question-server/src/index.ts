import express from 'express';
import cors from 'cors';
import './loadEnvironment';
import questionsRouter from './routes/question.router';
import { connectToDatabase } from './services/database.service';

const port = process.env.SERVER_PORT || 5050;
const app = express();

// Allow requests from specific origin
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.options('*', cors());

connectToDatabase()
  .then(() => {
    app.use('/questions', questionsRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
