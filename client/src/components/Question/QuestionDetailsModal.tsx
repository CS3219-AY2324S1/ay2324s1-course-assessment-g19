import { useDispatch, useSelector } from 'react-redux';
import {
	closeQuestionDetailsModal,
	selectQuestionDetailsModal,
} from '../../features/modal/modalSlice';
import Heading from '../Heading';
import Modal from '../Modal';

const QuestionDetailsModal = () => {
	const dispatch = useDispatch();
	const modal = useSelector(selectQuestionDetailsModal);

	if (!modal.data) return null;

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title={modal.data?.title} />
			<section>
				<header className="font-semibold">Category</header>
				<p className="px-8 py-2">{modal.data?.category}</p>
				<hr />
			</section>
			<section>
				<header className="font-semibold">Complexity</header>
				<p className="px-8 py-2">{modal.data?.complexity}</p>
				<hr />
			</section>
			<section>
				<header className="font-semibold">Description</header>
				<p className="px-8 py-2 text-ellipsis overflow-hidden">
					{modal.data?.description}
				</p>
			</section>
		</div>
	);

	return (
		<Modal
			isOpen={modal.isOpen}
			title="Add Question"
			onClose={onClose}
			body={bodyContent}
		/>
	);

	function onClose() {
		dispatch(closeQuestionDetailsModal());
	}
};

export default QuestionDetailsModal;
