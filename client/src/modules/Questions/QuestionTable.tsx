import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectQuestions } from '../../features/questions/questionsSlice';
import { store } from '../../store';
import { Question } from '../../types';
import { toCamelCase } from '../../utils/string';
import { selectCurrentUser } from '../../features/user/authSlice';
import {
  reset,
  selectCreatorQuestion,
  setQuestionInCreator
} from '../../features/questions/creatorSlice';
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import QuestionDetailsPopup from '../../components/Questions/QuestionDetailsPopup';
import ConfirmDeleteToast from '../../components/Questions/ConfirmDeleteToast';

const QuestionTable = () => {
  const currentUser = useSelector(selectCurrentUser);
  const questions = useSelector(selectQuestions);
  const isAdmin = currentUser ? currentUser.role == 'Admin' : false;
  const [showDeleteToast, setShowDeleteToast] = useState<boolean>(false);
  const questionInCreator = useSelector(selectCreatorQuestion);
  const [questionDeepCopy, setQuestionDeepCopy] = useState<Question | null>(
    null
  );
  const [showQuestionDetailsPopup, setShowQuestionDetailsPopup] =
    useState<boolean>(false);
  const [mode, setMode] = useState<'CREATE' | 'EDIT' | 'VIEW'>('CREATE');

  const onOpenCreate = () => {
    setMode('CREATE');
    store.dispatch(reset());
    setShowQuestionDetailsPopup(true);
  };

  const onOpenEdit = (question: Question) => {
    setQuestionDeepCopy({
      ...question,
      examples: [...question.examples],
      constraints: [...question.constraints]
    });
    setMode('EDIT');
    store.dispatch(setQuestionInCreator(question));
    setShowQuestionDetailsPopup(true);
  };

  const onOpenView = (question: Question) => {
    setMode('VIEW');
    store.dispatch(setQuestionInCreator(question));
    setShowQuestionDetailsPopup(true);
  };

  const onOpenDelete = (question: Question) => {
    store.dispatch(setQuestionInCreator(question));
    setShowDeleteToast(true);
  };

  const onCancelEdit = () => {
    if (mode === 'EDIT') {
      questionDeepCopy &&
        store.dispatch(setQuestionInCreator(questionDeepCopy));
      setMode('VIEW');
    } else if (mode === 'CREATE') {
      store.dispatch(reset());
      setShowQuestionDetailsPopup(false);
    }
  };

  const onCloseView = () => {
    setShowQuestionDetailsPopup(false);
  };

  const onCloseDelete = () => {
    setShowDeleteToast(false);
  };

  return (
    <>
      {showQuestionDetailsPopup &&
        QuestionDetailsPopup(
          questionInCreator,
          onCloseView,
          onCancelEdit,
          onOpenEdit,
          isAdmin,
          mode
        )}
      {showDeleteToast && ConfirmDeleteToast(questionInCreator, onCloseDelete)}
      <div className="flex justify-center w-full">
        <div className="flex flex-col flex-grow gap-4 w-full p-4">
          <div className="flex flex-row justify-center items-center text-neutral-500 bg-slate-50 rounded-2xl p-4 shadow-lg sticky">
            <div className="w-1/12 flex justify-center">Index</div>
            <div className="w-3/12 flex justify-center">Title</div>
            <div className="w-4/12 flex justify-center">Description</div>
            <div className="w-2/12 flex justify-center">Difficulty</div>
            <div className="w-2/12 flex justify-center">Actions</div>
          </div>
          {!currentUser ? (
            <div className="flex justify-center items-center">
              Please log in to view questions
            </div>
          ) : questions.length > 0 ? (
            <div className="flex flex-col">
              {questions.map((question: Question, index: number) => (
                <div
                  key={index}
                  className={`flex flex-row gap-4 justify-center bg-slate-50 transition ease-in-out duration-200 cursor-pointer p-4 hover:bg-neutral-300 hover:shadow-lg
              ${index !== 0 && 'border-t'} 
              ${index === 0 && 'rounded-t-2xl'} 
              ${index === questions.length - 1 && 'rounded-b-2xl'}
              `}
                >
                  <div className="w-1/12 flex justify-center items-center">
                    {index + 1}.
                  </div>
                  <div className="w-3/12 flex flex-wrap justify-center items-center">
                    <p className="line-clamp-1 whitespace-pre-wrap ">
                      {question.title}
                    </p>
                  </div>
                  <div className="w-4/12 flex flex-wrap justify-start items-center">
                    <p className="line-clamp-1 whitespace-pre-wrap ">
                      {question.description}
                    </p>
                  </div>
                  <div className="w-2/12 flex justify-center items-center">
                    {toCamelCase(question.difficulty)}
                  </div>
                  <div className="w-2/12 flex justify-center items-center">
                    <div className="flex flex-row gap-4 justify-center">
                      <EyeIcon
                        className="h-5 w-5 inline-block"
                        onClick={() => onOpenView(question)}
                      />
                      {isAdmin && (
                        <>
                          <PencilSquareIcon
                            className="h-5 w-5 inline-block"
                            onClick={() => onOpenEdit(question)}
                          />
                          <TrashIcon
                            className="h-5 w-5 inline-block"
                            onClick={() => onOpenDelete(question)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center">No questions found</div>
          )}
          {isAdmin && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => onOpenCreate()}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              >
                Create Question
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionTable;
