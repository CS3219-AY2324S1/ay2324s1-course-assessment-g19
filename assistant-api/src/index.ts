import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

require('dotenv').config();

const app: Express = express();
const port = process.env.SERVER_PORT;
const openai_api = process.env.OPENAI_KEY;

const corsOptions = {
  origin: 'http://localhost',
  credentials: true,
  methods: ['POST', 'GET'], // Allow both POST and GET
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('from Assistant API!');
});

app.post('/sendQuestion', async (req: Request, res: Response) => {
  try {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: req.body.content }],
      temperature: 0.7
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openai_api}`
    };

    axios
      .post('https://api.openai.com/v1/chat/completions', data, { headers })
      .then((response) => {
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// curl https://api.openai.com/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer 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" \
//   -d '{
  //    "model": "gpt-3.5-turbo",
  //    "messages": [{"role": "user", "content": "Say this is a test!"}],
  //    "temperature": 0.7
  //  }'
