import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './features/modal/modalSlice';
import questionsReducer from './features/questions/questionsSlice';

export const store = configureStore({
	reducer: {
		questions: questionsReducer,
		modal: modalReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
