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

export default router;
