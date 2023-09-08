import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openQuestionModal } from '../features/modal/modalSlice';
import { selectQuestions } from '../features/questions/questionsSlice';
import QuestionHeader from './QuestionHeader';
import QuestionRow from './QuestionRow';

const QuestionTable = () => {
	const dispatch = useDispatch();
	const data = useSelector(selectQuestions);

	const onOpen = useCallback(() => {
		dispatch(openQuestionModal());
	}, [dispatch]);

	return (
		<div className="flex flex-col items-end overflow-x-auto border border-lime-500">
			<table className="min-w-full bg-white table-auto">
				<thead>
					<QuestionHeader />
				</thead>
				<tbody>
					{data.map((question) => (
						<QuestionRow question={question} />
					))}
				</tbody>
			</table>
			<button
				onClick={onOpen}
				className="m-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
			>
				Add
			</button>
		</div>
	);
};

export default QuestionTable;
