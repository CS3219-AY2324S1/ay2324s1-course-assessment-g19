import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Question } from '../../types';
import { generateRandomId } from '../../utils/random';

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
			// TODO: Remove random ID generation when integrate with backend
			const question = {
				...action.payload,
				id: generateRandomId(),
			};

			if (state.data.map((e) => e.title).includes(question.title)) {
				throw new Error('Question already exists!');
			}

			state.data.push(question);
		},
		removeQuestion: (state, action: PayloadAction<Question>) => {
			state.data = state.data.filter((e) => e.id !== action.payload.id);
		},
	},
});

export const { addQuestion, removeQuestion } = questionsSlice.actions;

export const selectQuestions = (state: RootState) => state.questions.data;

export default questionsSlice.reducer;
