import axios from "axios";
import {RootState} from "../../store";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

interface FindMatchProps {
    onPartnerFound: (partnerUser: string) => void; // Callback function when a partner is found
    onFindingPartner: () => void; // Callback function when searching for a partner
    onPartnerNotFound: () => void; // Callback function when no partner is found
  }

const consumeMessage = async (language:string, difficulty:string) => {
    const queue_name = `${language}-${difficulty}`;
    console.log("looking in queue: ", queue_name);
    return await axios.get(`/user-api/collaboration/check-queue/${queue_name}`);
}

const joinQueue = async (user:string, difficulty:string, language:string) => {
    const postData = {
        user: user,
        difficulty: difficulty,
        language: language,
    };

    return await axios.post(
        '/user-api/collaboration/join-queue',
        postData,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}

export const findMatch = async (state: RootState,  callbacks: FindMatchProps) => {
    const language = state.play.language;
    const difficulty = state.play.difficulty;
    const currentUser = state.authentication.currentUser;

    try {
        // Check if there are any messages in the queue
        const response = await consumeMessage(language, difficulty);
        callbacks.onFindingPartner();

        if (response.data.message != "empty") {
            // If there's a message in the queue, consume it
        
            const partnerUser = response.data.message.user
            console.log('found a partner :', partnerUser);

            const notification = {
                partner: partnerUser,
                user: currentUser.name,
            }
            // tell the partner your own username
            await axios.post(
                '/user-api/collaboration/notify-partner',
                notification,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            console.log('notification sent to ', partnerUser)

            // toast.success(`Partner found: ${response.data.message.user}`, {
            //     position: "top-right", // Adjust the position as needed
            //     autoClose: 5000, // Popup will close automatically after 5 seconds (adjust as needed)
            //     hideProgressBar: false, // Show a progress bar
            //     closeOnClick: true, // Popup will close if user clicks on it
            // });
            callbacks.onPartnerFound(partnerUser);

        } else {
            // If the queue is empty, join the queue with your message
            const postResponse = await joinQueue(currentUser.name, difficulty, language);
            console.log('no partner found, queued:', postResponse.data.message);

            function delayAsync(ms: number) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            await delayAsync(5000);
            for (let i = 0; i < 6; i++) {
                const response =  await axios.get(`/user-api/collaboration/wait-partner/${currentUser.name}`);
                if (response.data.message != "empty") {
                    console.log('partner found! your partner is: ', response.data.message.user)
                    break;
                } else if (i == 5) {
                    console.log('timeout 30 seconds no partner found')
                }
                await delayAsync(5000);
            }
            callbacks.onPartnerNotFound();

        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export const leaveQueue = async (state:RootState) => {
    const language = state.play.language;
    const difficulty = state.play.difficulty;
    const currentUser = state.authentication.currentUser;

    const response = await consumeMessage(language, difficulty);

    // someone has matched before you leave the queue
    if (response.data.message == "empty") {
        console.log("you are already matched");
    }
    // you have already been matched and another user has joined the queue
    else if (response.data.message.user != currentUser.name) {
        console.log("you are already matched, re adding wrongly removed user");
        // add the wrongly removed user back to the queue
        await joinQueue(response.data.message.user, difficulty, language);
    }
    else {
        console.log("left queue");
    }
}