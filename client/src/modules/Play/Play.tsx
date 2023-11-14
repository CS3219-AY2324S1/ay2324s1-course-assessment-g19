import { useSelector } from 'react-redux';
import Editor from '../../components/Editor/Editor';
import PlayBox from '../../components/Playbox/PlayBox';
import PlayQuestion from '../../components/PlayQuestion/PlayQuestion';
import { selectIsActive } from '../../features/play/playSlice';
import 'react-toastify/dist/ReactToastify.css';

const Play = () => {
  const isActive = useSelector(selectIsActive);

  return (
    <div className="flex flex-row w-full justify-between h-screen max-h-screen">
      {/* CODE EDITOR */}
      <Editor />
      {/* PLAYBOX */}
      {isActive ? <PlayQuestion /> : <PlayBox />}
    </div>
  );
};

export default Play;
