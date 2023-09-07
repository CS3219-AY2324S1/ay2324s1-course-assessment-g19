import { useDispatch, useSelector } from 'react-redux';
import {
	addQuestion,
	selectQuestions,
} from '../features/questions/questionsSlice';
import QuestionHeader from './QuestionHeader';
import QuestionRow from './QuestionRow';

const QuestionTable = () => {
	const dispatch = useDispatch();
	const data = useSelector(selectQuestions);

	const addRow = () => {
		const newRow = {
			id: data.length + 1,
			title: 'Test Title',
			description: 'Test Description',
			category: 'Test Category',
			complexity: 'Test Complexity',
		};

		dispatch(addQuestion(newRow));
	};

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
				onClick={addRow}
				className="m-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
			>
				Add
			</button>
		</div>
	);
};

export default QuestionTable;
