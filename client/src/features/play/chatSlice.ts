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
    setChatMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    reset: (state) => {
      state.messages = [];
    }
  }
});

export const { setChatMessages, reset } = chatSlice.actions;

export const selectChatMessages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;
