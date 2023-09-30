import { User } from '../../types';

interface PlayerCardProps {
  isInterviewer?: boolean;
  player?: User;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ isInterviewer, player }) => {
  return (
    <div className="flex flex-row gap-4">
      <img
        onClick={() => alert('to implement')}
        className="h-12 w-12 rounded-full border-2 border-gray-800 cursor-pointer"
        src={player?.imgSrc}
        alt="Your avatar"
      />
      <a className="text-sm font-semibold text-gray-100">{player?.name}</a>
    </div>
  );
};

export default PlayerCard;
