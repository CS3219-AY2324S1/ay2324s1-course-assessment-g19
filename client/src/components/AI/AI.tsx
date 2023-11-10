import { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { sendQuestion } from '../../features/chatGpt/chatGpt';

const AI = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const callOpenAI = async () => {
    try {
      console.log("SENDING QN: ", input);
      const response = await sendQuestion(input, 50);
      console.log('SENT QN: ', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const callOpenAI = async () => {
  //   try {
  //     const result = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
  //       prompt: 'Once upon a time',
  //       max_tokens: 50,
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': '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',
  //       },
  //     });
  //     setResponse(result.data.choices[0].text);
  //     // const res = await axios.get("https://jsonplaceholder.typicode.com/users?_limit=5");
  //     // console.log("YES>?", res);
  //     // setResponse("OK?");
  //   } catch (error) {
  //     console.error(error);
  //   }

  // }

  return (
    <div className="flex flex-col items-center">
      <input 
        type="text"
        value={input}
        onChange={handleInputChange}
        className="mb-4" 
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={callOpenAI}
      >
        Call OpenAI API
      </button>
      <p className="mt-4">{response}</p>
    </div>
  );
};

export default AI;

//curl -X POST -H "Authorization: Bearer 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" -H "Content-Type: application/json" -d '{"prompt": "Once upon a time", "max_tokens": 50}' https://api.openai.com/v1/engines/davinci/completions
