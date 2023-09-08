import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Modal, Question } from '../../types';

interface ModalState {
	question: Modal<Question>;
}

const initialState: ModalState = {
	question: {
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
	},
});

export const { openQuestionModal, closeQuestionModal } = modalSlice.actions;

export const selectQuestionModal = (state: RootState) => state.modal.question;

export default modalSlice.reducer;
