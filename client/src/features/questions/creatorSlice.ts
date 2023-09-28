import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import {
  Question,
  QuestionConstraint,
  QuestionDescription,
  QuestionDifficulty,
  QuestionExample,
  QuestionTag,
  StatusType
} from '../../types';

interface CreatorState {
  question: Question;
  status: StatusType;
}

const initialState: CreatorState = {
  question: {
    title: '',
    difficulty: 'EASY',
    tags: [],
    description: '',
    examples: [],
    constraints: []
  },
  status: 'DEFAULT'
};

axios.defaults.withCredentials = true;

export const createQuestion = createAsyncThunk(
  '/creatorSlice/createQuestion',
  async (question: Question) => {
    console.log(question);
    const response = await axios.post('/questions/questions', question);
    return response.data;
  }
);

export const creatorSlice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.question.title = action.payload;
    },
    updateDifficulty: (state, action: PayloadAction<QuestionDifficulty>) => {
      state.question.difficulty = action.payload;
    },
    updateTags: (state, action: PayloadAction<QuestionTag[]>) => {
      state.question.tags = action.payload;
    },
    updateDescription: (state, action: PayloadAction<QuestionDescription>) => {
      state.question.description = action.payload;
    },
    addExample: (state, action: PayloadAction<QuestionExample>) => {
      state.question.examples.push(action.payload);
    },
    updateExample: (
      state,
      action: PayloadAction<{ example: QuestionExample; index: number }>
    ) => {
      state.question.examples[action.payload.index] = action.payload.example;
    },
    deleteExample: (state, action: PayloadAction<QuestionExample>) => {
      const examples = [...state.question.examples];
      state.question.examples = examples.filter(
        (e) =>
          !(
            e.in === action.payload.in &&
            e.out === action.payload.out &&
            e.explanation === action.payload.explanation
          )
      );
    },
    addConstraint: (state, action: PayloadAction<QuestionConstraint>) => {
      state.question.constraints.push(action.payload);
    },
    updateConstraint: (
      state,
      action: PayloadAction<{ constraint: QuestionConstraint; index: number }>
    ) => {
      state.question.constraints[action.payload.index] =
        action.payload.constraint;
    },
    deleteConstraint: (state, action: PayloadAction<QuestionConstraint>) => {
      const constraints = [...state.question.constraints];
      state.question.constraints = constraints.filter(
        (c) => c !== action.payload
      );
    },
    reset: (state) => {
      state = initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(createQuestion.fulfilled, (state) => {
        state.status = 'SUCCESS';
        state.question = initialState.question;
      })
      .addCase(createQuestion.rejected, (state) => {
        state.status = 'ERROR';
      });
  }
});

export const {
  updateTitle,
  updateDifficulty,
  updateTags,
  updateDescription,
  addExample,
  updateExample,
  deleteExample,
  addConstraint,
  updateConstraint,
  deleteConstraint,
  reset
} = creatorSlice.actions;

export const selectTitle = (state: RootState) => state.creator.question.title;
export const selectDifficulty = (state: RootState) =>
  state.creator.question.difficulty;
export const selectTags = (state: RootState) => state.creator.question.tags;
export const selectDescription = (state: RootState) =>
  state.creator.question.description;
export const selectExamples = (state: RootState) =>
  state.creator.question.examples;
export const selectConstraints = (state: RootState) =>
  state.creator.question.constraints;
export const selectCreatorQuestion = (state: RootState) =>
  state.creator.question;
export const selectCreatorStatus = (state: RootState) => state.creator.status;

export default creatorSlice.reducer;
