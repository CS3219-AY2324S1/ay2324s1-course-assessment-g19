import express, { Express, Request, Response } from 'express';
import questionRoutes from './routes/questions';

require('dotenv').config();
require('./mongodb/db');

const app: Express = express();
const port = process.env.SERVER_PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('from Question API!');
});

app.use(express.json());
app.use('/questions', questionRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is alive at http://localhost:${port}`);
});
