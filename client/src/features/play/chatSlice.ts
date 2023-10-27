import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChatMessage } from '../../types';
import { RootState } from '../../store';

interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: []
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatMessage: (state, action: PayloadAction<ChatMessage>) => {
      if (
        !state.messages.map((message) => message.id).includes(action.payload.id)
      ) {
        state.messages.push(action.payload);
      }
    },
    reset: (state) => {
      state.messages = [];
    }
  }
});

export const { addChatMessage, reset } = chatSlice.actions;

export const selectChatMessages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;
