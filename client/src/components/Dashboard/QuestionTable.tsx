import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectQuestions } from '../../features/questions/questionsSlice';
import { store } from '../../store';
import { Question } from '../../types';
import { toCamelCase } from '../../utils/string';
import { selectCurrentUser } from '../../features/user/authSlice';
import { useNavigate } from 'react-router-dom';
import { deleteQuestion } from '../../features/questions/creatorSlice';

const QuestionTable = () => {
  const currentUser = useSelector(selectCurrentUser);
  const questions = useSelector(selectQuestions);
  const isAdmin = currentUser ? currentUser.role == 'Admin' : false;
  const [isToastVisible, setToastVisible] = useState(false);
  const [toDel, setToDel] = useState('');
  const [viewPopup, setViewPopup] = useState<Question | null>(null);
  const [toView, setToView] = useState(false);
  const navigate = useNavigate();

  // const handleClick = useCallback(
  //   (question: Question) => {
  //     store.dispatch(setCurrentQuestion(question));
  //   },
  //   [store]
  // );

  const handleEdit = (_id: any) => {
    const to_url = `/questions/edit/${_id}`;
    navigate(to_url);
  };

  const handleView = (question: Question) => {
    setViewPopup(question);
    setToView(true);
  };

  const handleDelete = (_id: any) => {
    showToast(_id);
  };

  const showToast = (_id: any) => {
    setToDel(_id);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const CustomToast = () => {
    return isToastVisible ? (
      <div className="custom-toast">
        <h2 className="font-black mb-2">
          Are you sure you want to delete this question?
        </h2>
        <div className="absolute bottom-0 right-0 p-2">
          <button
            onClick={() => onYesClick(toDel)}
            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
          >
            Yes
          </button>
          <button
            onClick={onCloseClick}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    ) : null;
  };

  const onYesClick = (_id: any) => {
    store.dispatch(deleteQuestion({ id: _id }));
    hideToast();
  };

  const onCloseClick = () => {
    hideToast();
  };

  const viewQuestion = () => {
    return toView && viewPopup ? (
      <div className="custom-popup">
        <h2 className="text-2xl font-bold overflow-hidden whitespace-no-wrap">
          {viewPopup.title}
        </h2>
        <div className="py-2">
          <h3 className="text-lg font-semibold">Difficulty:</h3>
          <p className="text-gray-700">{viewPopup.difficulty}</p>
        </div>
        {/* <p className="text-gray-600">Tags: {viewPopup.tags.join(', ')}</p> */}
        <div>
          <h3 className="text-lg font-semibold">Description:</h3>
          <p className="text-gray-700">{viewPopup.description}</p>
        </div>
        {/* <div>
        <h3 className="text-lg font-semibold">Examples:</h3>
        <p className="text-gray-700">{viewPopup.examples}</p>
      </div> */}
        <div className="py-2">
          <h3 className="text-lg font-semibold">In:</h3>
          <p className="text-gray-700 pb-2">{viewPopup.examples[0].in}</p>
          <h3 className="text-lg font-semibold">Out:</h3>
          <p className="text-gray-700 pb-2">{viewPopup.examples[0].out}</p>
          <h3 className="text-lg font-semibold">Explanation:</h3>
          <p className="text-gray-700">{viewPopup.examples[0].explanation}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Constraints:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {viewPopup.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
        <div className="text-gray-600">
          <p>
            Created At:{' '}
            {viewPopup.createdAt
              ? new Date(viewPopup.createdAt).toLocaleString()
              : 'N/A'}
          </p>
          <p>
            Updated At:{' '}
            {viewPopup.updatedAt
              ? new Date(viewPopup.updatedAt).toLocaleString()
              : 'N/A'}
          </p>
        </div>
        <div className="fixed bottom-0 right-0 p-2">
          <button
            onClick={() => setToView(false)}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="flex flex-col flex-grow gap-4">
      <div className="flex flex-row text-neutral-500 bg-gray-200 rounded-2xl px-4 shadow-lg">
        <div className="p-4 w-28">Status</div>
        <div className="w-80 p-4 overflow-hidden whitespace-nowrap">Title</div>
        <div className="p-4 w-28">Solution</div>
        <div className="p-4 w-32">Acceptance</div>
        <div className="p-4 w-28">Difficulty</div>
        <div className="p-4 w-28">Frequency</div>
        <div className="p-4 w-28"></div>
        {isAdmin && (
          <>
            <div className="p-4 w-10"></div>
            <div className="p-4 w-10 mx-2"></div>
          </>
        )}
      </div>

      {!currentUser ? (
        <div className="flex justify-center items-center">
          Please log in to view questions
        </div>
      ) : (
        <div className="border rounded-2xl">
          {questions.map((question: Question, index: number) => (
            <div
              key={question.title}
              //onClick={() => handleClick(question)}
              className={`flex flex-row p-2 transition cursor-pointer hover:shadow-inner ${
                index !== 0 && 'border-t'
              }
            ${index === 0 && 'rounded-t-2xl'}
            ${index === questions.length - 1 && 'rounded-b-2xl'}`}
            >
              <div className="p-4 w-28">TODO</div>
              <div className="w-80 p-4 overflow-hidden whitespace-nowrap">
                {index + 1}. {question.title}
              </div>
              <div className="p-4 w-28">TODO</div>
              <div className="p-4 w-32">TODO</div>
              <div className="p-4 w-28">{toCamelCase(question.difficulty)}</div>
              <div className="p-4 w-28">TODO</div>
              <div className="p-4 w-28">
                <button onClick={() => handleView(question)}>view</button>
              </div>

              {viewQuestion()}
              {CustomToast()}

              {isAdmin && (
                <div key={question.title}>
                  <button
                    onClick={() => handleEdit(question._id)}
                    className="p-4 w-10 font-bold"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleDelete(question._id)}
                    className="p-4 mx-2 w-10 font-bold"
                  >
                    del
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionTable;
