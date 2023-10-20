import PlayerCard from './PlayerCard';
import io from 'socket.io-client';

const socket = io({ path: '/collaboration-api/' });

socket.on('connect', () => {
  console.log('connected to server');
  console.log(socket);
});

const Editor = () => {
  const onClick = () => {
    socket.emit('message', 'Hello World');
  };

  return (
    <div className="flex flex-col py-8 pl-8 w-full h-full">
      <PlayerCard player={undefined} />

      <div className="border-4 border-dashed border-gray-800 flex flex-col flex-grow justify-center items-center rounded-lg my-4">
        <div className="flex flex-row gap-4">
          <input placeholder="Message" className="px-2" />
          <button
            onClick={onClick}
            className="py-2 px-4 rounded-md bg-gray-800 text-white"
          >
            Send
          </button>
        </div>
      </div>

      <PlayerCard self />
    </div>
  );
};

export default Editor;
