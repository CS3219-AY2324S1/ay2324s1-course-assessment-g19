import { useSelector } from 'react-redux';
import Editor from '../../components/Editor/Editor';
import PlayBox from '../../components/Playbox/PlayBox';
import Question from '../../components/Questions/Question';
import { selectIsActive } from '../../features/play/playSlice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Play = () => {
  const isActive = useSelector(selectIsActive);

  return (
    <div className="flex flex-row w-full justify-between h-screen max-h-screen">
      {/* CODE EDITOR */}
      <ToastContainer position="top-center" autoClose={3000} />
      <Editor />
      {/* PLAYBOX */}
      {isActive ? <Question /> : <PlayBox />}
    </div>
  );
};

export default Play;
