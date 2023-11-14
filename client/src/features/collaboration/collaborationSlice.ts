import axios from 'axios';
import { RootState } from '../../store';
import { Language, QuestionDifficulty } from '../../types';

interface FindMatchProps {
  onJoinGame: (
    gameId: string,
    difficulty: QuestionDifficulty,
    language: string,
    boilerplate: string,
    playerOneEmail: string,
    playerTwoEmail: string
  ) => void; // Callback function when joining a game
  onPartnerFound: (partnerUser: string) => void; // Callback function when a partner is found
  onFindingPartner: () => void; // Callback function when searching for a partner
  onPartnerNotFound: () => void; // Callback function when no partner is found
}

const consumeMessage = async (language: number, difficulty: string) => {
  const queue_name = `${language}-${difficulty}`;
  return await axios.get(`/user-api/collaboration/check-queue/${queue_name}`);
};

const joinQueue = async (
  user: string,
  difficulty: string,
  language: Language
) => {
  const postData = {
    user: user,
    difficulty: difficulty,
    language: language.id
  };

  return await axios.post('/user-api/collaboration/join-queue', postData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const findMatch = async (
  state: RootState,
  callbacks: FindMatchProps
) => {
  const language = state.play.language;
  const difficulty = state.play.difficulty;
  const currentUser = state.authentication.currentUser;

  if (!language || !difficulty || !currentUser) {
    return;
  }

  try {
    // Check if there are any messages in the queue
    const response = await consumeMessage(language?.id, difficulty);
    callbacks.onFindingPartner();

    if (response.data.message.user == currentUser.email) {
      console.log('Matched with self, rejoining queue');
      await joinQueue(currentUser.email, difficulty, language);
    } else if (response.data.message != 'empty') {
      // If there's a message in the queue, consume it

      const partnerUser = response.data.message.user;

      const notification = {
        partner: partnerUser,
        user: currentUser.email
      };
      // tell the partner your own username
      await axios.post('/user-api/collaboration/notify-partner', notification, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      callbacks.onPartnerFound(partnerUser);
      callbacks.onJoinGame(
        `${currentUser.email}-${partnerUser}`,
        difficulty,
        language.name,
        language.boilerplate,
        currentUser.email,
        partnerUser
      );
    } else {
      // If the queue is empty, join the queue with your message
      const postResponse = await joinQueue(
        currentUser.email,
        difficulty,
        language
      );

      function delayAsync(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      await delayAsync(5000);
      for (let i = 0; i < 6; i++) {
        const response = await axios.get(
          `/user-api/collaboration/wait-partner/${currentUser.email}`
        );
        if (response.data.message != 'empty') {
          const partnerUser = response.data.message.user;
          callbacks.onPartnerFound(response.data.message.user);
          callbacks.onJoinGame(
            `${partnerUser}-${currentUser.email}`,
            difficulty,
            language.name,
            language.boilerplate,
            partnerUser,
            currentUser.email
          );
          break;
        } else if (i == 5) {
          callbacks.onPartnerNotFound();
        }
        await delayAsync(5000);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const leaveQueue = async (state: RootState) => {
  const language = state.play.language;
  const difficulty = state.play.difficulty;
  const currentUser = state.authentication.currentUser;

  if (!language || !difficulty || !currentUser) {
    return;
  }

  const response = await consumeMessage(language?.id, difficulty);

  // someone has matched before you leave the queue
  if (response.data.message == 'empty') {
  }
  // you have already been matched and another user has joined the queue
  else if (response.data.message.user != currentUser.email) {
    // add the wrongly removed user back to the queue
    await joinQueue(response.data.message.user, difficulty, language);
  } else {
  }
};
