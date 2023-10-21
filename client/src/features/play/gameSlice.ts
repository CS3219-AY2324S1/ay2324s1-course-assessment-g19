import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { socket } from '../../socket';
import { StatusType } from '../../types';

interface GameState {
  gameId: string;
  data: String;
  status: StatusType;
}

const initialState: GameState = {
  gameId: '',
  data: '',
  status: 'DEFAULT'
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
    setGameData: (state, action) => {
      state.data = action.payload;
    },
    resetGame: (state) => {
      state.gameId = '';
      state.data = '';
    }
  }
});

export const { setGameId, setGameData, resetGame } = gameSlice.actions;

export const selectGameData = (state: RootState) => state.game.data;
export const selectGameId = (state: RootState) => state.game.gameId;

export default gameSlice.reducer;
