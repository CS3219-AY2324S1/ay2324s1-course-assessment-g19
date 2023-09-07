import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Question } from '../../types';

interface QuestionsState {
	data: Array<Question>;
}

const initialState: QuestionsState = {
	data: [],
};

export const questionsSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		addQuestion: (state, action: PayloadAction<Question>) => {
			state.data.push(action.payload);
		},
		removeQuestion: (state, action: PayloadAction<Question>) => {
			state.data.filter((e) => e.id !== action.payload.id);
		},
	},
});

export const { addQuestion, removeQuestion } = questionsSlice.actions;

export const selectQuestions = (state: RootState) => state.questions.data;

export default questionsSlice.reducer;
