import express, { Express, Request, Response } from 'express';

require('dotenv').config();

const app: Express = express();
const port = process.env.SERVER_PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('from Collaboration API!');
});

app.use(express.json());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is alive at http://localhost:${port}`);
});
