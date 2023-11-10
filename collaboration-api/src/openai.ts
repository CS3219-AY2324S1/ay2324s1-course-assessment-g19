import axios from 'axios';
import cors from 'cors';
import { Request, Response, Router } from 'express';

const router = Router();
const openai_key = process.env.OPENAI_KEY;
router.use(cors());

// router.post('/', async (req, res) => {
//   try {
//     console.log("HELLO?????");
//     const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
//     const apiKey = openai_key

//     const requestData = {
//       prompt: req.body.prompt,
//       max_tokens: req.body.max_tokens,
//     };

//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`,
//     };

//     const response = await axios.post(apiUrl, requestData, { headers });
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

router.get('/', async (req: Request, res: Response) => {
  try {
    res.json({"message": "correct url"});
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
})

export default router;
