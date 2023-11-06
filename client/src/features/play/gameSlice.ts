import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Question, StatusType, User } from '../../types';
import axios from 'axios';

interface GameState {
  gameId: string;
  data: string;
  players: User[];
  question?: Question;
  isRunning: boolean;
  output: string;
  status: StatusType;
}

const initialState: GameState = {
  gameId: '',
  data: '',
  players: [],
  question: undefined,
  isRunning: false,
  output: '',
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
    setGameIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    setGameOutput: (state, action) => {
      state.output = action.payload;
    },
    resetGame: (state) => {
      state.gameId = '';
      state.data = '';
      state.players = [];
      state.question = undefined;
      state.isRunning = false;
      state.output = '';
      state.status = 'DEFAULT';
    }
  }
});

export const {
  setGameId,
  setGameData,
  setGamePlayers,
  setGameQuestion,
  setGameIsRunning,
  setGameOutput,
  resetGame
} = gameSlice.actions;

export const selectGameQuestion = (state: RootState) => state.game.question;
export const selectGameData = (state: RootState) => state.game.data;
export const selectGamePlayers = (state: RootState) => state.game.players;
export const selectGameId = (state: RootState) => state.game.gameId;
export const selectGameIsRunning = (state: RootState) => state.game.isRunning;
export const selectGameOutput = (state: RootState) => state.game.output;
export const selectGameOpponent = (state: RootState) =>
  state.game.players.find(
    (e) => e && e.id !== state.authentication.currentUser?.id
  );

export default gameSlice.reducer;
