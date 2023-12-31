import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-github';
import { useCallback, useEffect } from 'react';
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
  setGameOutput,
  setGamePlayers,
  setGameQuestions,
  setGameStartedAt
} from '../../features/play/gameSlice';
import { useSelector } from 'react-redux';
import {
  fetchLanguagesAndSetLanguage,
  selectIsActive,
  selectLanguage,
  setDifficulty,
  setIsActive
} from '../../features/play/playSlice';
import { selectCurrentUser } from '../../features/user/authSlice';
import {
  setChatMessages,
  setIsAssistantLoading
} from '../../features/play/chatSlice';
import 'ace-builds/src-noconflict/theme-tomorrow_night'; // A dark theme
import './styles.css';
import Cookies from 'js-cookie';

const Editor = () => {
  const isActive = useSelector(selectIsActive);
  const output = useSelector(selectGameOutput);
  const currentUser = useSelector(selectCurrentUser);
  const gameId = useSelector(selectGameId);
  const data = useSelector(selectGameData);
  const opponentPlayer = useSelector(selectGameOpponent);
  const language = useSelector(selectLanguage);

  const onChange = useCallback(
    (data: string) => {
      socket.emit('data_send', { data, gameId });
    },
    [socket, gameId]
  );

  useEffect(() => {
    const cachedGameId = Cookies.get('gameId');

    if (!isActive && cachedGameId) {
      socket.emit('check_game', { gameId: cachedGameId });
    }
  }, [socket]);

  useEffect(() => {
    socket.on('update', (roomData) => {
      const {
        gameId,
        startedAt,
        difficulty,
        questions,
        language,
        data,
        output,
        messages,
        playerOne,
        playerTwo,
        isAssistantLoading
      } = roomData;

      store.dispatch(setIsActive(true));
      store.dispatch(setGameId(gameId));
      store.dispatch(setGameStartedAt(startedAt));
      store.dispatch(setDifficulty(difficulty));
      store.dispatch(setGameQuestions(questions));
      store.dispatch(setGamePlayers([playerOne, playerTwo]));
      store.dispatch(setGameData(data));
      store.dispatch(setGameOutput(output));
      store.dispatch(setChatMessages(messages));
      store.dispatch(setIsAssistantLoading(isAssistantLoading));
      store.dispatch(fetchLanguagesAndSetLanguage(language));

      Cookies.set('gameId', gameId);
    });
  }, [currentUser, socket, store]);

  return (
    <div className="flex flex-col py-8 pl-8 w-full h-full">
      <PlayerCard player={opponentPlayer} />

      <div className="flex flex-col flex-grow rounded-lg gap-8 bg-gray-800 my-4 py-8">
        <AceEditor
          mode={language?.slug ?? 'text'}
          theme="tomorrow_night"
          onChange={onChange}
          fontSize={14}
          name="code_editor"
          value={isActive ? data : language?.boilerplate ?? ''}
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
