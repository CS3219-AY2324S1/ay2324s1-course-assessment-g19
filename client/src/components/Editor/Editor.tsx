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
  selectGameStartedAt,
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
  selectLanguages,
  setDifficulty,
  setIsActive
} from '../../features/play/playSlice';
import { selectCurrentUser } from '../../features/user/authSlice';
import { setChatMessages } from '../../features/play/chatSlice';
import 'ace-builds/src-noconflict/theme-tomorrow_night'; // A dark theme
import './styles.css';
import Cookies from 'js-cookie';
import { Language } from '../../types';

const Editor = () => {
  const isActive = useSelector(selectIsActive);
  const output = useSelector(selectGameOutput);
  const currentUser = useSelector(selectCurrentUser);
  const gameId = useSelector(selectGameId);
  const data = useSelector(selectGameData);
  const opponentPlayer = useSelector(selectGameOpponent);

  const onChange = useCallback(
    (data: string) => {
      socket.emit('data_send', { data, gameId });
    },
    [socket, gameId]
  );

  const languages = useSelector(selectLanguages); // Get the languages from the store
  const currentLanguage = useSelector(selectLanguage) || languages[0]; // Get the current language from the store

  const pythonLanguage = languages.find(language => language.name.includes("Python (3.8.1)"));
  const javaLanguage = languages.find(language => language.name.includes("Java (JDK 17.0.6)"));
  const javascriptLanguage = languages.find(language => language.name.includes("JavaScript (Node.js 12.14.0)"));
  const csharpLanguage = languages.find(language => language.name.includes("C#"));
  const rubyLanguage = languages.find(language => language.name.includes("Ruby"));

  const modes = new Map<Language, string>();

  if (pythonLanguage) {
  modes.set(pythonLanguage, 'python');
  }
  if (javaLanguage) {
  modes.set(javaLanguage, 'java');
  }
  if (javascriptLanguage) {
  modes.set(javascriptLanguage, 'javascript');
  }
  if (csharpLanguage) {
  modes.set(csharpLanguage, 'csharp');
  }
  if (rubyLanguage) {
  modes.set(rubyLanguage, 'ruby');
  } 
  
  
  const getModeForLanguage = (language: Language) => {
    return modes.get(language) || 'text';
  };

  const code = new Map<Language, string>();

  if (pythonLanguage) {
    code.set(pythonLanguage, `# Python sample code
    print("Hello, World!")`);
    }
    if (javaLanguage) {
    code.set(javaLanguage,`// Java sample code
    public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }`);
    }
    if (javascriptLanguage) {
    code.set(javascriptLanguage, `// JavaScript sample code
    console.log("Hello, World!");`);
    }
    if (csharpLanguage) {
    code.set(csharpLanguage, `// C# sample code
    using System;
    
    class Program {
        static void Main() {
            Console.WriteLine("Hello, World!");
        }
    }`);
    }
    if (rubyLanguage) {
    code.set(rubyLanguage, `# Ruby sample code
    puts 'Hello, World!'`);
    } 
    
  
  const getSampleCodeForLanguage = (language:Language) => {
    // Assuming language.name gives the language name like 'Python', 'Java', etc.
    return code.get(language) || '';
  };

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
          mode={getModeForLanguage(currentLanguage)}
          theme="tomorrow_night"
          onChange={onChange}
          name="code_editor"
          value={data || getSampleCodeForLanguage(currentLanguage)}         
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
