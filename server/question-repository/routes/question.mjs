import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * Get all questions
 * @route GET /questions
 * @returns {Array} Array of question objects
 * @throws {Error} 500 - Server error
 */
router.get("/", async (req, res) => {
  let collection = db.collection("questions");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

/**
 * Get a specific question by ID
 * @route GET /questions/:id
 * @param {string} req.params.id - The ID of the question
 * @returns {Object} The question object
 * @throws {Error} 404 - Not found
 * @throws {Error} 500 - Server error
 */
router.get("/:id", async (req, res) => {
  let collection = db.collection("questions");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
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
router.post("/", async (req, res) => {
  let newDocument = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    complexity: req.body.complexity,
  };
  let collection = db.collection("questions");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

/**
 * Update a question by ID
 * @route PATCH /questions/:id
 * @param {string} req.params.id - The ID of the question
 * @param {Object} req.body - The request body containing updated question details
 * @param {string} req.body.title - The updated title of the question
 * @param {string} req.body.description - The updated description of the question
 * @param {string} req.body.category - The updated category of the question
 * @param {string} req.body.complexity - The updated complexity of the question
 * @returns {Object} The updated question object
 * @throws {Error} 500 - Server error
 */
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      complexity: req.body.complexity,
    }
  };

  let collection = db.collection("questions");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

/**
 * Delete a question by ID
 * @route DELETE /questions/:id
 * @param {string} req.params.id - The ID of the question to be deleted
 * @returns {Object} The result of the deletion operation
 * @throws {Error} 500 - Server error
 */
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("questions");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;