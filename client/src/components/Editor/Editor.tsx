import PlayerCard from './PlayerCard';

const Editor = () => {
  return (
    <div className="flex flex-col py-8 pl-8 w-full h-full">
      <PlayerCard player={undefined} />

      <div className="border-4 border-dashed border-gray-800 flex flex-grow rounded-lg my-4">
        Editor
      </div>

      <PlayerCard self />
    </div>
  );
};

export default Editor;
