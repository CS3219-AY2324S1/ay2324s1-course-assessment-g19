import express, { Express, Request, Response } from 'express';

require('dotenv').config();

const app: Express = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('from Assistant API!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
