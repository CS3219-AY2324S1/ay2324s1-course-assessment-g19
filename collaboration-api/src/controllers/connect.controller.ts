import axios from 'axios';

export const fetchQuestion = async (
  difficulty: string,
  questionIds: string[]
) => {
  try {
    const questionResponse = await axios.get(
      `http://peerprep-question-api:8000/questions/where?difficulty=${difficulty}&questionIds=${questionIds.join(
        ','
      )}`
    );

    return questionResponse.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchPlayers = async (
  playerOneEmail: string,
  playerTwoEmail: string
) => {
  try {
    const playerOneResponse = await axios.get(
      `http://peerprep-user-api:5050/user/?email=${playerOneEmail}`
    );
    const playerTwoResponse = await axios.get(
      `http://peerprep-user-api:5050/user/?email=${playerTwoEmail}`
    );

    const playerOne = playerOneResponse.data;
    const playerTwo = playerTwoResponse.data;

    return { playerOne, playerTwo };
  } catch (error) {
    console.error(error);
    return { playerOne: null, playerTwo: null };
  }
};
