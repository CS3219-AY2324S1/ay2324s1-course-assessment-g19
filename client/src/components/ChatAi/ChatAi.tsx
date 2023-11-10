import { useState, useEffect } from 'react';
import { sendQuestion } from '../../features/play/aiSlice';

const ChatAi = () => {
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');

  const callOpenAI = async () => {
    const resp = await sendQuestion(input);
    setResponse(resp)
  };

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <input className="mb-4" 
        type="text"
        value={input}
        onChange={handleInputChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={callOpenAI}
      >
        Call OpenAI API
      </button>
      <p className="mt-4 text-white">{response}</p>
    </div>
  );
};

export default ChatAi;
