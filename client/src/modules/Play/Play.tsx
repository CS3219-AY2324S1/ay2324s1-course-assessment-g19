import PlayBox from '../../components/Playbox/PlayBox';

const Play = () => {
  return (
    <div className="flex flex-row w-full justify-between h-screen">
      {/* CODE EDITOR */}
      <div className="border-4 border-dashed border-gray-800 flex flex-grow m-8 rounded-lg">
        Editor
      </div>

      {/* PLAYBOX */}
      <PlayBox />
    </div>
  );
};

export default Play;
