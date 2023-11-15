import { store } from '../../store';
import { deleteQuestion } from '../../features/questions/creatorSlice';
import { Question } from '../../types';
import { fetchQuestions } from '../../features/questions/questionsSlice';

const ConfirmDeleteToast = (question: Question, onCloseDelete: Function) => {
  const onConfirmDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = await store.dispatch(deleteQuestion({ id: question._id }));
    if (data.meta.requestStatus === 'fulfilled') {
      await store.dispatch(fetchQuestions());
      onCloseDelete();
    }
  };

  return (
    <div className="flex justify-center items-start pt-10 z-50 bg-black bg-opacity-30 w-[calc(100vw-136px)] h-screen absolute rounded-l-xl">
      <div className="flex flex-col gap-4 bg-slate-50 px-12 py-8 z-50 shadow-2xl rounded-2xl">
        <h1 className="font-semibold">
          Are you sure you want to delete this question?
        </h1>
        <div className="flex flex-row gap-2 justify-center items-center">
          <button
            onClick={(e) => onConfirmDelete(e)}
            className="bg-slate-500 text-white px-4 py-2 rounded-xl hover:bg-slate-600"
          >
            Yes
          </button>
          <button
            onClick={() => onCloseDelete()}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteToast;
