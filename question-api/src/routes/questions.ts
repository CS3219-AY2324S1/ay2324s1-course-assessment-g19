import { NextFunction, Request, Response, Router } from 'express';
import axios, { AxiosError } from 'axios';

const mongoose = require('mongoose');
const Question = require('../models/question');

const router = Router();

axios.defaults.withCredentials = true;

async function checkUserAuth(req: Request, res: Response, next: NextFunction) {
  try {
    await axios.get('http://peerprep-user-api:5050/auth/authorize', {
      headers: { Cookie: req.headers.cookie }
    });
    next();
  } catch (err) {
    if (err instanceof AxiosError) {
      return res.status(err.response?.status!).json({ message: err.message });
    }
  }
}

async function checkAdminAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authResponse = await axios.get(
      'http://peerprep-user-api:5050/auth/authorize',
      { headers: { Cookie: req.headers.cookie } }
    );
    if (authResponse.data.role !== 'Admin') {
      return res.status(401).json({ message: 'Unauthorized (Not `Admin`)' });
    }
    next();
  } catch (err) {
    if (err instanceof AxiosError) {
      return res.status(err.response?.status!).json({ message: err.message });
    }
  }
}

router.get('/', checkUserAuth, async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

router.post('/', checkAdminAuth, async (req: Request, res: Response) => {
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
router.delete('/:id', checkAdminAuth, async (req: Request, res: Response) => {
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
router.put('/:id', checkAdminAuth, async (req: Request, res: Response) => {
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
router.get('/search', checkUserAuth, async (req: Request, res: Response) => {
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
router.get('/where', checkUserAuth, async (req: Request, res: Response) => {
  try {
    // Extract query parameters for difficulty and language
    const { difficulty, questionIds } = req.query;
    const questionIdsArray = (questionIds as string).split(',');

    // Create a query object to filter questions
    const query: any = {};

    if (difficulty) {
      query.difficulty = difficulty;
    }

    const questions = await Question.find(query);
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    const question = shuffledQuestions.find(
      (question: any) => !questionIdsArray.includes(question._id.toString())
    );

    // Send the matching questions as a JSON response
    res.json(question);
  } catch (error) {
    // Handle errors and send a 500 internal server error response
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
