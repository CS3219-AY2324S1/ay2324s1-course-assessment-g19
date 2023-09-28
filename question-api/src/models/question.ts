const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: { type: String, required: true, unique: true },
  difficulty: { type: String, required: true },
  tags: { type: [String], required: true },
  description: { type: String, required: true },
  examples: {
    type: [{ in: String, out: String, explanation: String }],
    required: true
  },
  constraints: { type: [String], required: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() }
});

module.exports = mongoose.model('Question', questionSchema);
