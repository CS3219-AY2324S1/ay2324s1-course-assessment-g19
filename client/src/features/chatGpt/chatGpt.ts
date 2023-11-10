import axios from 'axios';

export const sendQuestion = async (prompt: string, max_tokens: Number) => {
  try {
    const response = await axios.get('/collaboration-api');
    //collaboration-api/openai
    //'http://peerprep-collaboration-api:5001/openai'
    // const response = await axios.post('/http://localhost:5001/collaboration-api/openai', {
    //   prompt: prompt,
    //   max_tokens: max_tokens
    // });
    return response;
  } catch (error) {
    console.error('Error sending question to server:', error);
    throw error;
  }
};

export default sendQuestion;

