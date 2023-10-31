import express, { Express, Request, Response } from 'express';

const axios = require('axios');
const cors = require('cors');

require('dotenv').config();
require('./mongodb/db');

const app: Express = express();
const port = process.env.SERVER_PORT;

const corsOptions = {
  origin: 'http://localhost', // Replace with your frontend's origin
  credentials: true, 
  methods: ['POST', 'GET'], // Allow both POST and GET
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('from Question API!');
});

// Assuming questionRoutes is correctly set up
import questionRoutes from './routes/questions';
app.use('/questions', questionRoutes);

app.post('/run-code', async (req, res) => {
  try {
    const { source_code, language_id } = req.body;

    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      data: {
        language_id,
        source_code: Buffer.from(source_code).toString('base64'),
      },
    };

    const response = await axios(options);
    // If the request was successful, send the response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error while running code:', error);

    // if (axios.isAxiosError(error) && error.response) {
    //   // If the error comes from Axios, and there is a response available, send it back to the client
    //   res.status(error.response.status).json(error.response.data);
    // } else {
    //   // For other types of errors, send a generic error message
    //   res.status(500).json({ error: 'Internal server error' });
    // }
  }
});

app.get('/submission/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const options = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: 'false',
        fields: 'stdout,stderr,status_id,language_id,status'
      },
      headers: {
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching submission result:', error);
    // if (axios.isAxiosError(error) && error.response) {
    //   res.status(error.response.status).send(error.response.data);
    // } else {
    //   res.status(500).send('Internal Server Error');
    // }
  }
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});