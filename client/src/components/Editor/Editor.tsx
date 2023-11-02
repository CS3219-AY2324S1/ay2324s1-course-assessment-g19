
import React from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { useCallback, useEffect, useState } from 'react';
import PlayerCard from './PlayerCard';
import { socket } from '../../socket';
import { store } from '../../store';
import {
  selectGameData,
  selectGameId,
  selectGameOpponent,
  setGameData,
  setGameId,
  setGamePlayers,
  setGameQuestion
} from '../../features/play/gameSlice';
import { useSelector } from 'react-redux';
import { ChatMessage, QuestionDifficulty, User } from '../../types';
import { setIsActive } from '../../features/play/playSlice';
import { selectCurrentUser } from '../../features/user/authSlice';
import { reset as resetChat } from '../../features/play/chatSlice';

const Editor = () => {

  const [code, setCode] = React.useState('public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}');
  const [output, setOutput] = React.useState('');
  const [isRunning, setIsRunning] = React.useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const gameId = useSelector(selectGameId);
  const data = useSelector(selectGameData);
  const opponentPlayer = useSelector(selectGameOpponent);
        
        
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const message = event.target.value;

      socket.emit('message_send', { message, gameId });
    },
    [socket, gameId]
  );

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunCode = async () => {
    try {
      console.log("handleRunCode called");
      setIsRunning(true);

      const response = await axios.post(`http://localhost:8000/run-code`, {
        source_code: code,
        language_id: 62, // Update this to the correct language_id for Java
      });
      console.log(code);
  
      const token = response.data.token;
  
      if (token) {
        console.log('Submission token:', token);
  
        const maxAttempts = 10;
        let attempts = 0;
        let resultResponse;
  
        while (attempts < maxAttempts) {
          resultResponse = await axios.get(`http://localhost:8000/submission/${token}`);
          console.log('Submission result:', resultResponse.data);
  
          if (resultResponse.data.status_id === 3) { // Assuming status_id 3 means 'Finished'
            setOutput(resultResponse.data.stdout || resultResponse.data.stderr || 'No output');
            setIsRunning(false);
            return;
          } else if (resultResponse.data.status_id > 3) { // Statuses higher than 3 indicate an error or other non-successful state
            setOutput('Error executing code');
            setIsRunning(false);
            return;
          }
  
          attempts++;
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
        }
  
        setOutput('Execution timed out');
        setIsRunning(false);

      } else {
        console.error('No token received from the server');
        setOutput('Error executing code: No token received');
        setIsRunning(false);

      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error executing code:', error.response?.data || error.message);
      } else {
        console.error('An unknown error occurred');
      }
      setOutput('Error executing code');
      setIsRunning(false);

    }
  };

  useEffect(() => {
    socket.on(
      'confirm_game',
      (
        id: string,
        question: QuestionDifficulty,
        playerOne: User,
        playerTwo: User
      ) => {
        store.dispatch(setIsActive(true));
        store.dispatch(setGameId(id));
        store.dispatch(setGameQuestion(question));
        store.dispatch(setGamePlayers([playerOne, playerTwo]));
        store.dispatch(resetChat());
      }
    );

    socket.on('message_recv', (msg: string) => {
      store.dispatch(setGameData(msg));
    });
  }, [currentUser, socket, store]);

  return (
    <div className="flex flex-col py-8 pl-8 w-full h-full">
      <PlayerCard player={opponentPlayer} />

      {/* Code Execution Section */}
      <div className="border-4 border-dashed border-gray-800 flex flex-grow rounded-lg my-4">
        <AceEditor
          mode="java"
          theme="github"
          onChange={handleCodeChange}
          name="code_editor"
          value={code}
          editorProps={{ $blockScrolling: true }}
          style={{ width: '100%', height: '300px' }} // Set a fixed height
        />
      </div>
      <button
        onClick={handleRunCode}
        className="my-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isRunning}
      >
        {isRunning ? "Running..." : "Run Code"}
      </button>

      <div className="border-2 border-dashed border-gray-800 rounded-lg my-4 p-2">
        <p>Output:</p>
        <pre>{output}</pre>
      </div>

      {/* Chat Section */}
      <div className="border-4 border-dashed border-gray-800 flex flex-col flex-grow justify-center items-center rounded-lg my-4 gap-4">
        {gameId && (
          <>
            <div className="flex flex-row bg-gray-800 w-full h-full gap-4">
              <textarea
                placeholder="Message"
                className="flex m-4 rounded-lg bg-transparent text-white text-sm px-4 py-2 w-full flex-grow overflow-auto resize-none"
                onChange={onChange}
                value={data}
              />
            </div>
          </>
        )}
      </div>

      <PlayerCard self />
    </div>
  );

};

export default Editor;
