import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Modal, Question } from '../../types';

interface ModalState {
	question: Modal<Question>;
	questionDetails: Modal<Question>;
}

const initialState: ModalState = {
	question: {
		isOpen: false,
		data: undefined,
	},
	questionDetails: {
		isOpen: false,
		data: undefined,
	},
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openQuestionModal: (state) => {
			state.question.isOpen = true;
		},
		closeQuestionModal: (state) => {
			state.question.isOpen = false;
		},
		openQuestionDetailsModal: (state) => {
			state.questionDetails.isOpen = true;
		},
		updateQuestionDetailsModal: (state, action: PayloadAction<Question>) => {
			state.questionDetails.data = action.payload;
		},
		closeQuestionDetailsModal: (state) => {
			state.questionDetails.isOpen = false;
		},
	},
});

export const {
	openQuestionModal,
	closeQuestionModal,
	openQuestionDetailsModal,
	updateQuestionDetailsModal,
	closeQuestionDetailsModal,
} = modalSlice.actions;

export const selectQuestionModal = (state: RootState) => state.modal.question;
export const selectQuestionDetailsModal = (state: RootState) =>
	state.modal.questionDetails;

export default modalSlice.reducer;
