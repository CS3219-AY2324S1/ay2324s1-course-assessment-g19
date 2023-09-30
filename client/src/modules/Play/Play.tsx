import { useSelector } from 'react-redux';
import Editor from '../../components/Editor/Editor';
import PlayBox from '../../components/Playbox/PlayBox';
import Question from '../../components/Questions/Question';
import { selectIsActive } from '../../features/play/playSlice';

const Play = () => {
  const isActive = useSelector(selectIsActive);

  return (
    <div className="flex flex-row w-full justify-between h-screen max-h-screen">
      {/* CODE EDITOR */}
      <Editor />
      {/* PLAYBOX */}
      {isActive ? <Question /> : <PlayBox />}
    </div>
  );
};

export default Play;
