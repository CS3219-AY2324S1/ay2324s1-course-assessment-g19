import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import {
  Question,
  QuestionConstraint,
  QuestionDescription,
  QuestionDifficulty,
  QuestionExample,
  StatusType
} from '../../types';
import { toast } from 'react-toastify';

interface CreatorState {
  question: Question;
  status: StatusType;
}

const initialState: CreatorState = {
  question: {
    title: '',
    difficulty: 'EASY',
    description: '',
    examples: [],
    constraints: [],
    _id: undefined
  },
  status: 'DEFAULT'
};

axios.defaults.withCredentials = true;

export const createQuestion = createAsyncThunk(
  '/creatorSlice/createQuestion',
  async (question: Question) => {
    try {
      const response = await axios.post('/question-api/questions', question);
      console.log('creating question: ', response);
      return response.data;
    } catch (error: any) {
      const errors = error.response.data.message.errors;
      Object.keys(errors).forEach((key) => {
        toast.error(errors[key].message, {
          autoClose: 3000,
          position: 'top-center'
        });
      });
      throw error;
    }
  }
);

export const editQuestion = createAsyncThunk(
  '/creatorSlice/editQuestion',
  async ({ id, question }: { id: string; question: Question }) => {
    try {
      const response = await axios.put(
        `/question-api/questions/${id}`,
        question
      );
      console.log('editing question: ', response);
      return response.data;
    } catch (error: any) {
      const errors = error.response.data.message.errors;
      Object.keys(errors).forEach((key) => {
        toast.error(errors[key].message, {
          autoClose: 3000,
          position: 'top-center'
        });
      });
      throw error;
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  '/creatorSlice/deleteQuestion',
  async ({ id }: { id: string }) => {
    try {
      const response = await axios.delete(`/question-api/questions/${id}`);
      console.log('deleting question: ', response);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        position: 'top-center'
      });
      throw error;
    }
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
    deleteExample: (
      state,
      action: PayloadAction<{ example: QuestionExample; index: number }>
    ) => {
      const examples = [...state.question.examples];
      state.question.examples = examples.filter(
        (e, i) => i !== action.payload.index
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
    deleteConstraint: (
      state,
      action: PayloadAction<{ constraint: QuestionConstraint; index: number }>
    ) => {
      const constraints = [...state.question.constraints];
      state.question.constraints = constraints.filter(
        (c, i) => i !== action.payload.index
      );
    },
    reset: (state) => {
      state.question = initialState.question;
      state.status = initialState.status;
    },
    setQuestionInCreator: (state, action: PayloadAction<Question>) => {
      state.question = action.payload;
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
  updateDescription,
  addExample,
  updateExample,
  deleteExample,
  addConstraint,
  updateConstraint,
  deleteConstraint,
  reset,
  setQuestionInCreator
} = creatorSlice.actions;

export const selectTitle = (state: RootState) => state.creator.question.title;
export const selectDifficulty = (state: RootState) =>
  state.creator.question.difficulty;
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
