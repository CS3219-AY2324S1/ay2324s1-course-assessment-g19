import express, { Express } from 'express';
import questionRoutes from './routes/questions';

require('dotenv').config();
require('./mongodb/db');

const app: Express = express();
const port = process.env.SERVER_PORT;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/questions', questionRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
