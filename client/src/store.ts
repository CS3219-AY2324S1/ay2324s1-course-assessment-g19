import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';

import modalReducer from './features/modal/modalSlice';
import questionsReducer from './features/questions/questionsSlice';

const persistedState = loadState();

export const store = configureStore({
	reducer: {
		questions: questionsReducer,
		modal: modalReducer,
	},
	preloadedState: persistedState,
});

store.subscribe(() => {
	saveState({
		questions: store.getState().questions,
		modal: store.getState().modal,
	});
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
