import axios from "axios";

export const sendQuestion = async (input: string) => {
  try {
    console.log("SENDING QN: ", input);
    const payload = {
      content: input
    }
    const resp = await axios.post('/assistant-api//sendQuestion', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return resp.data.choices[0].message.content
  } catch (error) {
    console.log(error);
  }
}
