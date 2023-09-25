import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
	closeQuestionDetailsModal,
	selectQuestionDetailsModal,
} from '../../features/modal/modalSlice';
import { updateQuestion } from '../../features/questions/questionsSlice';
import { Question } from '../../types';
import { store } from '../../store';
import Heading from '../Heading';
import Input from '../Input';
import Modal from '../Modal';
import TextArea from '../TextArea';

const QuestionDetailsModal = () => {
	const modal = useSelector(selectQuestionDetailsModal);

	const [editMode, setEditMode] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	let form = useForm<FieldValues>({ defaultValues: {} });

	useEffect(() => {		
		form.setValue('title', modal.data?.title);
		form.setValue('category', modal.data?.category);
		form.setValue('complexity', modal.data?.complexity);
		form.setValue('description', modal.data?.description);
	}, [modal.data]);

	const toggleEdit = () => {
		setEditMode(!editMode);
	};

	const { register, handleSubmit, formState: { errors }, reset } = form;

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		try {
			const updatedQuestion = {
				...modal.data,
				...data,
			};
			store.dispatch(updateQuestion(updatedQuestion as Question));
			store.dispatch(closeQuestionDetailsModal());
			setEditMode(false);
			reset();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onClose = () => {
		setEditMode(false);
		store.dispatch(closeQuestionDetailsModal());
	}
		
	if (!modal.data) return null;

	const defaultBodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title={modal.data.title} />
			<section>
				<header className="font-semibold">Category</header>
				<p className="px-8 py-2 my-2">{modal.data.category}</p>
				<hr />
			</section>
			<section>
				<header className="font-semibold">Complexity</header>
				<p className="px-8 py-2 my-2">{modal.data.complexity}</p>
				<hr />
			</section>
			<section>
				<header className="font-semibold">Description</header>
				<p className="px-8 py-2 my-2 text-ellipsis overflow-hidden">
					{modal.data.description}
				</p>
			</section>
		</div>
	);

	const editModeBodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title={modal.data.title} />
			<Input
				id="category"
				label="Category"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="complexity"
				label="Complexity"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<TextArea
				id="description"
				label="Description"
				disabled={isLoading}
				register={register}
				errors={errors}
			/>
		</div>
	);

	return (
		<Modal
			isOpen={modal.isOpen}
			title="Question Details"
			actionLabel={editMode ? "Done" : "Edit"}
			onClose={onClose}
			onSubmit={editMode ? handleSubmit(onSubmit) : toggleEdit}
			body={editMode ? editModeBodyContent : defaultBodyContent}
		/>
	);
};

export default QuestionDetailsModal;
