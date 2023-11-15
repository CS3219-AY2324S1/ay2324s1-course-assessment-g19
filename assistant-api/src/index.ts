import express, { Express, Request, Response } from 'express';
import { OpenAI } from 'openai';
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

const openai = new OpenAI({ apiKey: openai_api });

app.post('/sendQuestion', async (req: Request, res: Response) => {
  try {
    console.log(`REQUEST: ${req.body.prompt.content}`);

    const messages = req.body.messages;
    messages.unshift(req.body.context); // Give context to the AI
    messages.push(req.body.question); // Give question to the AI
    messages.push(req.body.code); // Give code to the AI
    messages.push(req.body.prompt); // Give the prompt to the AI

    const completion = await openai.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo'
    });

    console.log(`RESPONSE: ${completion.choices[0].message.content}`);
    res.json(completion.choices[0].message.content);
  } catch (error) {
    console.log(`ERROR: ${error}`);
  } finally {
    console.log('');
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
