import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface GameState {
  data: String;
}

const initialState: GameState = {
  data: ''
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setGameData } = gameSlice.actions;

export const selectGameData = (state: RootState) => state.game.data;

export default gameSlice.reducer;
