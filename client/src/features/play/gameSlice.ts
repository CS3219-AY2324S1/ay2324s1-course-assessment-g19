import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { socket } from '../../socket';
import { Question, StatusType, User } from '../../types';

interface GameState {
  gameId: string;
  data: string;
  players: User[];
  question?: Question;
  status: StatusType;
}

const initialState: GameState = {
  gameId: '',
  data: '',
  players: [],
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
    setGamePlayers: (state, action) => {
      state.players = action.payload;
    },
    setGameQuestion: (state, action) => {
      state.question = action.payload;
    },
    resetGame: (state) => {
      state.gameId = '';
      state.data = '';
      state.players = [];
      state.question = undefined;
    }
  }
});

export const {
  setGameId,
  setGameData,
  setGamePlayers,
  setGameQuestion,
  resetGame
} = gameSlice.actions;

export const selectGameQuestion = (state: RootState) => state.game.question;
export const selectGameData = (state: RootState) => state.game.data;
export const selectGamePlayers = (state: RootState) => state.game.players;
export const selectGameId = (state: RootState) => state.game.gameId;
export const selectGameOpponent = (state: RootState) =>
  state.game.players.find((e) => e.id !== state.authentication.currentUser?.id);

export default gameSlice.reducer;
