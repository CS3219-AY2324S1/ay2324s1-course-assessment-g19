import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  Language,
  Question,
  QuestionDifficulty,
  StatusType
} from '../../types';
import axios from 'axios';

interface PlayState {
  isActive: boolean;
  currentQuestion?: Question;
  language?: Language;
  difficulty?: QuestionDifficulty;
  languages: Language[];
  status: StatusType;
}

const initialState: PlayState = {
  isActive: false,
  currentQuestion: undefined,
  language: undefined,
  difficulty: undefined,
  languages: [],
  status: 'DEFAULT'
};

export const fetchLanguages = createAsyncThunk(
  '/playSlice/fetchLanguages',
  async () => {
    const response = await axios.get(`/code-api/languages`);
    return response.data;
  }
);

export const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = state.languages.find((e) => e.name === action.payload);
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLanguages.fulfilled, (state, action) => {
      state.languages = action.payload;
    });
  }
});

export const { setIsActive, setLanguage, setDifficulty } = playSlice.actions;

export const selectIsActive = (state: RootState) => state.play.isActive;
export const selectCurrentQuestion = (state: RootState) =>
  state.play.currentQuestion;
export const selectLanguage = (state: RootState) => state.play.language;
export const selectDifficulty = (state: RootState) => state.play.difficulty;
export const selectLanguages = (state: RootState) => state.play.languages;
export const selectStatus = (state: RootState) => state.play.status;

export default playSlice.reducer;
