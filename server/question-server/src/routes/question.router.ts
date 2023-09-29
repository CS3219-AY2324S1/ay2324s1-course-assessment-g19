import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Question from '../models/question';
import { collections } from '../services/database.service';

const questionsRouter = express.Router();

questionsRouter.use(express.json());

/**
 * Get all questions
 * @route GET /questions
 * @returns {Array} Array of question objects
 * @throws {Error} 500 - Server error
 */
questionsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const results = await collections.questions?.find({}).toArray();

    if (results) {
      const questions = results.map((result) => {
        return {
          ...result,
          id: result?._id
        }
      });

      res.status(200).send(questions);
    } else {
      res.status(500).send('Server error');
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

/**
 * Get a specific question by ID
 * @route GET /questions/:id
 * @param {string} req.params.id - The ID of the question
 * @returns {Object} The question object
 * @throws {Error} 404 - Not found
 * @throws {Error} 500 - Server error
 */
questionsRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.questions?.findOne(query);

    if (result) {
      const question = {
        ...result,
        id: result?._id
      };

      res.status(200).send(question);
    } else {
      res.status(404).send('Not found');
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

/**
 * Add a new question
 * @route POST /questions
 * @param {Object} req.body - The request body containing question details
 * @param {string} req.body.title - The title of the question
 * @param {string} req.body.description - The description of the question
 * @param {string} req.body.category - The category of the question
 * @param {string} req.body.complexity - The complexity of the question
 * @returns {Object} The newly added question object
 * @throws {Error} 500 - Server error
 */
questionsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newQuestion = req.body as Question;
    const result = await collections.questions?.insertOne(newQuestion);

    if (result) {
      const insertedQuestion = {
        ...newQuestion,
        id: result?.insertedId
      };

      res.status(201).send(insertedQuestion);
    } else {
      res.status(500).send('Server error');
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

/**
 * Update a question by ID
 * @route PUT /questions/:id
 * @param {string} req.params.id - The ID of the question
 * @param {Object} req.body - The request body containing updated question details
 * @param {string} req.body.title - The updated title of the question
 * @param {string} req.body.description - The updated description of the question
 * @param {string} req.body.category - The updated category of the question
 * @param {string} req.body.complexity - The updated complexity of the question
 * @returns {Object} The updated question object
 * @throws {Error} 500 - Server error
 */
questionsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const question = req.body as Question;
    const query = { _id: new ObjectId(id) };

    const result = await collections.questions?.updateOne(query, {
      $set: {
        title: question.title,
        description: question.description,
        category: question.category,
        complexity: question.complexity
      }
    });

    if (result) {
      const updatedQuestion = {
        ...question,
        id: id
      };

      res.status(200).send(updatedQuestion)
    } else {
      res.status(500).send('Server error');
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

/**
 * Delete a question by ID
 * @route DELETE /questions/:id
 * @param {string} req.params.id - The ID of the question to be deleted
 * @returns {Object} The result of the deletion operation
 * @throws {Error} 500 - Server error
 */
questionsRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const questionToDelete = await collections.questions?.findOne(query);

    const result = await collections.questions?.deleteOne(query);

    if (result && result.deletedCount) {
      const deletedQuestion = {
        ...questionToDelete,
        id: id
      };
      
      res.status(202).send(deletedQuestion);
    } else if (!result) {
      res.status(400);
    } else if (!result.deletedCount) {
      res.status(404);
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

export default questionsRouter;
