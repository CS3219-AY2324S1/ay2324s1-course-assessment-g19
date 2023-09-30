import Editor from '../../components/Editor/Editor';
import PlayBox from '../../components/Playbox/PlayBox';

const Play = () => {
  return (
    <div className="flex flex-row w-full justify-between h-screen max-h-screen">
      {/* CODE EDITOR */}
      <Editor />
      {/* PLAYBOX */}
      <PlayBox />
    </div>
  );
};

export default Play;
