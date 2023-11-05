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

export const executeCode = createAsyncThunk(
  '/gameSlice/executeCode',
  async ({
    source_code,
    language_id
  }: {
    source_code: string;
    language_id: number;
  }) => {
    try {
      console.log('handleRunCode called');
      console.log(source_code);

      const response = await axios.post(`/code-api/run-code`, {
        source_code,
        language_id // Update this to the correct language_id for Java
      });

      const token = response.data.token;

      if (token) {
        console.log('Submission token:', token);

        const maxAttempts = 3;
        let attempts = 0;
        let resultResponse;

        while (attempts < maxAttempts) {
          resultResponse = await axios.get(`/code-api/submission/${token}`);
          console.log('Submission result:', resultResponse.data);

          if (resultResponse.data.status_id === 3) {
            // Assuming status_id 3 means 'Finished'
            return resultResponse.data.stdout || resultResponse.data.stderr;
          } else if (resultResponse.data.status_id > 3) {
            // Statuses higher than 3 indicate an error or other non-successful state
            return 'Error executing code';
          }

          attempts++;
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
        }

        return 'Execution timed out';
      } else {
        return 'Error executing code: No token received';
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error executing code:',
          error.response?.data || error.message
        );
      } else {
        console.error('An unknown error occurred');
      }
      return 'Error executing code';
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(executeCode.pending, (state) => {
      state.status = 'LOADING';
      state.isRunning = true;
      state.output = '';
    });
    builder.addCase(executeCode.fulfilled, (state, action) => {
      state.status = 'SUCCESS';
      state.output = action.payload;
      state.isRunning = false;
    });
    builder.addCase(executeCode.rejected, (state) => {
      state.status = 'ERROR';
      state.isRunning = false;
    });
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
export const selectGameIsRunning = (state: RootState) => state.game.isRunning;
export const selectGameOutput = (state: RootState) => state.game.output;
export const selectGameOpponent = (state: RootState) =>
  state.game.players.find((e) => e.id !== state.authentication.currentUser?.id);

export default gameSlice.reducer;
