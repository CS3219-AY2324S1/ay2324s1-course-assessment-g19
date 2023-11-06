import { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

const AI = () => {
  const [response, setResponse] = useState('');

  const callOpenAI = async () => {
    const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
    const apiKey = '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'; // Replace with your actual API key

    const requestData = {
      prompt: 'Once upon a time',
      max_tokens: 50,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };

    try {
      const response: AxiosResponse = await axios.post(apiUrl, requestData, { headers });

      // Access the response data as response.data
      console.log('Response Data:', response.data);
    } catch (error) {
      // Handle errors
      const axiosError = error as AxiosError;
      console.error('Error:', axiosError);

      // You can also access the error response data if available
      if (axiosError.response) {
        console.error('Error Response Data:', axiosError.response.data);
      }
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
    <div>
      <button onClick={callOpenAI}>Call OpenAI API</button>
      <p>{response}</p>
    </div>
  );
}

export default AI;

//curl -X POST -H "Authorization: Bearer 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" -H "Content-Type: application/json" -d '{"prompt": "Once upon a time", "max_tokens": 50}' https://api.openai.com/v1/engines/davinci/completions

