import axios from 'axios';

export const fetchAiResponse = async (
  prompt: string,
  messages: any[],
  sender: any
) => {
  try {
    const payload = {
      prompt: {
        role: 'user',
        content: prompt,
        name: sender.name.replace(/\s+/g, '_')
      },
      messages: messages.map(transformMessage)
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
