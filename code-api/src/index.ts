import { Express, Request, Response } from 'express';
import express from 'express';
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app: Express = express();
const port = process.env.SERVER_PORT;

const corsOptions = {
  origin: 'http://localhost', // Replace with your frontend's origin
  credentials: true,
  methods: ['POST', 'GET'], // Allow both POST and GET
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/run-code', async (req, res) => {
  try {
    const { source_code, language_id } = req.body;

    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: {
        language_id,
        source_code: Buffer.from(source_code).toString('base64')
      }
    };

    const response = await axios(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error while running code:', error);
  }
});

app.get('/languages', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/languages',
      params: {
        base64_encoded: 'false',
        fields: 'stdout,stderr,status_id,language_id,status'
      },
      headers: {
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching languages:', error);
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
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching submission result:', error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
