import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { socket } from '../../socket';
import { Question, StatusType } from '../../types';

interface GameState {
  gameId: string;
  data: String;
  question?: Question;
  status: StatusType;
}

const initialState: GameState = {
  gameId: '',
  data: '',
  question: undefined,
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
    setGameQuestion: (state, action) => {
      state.question = action.payload;
    },
    resetGame: (state) => {
      state.gameId = '';
      state.data = '';
    }
  }
});

export const { setGameId, setGameData, setGameQuestion, resetGame } =
  gameSlice.actions;

export const selectGameQuestion = (state: RootState) => state.game.question;
export const selectGameData = (state: RootState) => state.game.data;
export const selectGameId = (state: RootState) => state.game.gameId;

export default gameSlice.reducer;
