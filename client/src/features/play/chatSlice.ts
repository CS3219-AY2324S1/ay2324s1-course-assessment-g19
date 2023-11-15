import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChatMessage } from '../../types';
import { RootState } from '../../store';

interface ChatState {
  messages: ChatMessage[];
  isAssistantLoading: boolean;
}

const initialState: ChatState = {
  messages: [],
  isAssistantLoading: false
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    setIsAssistantLoading: (state, action: PayloadAction<boolean>) => {
      state.isAssistantLoading = action.payload;
    },
    reset: (state) => {
      state.messages = [];
    }
  }
});

export const { setChatMessages, setIsAssistantLoading, reset } =
  chatSlice.actions;

export const selectChatMessages = (state: RootState) => state.chat.messages;
export const selectIsAssistantLoading = (state: RootState) =>
  state.chat.isAssistantLoading;

export default chatSlice.reducer;
