import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Question, QuestionDifficulty, StatusType } from '../../types';

interface PlayState {
  currentQuestion?: Question;
  language?: string;
  difficulty?: QuestionDifficulty;
  status: StatusType;
}

const initialState: PlayState = {
  currentQuestion: undefined,
  language: undefined,
  difficulty: undefined,
  status: 'DEFAULT'
};

export const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    }
  }
});

export const { setCurrentQuestion, setLanguage, setDifficulty } =
  playSlice.actions;

export const selectCurrentQuestion = (state: RootState) =>
  state.play.currentQuestion;
export const selectLanguage = (state: RootState) => state.play.language;
export const selectDifficulty = (state: RootState) => state.play.difficulty;
export const selectStatus = (state: RootState) => state.play.status;

export default playSlice.reducer;
