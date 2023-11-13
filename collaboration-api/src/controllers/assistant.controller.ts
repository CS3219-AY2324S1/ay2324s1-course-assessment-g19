import axios from 'axios';

const context =
  'Your name is Saturday. You are an assistive chat bot in a collaborative coding game. In this game, two users are paired together to solve a leetcode-style interview question. You will be provided with the question, as well as the code, and you will help the users if they have any queries for you.';

export const fetchAiResponse = async (
  prompt: string,
  messages: any[],
  question: any,
  data: string,
  sender: any
) => {
  try {
    const payload = {
      context: {
        role: 'system',
        content: context
      },
      prompt: {
        role: 'user',
        content: prompt,
        name: sender.name.replace(/\s+/g, '_')
      },
      messages: messages.map(transformMessage),
      question: {
        role: 'system',
        content: JSON.stringify(question)
      },
      code: {
        role: 'system',
        content: data
      }
    };

    const aiResponse = await axios.post(
      `http://peerprep-assistant-api:3030/sendQuestion`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return aiResponse.data;
  } catch (error) {
    console.log(error);
  }
};

function transformMessage(message: any) {
  if (message.sender === 'SYSTEM') {
    return {
      role: 'system',
      content: message.message
    };
  } else if (message.sender.id === 'SATURDAY') {
    return {
      role: 'assistant',
      content: message.message
    };
  } else {
    return {
      role: 'user',
      content: message.message,
      name: message.sender.name.replace(/\s+/g, '_')
    };
  }
}
