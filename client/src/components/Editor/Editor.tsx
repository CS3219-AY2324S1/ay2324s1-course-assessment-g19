import React from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import { useCallback, useEffect, useState } from 'react';
import PlayerCard from './PlayerCard';
import { socket } from '../../socket';
import { store } from '../../store';
import {
  selectGameData,
  selectGameId,
  selectGameOpponent,
  selectGameOutput,
  setGameData,
  setGameId,
  setGamePlayers,
  setGameQuestion
} from '../../features/play/gameSlice';
import { useSelector } from 'react-redux';
import { QuestionDifficulty, User } from '../../types';
import { setIsActive } from '../../features/play/playSlice';
import { selectCurrentUser } from '../../features/user/authSlice';
import { reset as resetChat } from '../../features/play/chatSlice';
import 'ace-builds/src-noconflict/theme-tomorrow_night'; // A dark theme
import './styles.css';
import Cookies from 'js-cookie';

const Editor = () => {
  const output = useSelector(selectGameOutput);
  const currentUser = useSelector(selectCurrentUser);
  const gameId = useSelector(selectGameId);
  const data = useSelector(selectGameData);
  const opponentPlayer = useSelector(selectGameOpponent);

  const onChange = useCallback(
    (message: string) => {
      socket.emit('message_send', { message, gameId });
    },
    [socket, gameId]
  );

  useEffect(() => {
    const cachedGameId = Cookies.get('gameId');

    if (cachedGameId) {
      socket.emit('check_game', { gameId: cachedGameId });
    }
  }, [socket]);

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

        Cookies.set('gameId', id);
      }
    );

    socket.on('message_recv', (msg: string) => {
      store.dispatch(setGameData(msg));
    });
  }, [currentUser, socket, store]);

  return (
    <div className="flex flex-col py-8 pl-8 w-full h-full">
      <PlayerCard player={opponentPlayer} />

      <div className="flex flex-col flex-grow rounded-lg gap-8 bg-gray-800 my-4 py-8">
        <AceEditor
          mode="java"
          theme="tomorrow_night"
          onChange={onChange}
          name="code_editor"
          value={data}
          editorProps={{ $blockScrolling: true }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="flex flex-col gap-1 text-white text-sm mb-4">
        <a className="text-semibold bg-gray-800 p-4 rounded-t-lg">Console</a>
        <pre className="bg-gray-800 p-4 h-32 rounded-b-lg">{output}</pre>
      </div>

      <PlayerCard self />
    </div>
  );
};

export default Editor;
