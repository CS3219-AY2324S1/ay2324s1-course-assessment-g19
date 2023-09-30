import { User } from '../../types';
import PlayerCard from './PlayerCard';

const player: User = {
  id: '1',
  name: 'Titus Lowe',
  email: 'titus@lol.com',
  imgSrc:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const Editor = () => {
  return (
    <div className="flex flex-col py-8 pl-8 w-full h-full">
      <PlayerCard />

      <div className="border-4 border-dashed border-gray-800 flex flex-grow rounded-lg my-4">
        Editor
      </div>

      <PlayerCard player={player} />
    </div>
  );
};

export default Editor;
