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
    const response = await axios.get('/questions/questions');
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
export const selectQuestionByTitle = (title?: string) => (state: RootState) =>
  state.questions.questions.find((question) => question.title === title);
export const selectStatus = (state: RootState) => state.questions.status;

export default questionsSlice.reducer;
