import { useEffect, useState } from 'react';
import PlayerCard from './PlayerCard';
import { socket } from '../../socket';
import { store } from '../../store';
import { selectGameData, setGameData } from '../../features/play/gameSlice';
import { useSelector } from 'react-redux';

const Editor = () => {
  const data = useSelector(selectGameData);
  const [message, setMessage] = useState('');

  const onClick = () => {
    socket.emit('message_send', message);
  };

  useEffect(() => {
    socket.on('message_recv', (msg: string) => {
      store.dispatch(setGameData(msg));
    });
  }, [socket]);

  return (
    <div className="flex flex-col py-8 pl-8 w-full h-full">
      <PlayerCard player={undefined} />

      <div className="border-4 border-dashed border-gray-800 flex flex-col flex-grow justify-center items-center rounded-lg my-4 gap-4">
        <a>{data}</a>
        <div className="flex flex-row gap-4">
          <input
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
            className="px-2"
          />
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
