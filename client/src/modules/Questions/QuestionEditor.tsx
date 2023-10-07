import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { editQuestion } from '../../features/questions/creatorSlice';
import { selectQuestionById } from '../../features/questions/questionsSlice';
import { store } from '../../store';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QuestionDifficulty } from '../../types';

const QuestionEditor = () => {
  let { id } = useParams();
  const question = id && useSelector(selectQuestionById(id));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    in: '',
    out: '',
    explanation: '',
    constraints: [''],
    difficulty: 'EASY' as QuestionDifficulty
  });

  useEffect(() => {
    console.log('i am updating again');
    if (question) {
      setFormData({
        title: question.title || '',
        description: question.description || '',
        in: question.examples[0].in || '',
        out: question.examples[0].out || '',
        explanation: question.examples[0].explanation || '',
        constraints: question.constraints || [''],
        difficulty: question.difficulty || 'EASY'
      });
    }
  }, [question]);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (question) {
        console.log('I AM EDITIGN', formData);

        const updatedQuestion = {
          _id: id,
          title: formData.title,
          description: formData.description,
          constraints: formData.constraints,
          difficulty: formData.difficulty,
          createdAt: question.createdAt,
          updatedAt: new Date(),
          examples: [
            {
              in: formData.in,
              out: formData.out,
              explanation: formData.explanation
            }
          ],
          tags: [], // Assuming tags is an empty array for now
          __v: 0 // Assuming __v is always 0 for a question
        };

        const _data = {
          id: id || '',
          question: updatedQuestion
        };
        store.dispatch(editQuestion(_data));
      }
    },
    [store, question]
  );

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log('CHANGING TO', formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto bg-gray-500 p-6 rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="in" className="block text-gray-700 font-bold mb-2">
              In
            </label>
            <input
              type="text"
              id="in"
              name="in"
              value={formData.in}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="out" className="block text-gray-700 font-bold mb-2">
              Out
            </label>
            <input
              type="text"
              id="out"
              name="out"
              value={formData.out}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="explanation"
              className="block text-gray-700 font-bold mb-2"
            >
              Explanation
            </label>
            <input
              type="text"
              id="explanation"
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="constraints"
              className="block text-gray-700 font-bold mb-2"
            >
              Constraints (comma-separated)
            </label>
            <input
              type="text"
              id="constraints"
              name="constraints"
              value={formData.constraints.join(',')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  constraints: e.target.value.split(',')
                })
              }
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="difficulty"
              className="block text-gray-700 font-bold mb-2"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            >
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save changes
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white mx-4 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionEditor;
