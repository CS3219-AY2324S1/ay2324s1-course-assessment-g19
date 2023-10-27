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

// Delete a question by id
router.delete('/:id', async (req, res) => {
  try {
    const removedQuestion = await Question.findByIdAndRemove(req.params.id);
    if (!removedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// New route to edit question by id
router.put('/:id', async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id, // id of the question to be updated
      {
        $set: {
          title: req.body.title,
          difficulty: req.body.difficulty,
          tags: req.body.tags,
          description: req.body.description,
          examples: req.body.examples,
          constraints: req.body.constraints
        }
      },
      { new: true } // Return the updated question after the update
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(updatedQuestion);
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

// New route to search for one question based on difficulty and language
router.get('/where', async (req: Request, res: Response) => {
  try {
    // Extract query parameters for difficulty and language
    const { difficulty } = req.query;

    // Create a query object to filter questions
    const query: any = {};

    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Perform the search based on the query
    const question = await Question.findOne(query);

    // Send the matching questions as a JSON response
    res.json(question);
  } catch (error) {
    // Handle errors and send a 500 internal server error response
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
