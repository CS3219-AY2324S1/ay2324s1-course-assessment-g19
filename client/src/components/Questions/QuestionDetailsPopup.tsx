import { Question } from '../../types';
import { store } from '../../store';
import {
  createQuestion,
  editQuestion
} from '../../features/questions/creatorSlice';
import { fetchQuestions } from '../../features/questions/questionsSlice';
import QuestionTitleWrite from './Write/QuestionTitle';
import QuestionTitleRead from './Read/QuestionTitle';
import QuestionDifficultyWrite from './Write/QuestionDifficulty';
import QuestionDifficultyRead from './Read/QuestionDifficulty';
import QuestionDescriptionWrite from './Write/QuestionDescription';
import QuestionDescriptionRead from './Read/QuestionDescription';
import QuestionExamplesWrite from './Write/QuestionExamples';
import QuestionExamplesRead from './Read/QuestionExamples';
import QuestionConstraintsWrite from './Write/QuestionConstraints';
import QuestionConstraintsRead from './Read/QuestionConstraints';

const QuestionDetailsPopup = (
  question: Question,
  onCloseView: Function,
  onCancelEdit: Function,
  onOpenEdit: Function,
  isAdmin: boolean,
  mode: 'CREATE' | 'EDIT' | 'VIEW'
) => {
  const isEditMode = mode === 'CREATE' || mode === 'EDIT';

  const onSave = () => {
    if (mode === 'EDIT') {
      store.dispatch(editQuestion({ id: question._id, question: question }));
    } else if (mode === 'CREATE') {
      store.dispatch(createQuestion(question));
    }
    store.dispatch(fetchQuestions());
    onCloseView();
  };

  return (
    <div className="flex justify-center items-start pt-10 z-50 bg-black bg-opacity-30 w-[calc(100vw-136px)] h-screen absolute rounded-l-xl">
      <div className="flex flex-col justify-center items-center overflow-auto max-h-[94vh] w-3/4 transition-all duration-75 ease-in-out pb-4">
        <div className="flex flex-col gap-8 bg-slate-50 px-12 py-8 w-11/12 shadow-2xl rounded-2xl overflow-y-scroll">
          <h1 className="flex justify-center text-xl font-semibold">
            Question Details
          </h1>
          <hr />
          {isEditMode ? <QuestionTitleWrite /> : <QuestionTitleRead />}
          {isEditMode ? (
            <QuestionDifficultyWrite />
          ) : (
            <QuestionDifficultyRead />
          )}
          {isEditMode ? (
            <QuestionDescriptionWrite />
          ) : (
            <QuestionDescriptionRead />
          )}
          {isEditMode ? <QuestionExamplesWrite /> : <QuestionExamplesRead />}
          {isEditMode ? (
            <QuestionConstraintsWrite />
          ) : (
            <QuestionConstraintsRead />
          )}
        </div>
        <div className="flex flex-row gap-4 justify-center pt-4">
          {isAdmin && (
            <>
              {isEditMode ? (
                <>
                  <button
                    onClick={() => onSave()}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => onCancelEdit()}
                    className="bg-gray-500 text-white px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onOpenEdit(question)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                >
                  Edit
                </button>
              )}
            </>
          )}
          {!isEditMode && (
            <button
              onClick={() => onCloseView()}
              className="bg-gray-500 text-white px-4 py-2 rounded-xl"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailsPopup;
