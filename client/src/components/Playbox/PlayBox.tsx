import {
  ArchiveBoxIcon,
  CodeBracketIcon,
  PuzzlePieceIcon,
  TrophyIcon,
  UserGroupIcon,
  UserPlusIcon,
  VariableIcon
} from '@heroicons/react/24/outline';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDifficulty,
  selectLanguage,
  setCurrentQuestion,
  setDifficulty,
  setIsActive,
  setLanguage
} from '../../features/play/playSlice';
import { selectQuestionByDifficulty, selectQuestionByTitle } from '../../features/questions/questionsSlice';
import { store } from '../../store';
import { QuestionDifficulty } from '../../types';
import ConfigSelect from './ConfigSelect';
import PlayTab from './PlayTab';
import QuestionSelect from './QuestionSelect';
import {selectCurrentUser} from "../../features/user/authSlice";
import {findMatch} from "../../features/collaboration/collaborationSlice"; // Import axios for making API requests
import CountUpTimerPopup from "./CountUpTimer";



const languages = ['javascript', 'python', 'java', 'c++', 'c#'];
const difficulties: QuestionDifficulty[] = ['EASY', 'MEDIUM', 'HARD'];

const PlayBox = () => {
  const language = useSelector(selectLanguage);
  const difficulty = useSelector(selectDifficulty);
  const [tab, setTab] = useState('GAME');
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const [partnerFound, setPartnerFound] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [partnerUsername, setPartnerUsername] = useState(""); // Store partner's username
  const [timer, setTimer] = useState(0); // Store the timer


  const handlePartnerFound = (partnerUser: string) => {
    setPartnerFound(true);
    setPartnerUsername(partnerUser);
    console.log("handlePartnerFound");
  };
  

  const handlePartnerNotFound = () => {
    setShowPopup(false);
    setShowFailed(true);
    console.log("handlePartnerNotFound");
    // Trigger actions when no partner is found
    // For example, show a message or take other actions
  };

  const handleFindingPartner = () => {
    setShowFailed(false);
    setShowPopup(true);
    console.log("handleFindingPartner");
    // Trigger actions when no partner is found
    // For example, show a message or take other actions
  };

  const findMatchCallbackProps = {
    onPartnerFound: handlePartnerFound,
    onPartnerNotFound: handlePartnerNotFound,
    onFindingPartner: handleFindingPartner,
  };

  const tabs = [
    {
      label: 'GAME',
      icon: <PuzzlePieceIcon className="h-4 w-4" />
    },
    {
      label: 'HISTORY',
      icon: <ArchiveBoxIcon className="h-4 w-4" />
    },
    {
      label: 'FRIENDS',
      icon: <UserGroupIcon className="h-4 w-4" />
    }
  ];

  const onSetLanaguage = useCallback(
    (l: string) => {
      store.dispatch(setLanguage(l));
    },
    [store]
  );

  const onSetDifficulty = useCallback(
    (d: QuestionDifficulty) => {
      store.dispatch(setDifficulty(d));
    },
    [store]
  );

  // TODO: Get question from question server
  const selectedQuestion = useSelector(selectQuestionByDifficulty(difficulty|| 'EASY'));

  const onFindMatch = useCallback(async() => {
    setTimer(0);
    setShowFailed(false);
    store.dispatch(setCurrentQuestion(selectedQuestion));
    //store.dispatch(setIsActive(true));

    try {
      await findMatch(store.getState(), findMatchCallbackProps);
    } catch (error) {
      console.error("Error:", error);
    }

  }, [selectedQuestion]);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    if (showPopup && !partnerUsername) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1); // Use functional update
      }, 1000);
    }
  
    if (timer >= 30) {
      // After 30 seconds with no partner, close the popup
      setPartnerUsername(""); // Clear partner's username
      console.log("timer >=30");
      if (interval) {
        clearInterval(interval);
      }
    }
  
    return () => {
      // Clear the interval when the component unmounts
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showPopup, partnerUsername, timer]);
  
  
  


  let render;

  if (tab === 'GAME') {
    render = (
      <>
        <ConfigSelect
          option="language"
          selected={language}
          callback={onSetLanaguage}
          options={languages}
          icon={<CodeBracketIcon className="h-4 w-4" />}
        />
        <ConfigSelect
          option="difficulty"
          selected={difficulty}
          callback={onSetDifficulty}
          options={difficulties}
          icon={<VariableIcon className="h-4 w-4" />}
        />
        <button
          onClick={onFindMatch}
          className="font-semibold text-gray-800 w-64 py-4 bg-gray-100 rounded-lg transition hover:scale-95 hover:shadow-inner"
        >
          Find a Match

          {showPopup && (
            <CountUpTimerPopup
              timer={timer}
              partnerUsername={partnerUsername}
            />
          )}
          {showFailed && (
              <div>
              <h2>Failed to find a match</h2>
              <p style={{ marginTop: '10px' }}>Click to try again</p>
            </div>
          )}

        </button>
        <QuestionSelect />
        <a className="flex flex-grow" />
        <button
          onClick={() => alert('Play!')}
          className="flex justify-center items-center gap-2 font-semibold text-gray-100 w-64 py-4 bg-gray-900 rounded-lg transition hover:scale-95 hover:shadow-inner"
        >
          <UserPlusIcon className="h-4 w-4 inline-block" />
          Play a Friend
        </button>
        <button
          onClick={() => alert('Play!')}
          className="flex justify-center items-center gap-2 font-semibold text-gray-100 w-64 py-4 bg-gray-900 rounded-lg transition hover:scale-95 hover:shadow-inner"
        >
          <TrophyIcon className="h-4 w-4 inline-block" />
          Tournaments
        </button>
      </>
    );
  } else if (tab === 'HISTORY') {
    render = (
      <div className="flex flex-col items-center">
        <a className="text-white">TO IMPLEMENT</a>
      </div>
    );
  } else if (tab === 'FRIENDS') {
    render = (
      <div className="flex flex-col items-center">
        <a className="text-white">TO IMPLEMENT</a>
      </div>
    );
  }

  return (
    
    <div className="flex flex-col p-8">
      <div className="flex flex-row justify-between bg-gray-700 w-full text-gray-100 text-sm">
        {tabs.map((item, index) => (
          <PlayTab
            key={index}
            item={item.label}
            icon={item.icon}
            tab={tab}
            setTab={setTab}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4 items-center p-8 bg-gray-800 rounded-b-lg h-full opacity-80 w-[448px]">
        {render}
      </div>
    </div>
  );
};

export default PlayBox;
