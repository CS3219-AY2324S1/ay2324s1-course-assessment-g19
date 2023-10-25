import { Question, QuestionDifficulty, QuestionExample } from '../../types';
import { store } from '../../store';
import {
  addConstraint,
  addExample,
  createQuestion,
  deleteConstraint,
  deleteExample,
  editQuestion,
  setQuestionInCreator,
  updateConstraint,
  updateDescription,
  updateDifficulty,
  updateExample,
  updateTitle
} from '../../features/questions/creatorSlice';
import { fetchQuestions } from '../../features/questions/questionsSlice';
import { toCamelCase } from '../../utils/string';
import { PlusIcon, XCircleIcon } from '@heroicons/react/24/solid';

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
      <div className="flex flex-col justify-center items-center overflow-auto max-h-[96vh] w-3/4 transition-all duration-75 ease-in-out pb-4">
        <div className="flex flex-col gap-8 bg-slate-50 px-12 py-8 w-11/12 shadow-2xl rounded-2xl overflow-y-scroll">
          <h1 className="flex justify-center text-xl font-semibold">
            Question Details
          </h1>
          <hr />
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Title</h3>
            {isEditMode ? (
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2"
                defaultValue={question.title}
                onChange={(e) => store.dispatch(updateTitle(e.target.value))}
              />
            ) : (
              <p>{question.title}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Difficulty</h3>
            {isEditMode ? (
              <select
                className="border-transparent border-r-8 rounded-md p-2 outline outline-1 outline-gray-300"
                defaultValue={question.difficulty}
                onChange={(e) =>
                  store.dispatch(
                    updateDifficulty(e.target.value as QuestionDifficulty)
                  )
                }
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            ) : (
              <p>{toCamelCase(question.difficulty)}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Description</h3>
            {isEditMode ? (
              <textarea
                className="border border-gray-300 rounded-md p-2 whitespace-pre-wrap"
                defaultValue={question.description}
                onChange={(e) =>
                  store.dispatch(updateDescription(e.target.value))
                }
              />
            ) : (
              <p className="whitespace-pre-wrap">{question.description}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Examples</h3>
            <div className="flex flex-col gap-4">
              {isEditMode ? (
                <>
                  {question.examples.map((example, index) => (
                    <div
                      key={index}
                      className="relative border border-[0.5] bg-white p-4 rounded-xl"
                    >
                      <XCircleIcon
                        className="absolute top-2 right-2 w-5 h-5 text-red-500 hover:cursor-pointer"
                        onClick={(e) =>
                          store.dispatch(
                            deleteExample({ example: example, index: index })
                          )
                        }
                      />
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                          <div className="flex flex-col w-1/2 gap-2">
                            <h4 className="font-semibold">In</h4>
                            <input
                              type="text"
                              className="border border-gray-300 rounded-md p-2"
                              defaultValue={example.in}
                              onChange={(e) =>
                                store.dispatch(
                                  updateExample({
                                    example: {
                                      ...example,
                                      in: e.target.value
                                    },
                                    index: index
                                  })
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col w-1/2 gap-2">
                            <h4 className="font-semibold">Out</h4>
                            <input
                              type="text"
                              className="border border-gray-300 rounded-md p-2"
                              defaultValue={example.out}
                              onChange={(e) =>
                                store.dispatch(
                                  updateExample({
                                    example: {
                                      ...example,
                                      out: e.target.value
                                    },
                                    index: index
                                  })
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <h4 className="font-semibold">Explanation</h4>
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2"
                            defaultValue={example.explanation}
                            onChange={(e) =>
                              store.dispatch(
                                updateExample({
                                  example: {
                                    ...example,
                                    explanation: e.target.value
                                  },
                                  index: index
                                })
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      store.dispatch(
                        addExample({
                          in: '',
                          out: '',
                          explanation: ''
                        })
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                  >
                    <PlusIcon className="h-5 w-5 inline-block" />
                  </button>
                </>
              ) : (
                question.examples.map((example, index) => (
                  <div key={index}>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2">
                        <div className="flex flex-col w-1/2 gap-2">
                          <h4 className="font-semibold">In</h4>
                          <p>{example.in}</p>
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
                          <h4 className="font-semibold">Out</h4>
                          <p>{example.out}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4 className="font-semibold">Explanation</h4>
                        <p>{example.explanation}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
          <div
            className="flex flex-col
            gap-2"
          >
            <h3 className="font-semibold">Constraints</h3>
            {isEditMode ? (
              <>
                {question.constraints.map((constraint, index) => (
                  <div
                    key={index}
                    className="relative border border-[0.5] bg-white p-4 rounded-xl"
                  >
                    <XCircleIcon
                      className="absolute top-2 right-2 w-5 h-5 text-red-500 hover:cursor-pointer"
                      onClick={(e) =>
                        store.dispatch(
                          deleteConstraint({
                            constraint: constraint,
                            index: index
                          })
                        )
                      }
                    />
                    <input
                      key={index}
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      defaultValue={constraint}
                      onChange={(e) =>
                        store.dispatch(
                          updateConstraint({
                            constraint: e.target.value,
                            index: index
                          })
                        )
                      }
                    />
                  </div>
                ))}
                <button
                  onClick={() => store.dispatch(addConstraint(''))}
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                >
                  <PlusIcon className="h-5 w-5 inline-block" />
                </button>
              </>
            ) : (
              <ul className="list-disc list-inside text-gray-700">
                {question.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            )}
          </div>
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
