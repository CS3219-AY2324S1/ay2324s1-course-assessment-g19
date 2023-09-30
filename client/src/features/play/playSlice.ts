import { createSlice } from '@reduxjs/toolkit';
import { Question, StatusType } from '../../types';

interface PlayState {
  currentQuestion?: Question;
  status: StatusType;
}

const initialState: PlayState = {
  currentQuestion: undefined,
  status: 'DEFAULT'
};

export const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    }
  }
});

export const { setCurrentQuestion } = playSlice.actions;

export const selectCurrentQuestion = (state: any) => state.play.currentQuestion;
export const selectStatus = (state: any) => state.play.status;

export default playSlice.reducer;
