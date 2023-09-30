import { configureStore } from '@reduxjs/toolkit';

import playReducer from './features/play/playSlice';
import creatorReducer from './features/questions/creatorSlice';
import questionReducer from './features/questions/questionsSlice';
import authReducer from './features/user/authSlice';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    play: playReducer,
    questions: questionReducer,
    creator: creatorReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
