import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { setCurrentQuestion } from '../../features/play/playSlice';
import {
  fetchQuestions,
  selectQuestions
} from '../../features/questions/questionsSlice';
import { store } from '../../store';
import { Question } from '../../types';
import { toCamelCase } from '../../utils/string';
import { selectCurrentUser } from '../../features/user/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  createQuestion,
  deleteQuestion,
  editQuestion,
  reset,
  selectCreatorQuestion,
  setQuestionInCreator
} from '../../features/questions/creatorSlice';
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import QuestionDetailsPopup from './QuestionDetailsPopup';

const DeleteToast = (question: Question, onCloseDelete: Function) => {
  const onConfirmDelete = (question: Question) => {
    store.dispatch(deleteQuestion({ id: question._id }));
    onCloseDelete();
  };

  return (
    <div className="flex justify-center items-start pt-10 z-50 bg-black bg-opacity-30 w-[calc(100vw-136px)] h-screen absolute rounded-l-xl">
      <div
        className="flex flex-col gap-4 bg-slate-50 px-12 py-8 z-50 shadow-2xl rounded-2xl"
        onClick={() => onCloseDelete()}
      >
        <h1 className="font-semibold">
          Are you sure you want to delete this question?
        </h1>
        <div className="flex flex-row gap-2 justify-center items-center">
          <button
            onClick={() => onConfirmDelete(question!)}
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

const QuestionTable = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const questions = useSelector(selectQuestions);
  const isAdmin = currentUser ? currentUser.role == 'Admin' : false;
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(
    null
  );
  const [showDeleteToast, setShowDeleteToast] = useState<boolean>(false);

  const questionInCreator = useSelector(selectCreatorQuestion);
  const [questionDeepCopy, setQuestionDeepCopy] = useState<Question | null>(
    null
  );
  const [showQuestionDeatilsPopup, setShowQuestionDetailsPopup] =
    useState<boolean>(false);
  const [mode, setMode] = useState<'CREATE' | 'EDIT' | 'VIEW'>('CREATE');

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

  const onOpenCreate = () => {
    store.dispatch(reset());
    setMode('CREATE');
    setShowQuestionDetailsPopup(true);
  };

  const onCancelEdit = () => {
    questionDeepCopy && store.dispatch(setQuestionInCreator(questionDeepCopy));
    setMode('VIEW');
  };

  const onOpenView = (question: Question) => {
    setMode('VIEW');
    store.dispatch(setQuestionInCreator(question));
    setShowQuestionDetailsPopup(true);
  };

  const onCloseView = () => {
    setShowQuestionDetailsPopup(false);
  };

  const handleDelete = (question: Question) => {
    setQuestionToDelete(question);
    setShowDeleteToast(true);
  };

  const onCloseDelete = () => {
    setShowDeleteToast(false);
  };

  return (
    <>
      {showQuestionDeatilsPopup &&
        QuestionDetailsPopup(
          questionInCreator!,
          onCloseView,
          onCancelEdit,
          onOpenEdit,
          isAdmin,
          mode
        )}
      {showDeleteToast && DeleteToast(questionToDelete!, onCloseDelete)}
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
                            onClick={() => handleDelete(question)}
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
