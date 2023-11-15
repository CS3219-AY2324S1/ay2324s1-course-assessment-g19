import { Request } from 'express';
import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface IQuestion {
  _id: Schema.Types.ObjectId;
  title: string;
  difficulty: string;
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
    title: {
      type: String,
      required: [true, 'Title cannot be empty'],
      unique: [true, 'Title already exists']
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty cannot be empty']
    },
    description: {
      type: String,
      required: [true, 'Description cannot be empty']
    },
    examples: {
      type: [{ in: String, out: String, explanation: String }],
      validate: {
        validator: function (examples: any[]) {
          return examples.length > 0;
        },
        message: 'Examples cannot be empty'
      },
      required: true
    },
    constraints: {
      type: [String],
      validate: {
        validator: function (constraints: any[]) {
          return constraints.length > 0;
        },
        message: 'Constraints cannot be empty'
      },
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
