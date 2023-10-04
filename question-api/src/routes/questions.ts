import { Request, Response, Router } from 'express';

const mongoose = require('mongoose');
const Question = require('../models/question');

const router = Router();

router.get('/', (req: Request, res: Response) => {
  Question.find()
    .then((questions: any) => {
      res.json(questions);
    })
    .catch((err: any) => {
      res.status(400).json({ message: err });
    });
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const question = new Question({
      title: req.body.title,
      difficulty: req.body.difficulty,
      tags: req.body.tags,
      description: req.body.description,
      examples: req.body.examples,
      constraints: req.body.constraints
    });
    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// New route to search for questions based on difficulty and language
router.get('/search', async (req: Request, res: Response) => {
  try {
    // Extract query parameters for difficulty and language
    const { difficulty } = req.query;

    // Create a query object to filter questions
    const query: any = {};

    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Perform the search based on the query
    const questions = await Question.find(query);

    // Send the matching questions as a JSON response
    res.json(questions);
  } catch (error) {
    // Handle errors and send a 500 internal server error response
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
