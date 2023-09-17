import express, { Application } from 'express';
import './loadEnvironment';
import questionsRouter from './routes/question.router';
import { connectToDatabase } from './services/database.service';

const port = process.env.SERVER_PORT || 5050;
const app: Application = express();

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
