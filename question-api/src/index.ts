import express, { Express, Request, Response } from 'express';

require('dotenv').config();
require('./mongodb/db');

const app: Express = express();
const port = process.env.SERVER_PORT;

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('from Question API!');
});

// Assuming questionRoutes is correctly set up
import questionRoutes from './routes/questions';
app.use('/questions', questionRoutes);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});