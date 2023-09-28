import { configureStore } from '@reduxjs/toolkit';

import creatorReducer from './features/questions/creatorSlice';
import questionReducer from './features/questions/questionsSlice';
import authReducer from './features/user/authSlice';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    questions: questionReducer,
    creator: creatorReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
