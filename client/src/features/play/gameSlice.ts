import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Question, StatusType, User } from '../../types';

interface GameState {
  gameId: string;
  startedAt?: Date;
  data: string;
  players: User[];
  questions: Question[];
  isRunning: boolean;
  output: string;
  status: StatusType;
}

const initialState: GameState = {
  gameId: '',
  startedAt: undefined,
  data: '',
  players: [],
  questions: [],
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
    setGameStartedAt: (state, action) => {
      state.startedAt = action.payload;
    },
    setGameData: (state, action) => {
      state.data = action.payload;
    },
    setGamePlayers: (state, action) => {
      state.players = action.payload;
    },
    setGameQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setGameIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    setGameOutput: (state, action) => {
      state.output = action.payload;
    },
    resetGame: (state) => {
      state.gameId = '';
      state.startedAt = undefined;
      state.data = '';
      state.players = [];
      state.questions = [];
      state.isRunning = false;
      state.output = '';
      state.status = 'DEFAULT';
    }
  }
});

export const {
  setGameId,
  setGameStartedAt,
  setGameData,
  setGamePlayers,
  setGameQuestions,
  setGameIsRunning,
  setGameOutput,
  resetGame
} = gameSlice.actions;

export const selectGameQuestions = (state: RootState) => state.game.questions;
export const selectGameStartedAt = (state: RootState) => state.game.startedAt;
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
