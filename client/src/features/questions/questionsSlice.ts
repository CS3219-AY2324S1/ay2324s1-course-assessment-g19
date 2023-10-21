import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { Question, StatusType } from '../../types';

interface QuestionsState {
  questions: Question[];
  status: StatusType;
}

const initialState: QuestionsState = {
  questions: [],
  status: 'DEFAULT'
};

axios.defaults.withCredentials = true;

export const fetchQuestions = createAsyncThunk(
  '/questionsSlice/fetchQuestions',
  async () => {
    const response = await axios.get('/question-api/questions');
    return response.data;
  }
);

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.status = 'LOADING';
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.status = 'SUCCESS';
      state.questions = action.payload;
    });
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.status = 'ERROR';
    });
  }
});

export const selectQuestions = (state: RootState) => state.questions.questions;
export const selectQuestionById = (id: string) => (state: RootState) =>
  state.questions.questions.find((question) => question._id === id);
export const selectQuestionByTitle = (title?: string) => (state: RootState) =>
  state.questions.questions.find((question) => question.title === title);
export const selectStatus = (state: RootState) => state.questions.status;
export const selectQuestionByDifficulty = (difficulty: string) => (state: RootState) => {
  const filteredQuestions = state.questions.questions.filter(question => question.difficulty === difficulty);
  
  if (filteredQuestions.length === 0) {
    return null; // No questions with the specified difficulty found
  }

  // Randomly select one question from the filtered array
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
};

export default questionsSlice.reducer;
