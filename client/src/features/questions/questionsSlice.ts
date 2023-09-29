import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Question, StatusType } from '../../types';
import { generateRandomId } from '../../utils/random';

axios.defaults.withCredentials = true;

interface QuestionsState {
	status: StatusType;
	data: Array<Question>;
	error?: string;
}

const initialState: QuestionsState = {
	status: 'DEFAULT',
	data: [],
	error: undefined,
};

export const postQuestion = createAsyncThunk(
	'questions/postQuestion',
	async (question: Question) => {
		const response = await axios.post('http://localhost:5050/questions', question);
		return response.data as Question;
	}
);

export const fetchQuestions = createAsyncThunk(
	'questions/fetchQuestions',
	async () => {
		const response = await axios.get('http://localhost:5050/questions');
		return response.data as Array<Question>;
	}
);

export const updateQuestion = createAsyncThunk(
	'questions/updateQuestion',
	async (question: Question) => {
		const response = await axios.put(`http://localhost:5050/questions/${question.id}`, question);
		return response.data as Question;
	}
);

export const deleteQuestion = createAsyncThunk(
	'questions/deleteQuestion',
	async (question: Question) => {
		console.log(question.id);
		const response = await axios.delete(`http://localhost:5050/questions/${question.id}`);
		return response.data as Question;
	}
);

export const questionsSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(postQuestion.pending, (state) => {
				state.status = 'LOADING';
			})
			.addCase(postQuestion.fulfilled, (state, action) => {
				state.data.push(action.payload);
				state.status = 'SUCCESS';
			})
			.addCase(postQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'ERROR';
			})
			.addCase(fetchQuestions.pending, (state) => {
				state.status = 'LOADING';
			})
			.addCase(fetchQuestions.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'SUCCESS';
			})
			.addCase(fetchQuestions.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'ERROR';
			})
			.addCase(deleteQuestion.pending, (state) => {
				state.status = 'LOADING';
			})
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				state.data = state.data.filter((e) => e.id !== action.payload.id);
				state.status = 'SUCCESS';
			})
			.addCase(deleteQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'ERROR';
			})
			.addCase(updateQuestion.pending, (state) => {
				state.status = 'LOADING';
			})
			.addCase(updateQuestion.fulfilled, (state, action) => {
				state.data = state.data.map((e) => {
					if (e.id === action.payload.id) {
						return action.payload;
					}
					return e;
				});
				state.status = 'SUCCESS';
			})
			.addCase(updateQuestion.rejected, (state, action) => {
				state.error = action.error.message;
				state.status = 'ERROR';
			});
		}
});

export const selectQuestions = (state: RootState) => state.questions.data;

export default questionsSlice.reducer;
