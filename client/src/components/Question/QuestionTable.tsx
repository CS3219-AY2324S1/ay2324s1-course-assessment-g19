import { useCallback } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { openQuestionModal } from '../../features/modal/modalSlice';
import { selectQuestions } from '../../features/questions/questionsSlice';
import QuestionHeader from './QuestionHeader';
import QuestionRow from './QuestionRow';

const QuestionTable = () => {
	const dispatch = useDispatch();
	const data = useSelector(selectQuestions);

	const onOpen = useCallback(() => {
		dispatch(openQuestionModal());
	}, [dispatch]);

	return (
		<div className="w-full">
			<table className="w-full bg-white table-fixed">
				<thead>
					<QuestionHeader />
				</thead>
				<tbody>
					{data.map((question, i) => (
						<QuestionRow key={i} index={i + 1} question={question} />
					))}
				</tbody>
			</table>
			<button
				onClick={onOpen}
				className="
						flex
						justify-center
						items-center
						my-4
						mx-11
						p-2
						cursor-pointer 
						rounded-full
						transition 
						bg-sky-500
						text-white
						hover:shadow-inner
						hover:bg-white
						hover:text-sky-500"
			>
				<AiOutlinePlus size={18} />
			</button>
		</div>
	);
};

export default QuestionTable;