import { Request } from 'express';
import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface IQuestion {
  _id: Schema.Types.ObjectId;
  title: string;
  difficulty: string;
  tags: string[];
  description: string;
  examples: {
    in: string;
    out: string;
    explanation: string;
  }[];
  constraints: string[];
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    difficulty: { type: String, required: true },
    tags: { type: [String], required: true },
    description: { type: String, required: true },
    examples: {
      type: [{ in: String, out: String, explanation: String }],
      required: true
    },
    constraints: { type: [String], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
