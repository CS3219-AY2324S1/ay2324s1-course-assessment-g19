import { useSelector } from 'react-redux';
import avatar from '../../assets/avatar.png';
import { selectIsActive } from '../../features/play/playSlice';
import { selectCurrentUser } from '../../features/user/authSlice';
import { User } from '../../types';
import SessionButtons from './SessionButtons';
import Timer from './Timer';
import LanguageSelect from './LanguageSelect';

interface PlayerCardProps {
  self?: boolean;
  player?: User;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ self, player }) => {
  const isActive = useSelector(selectIsActive);
  const currentUser = useSelector(selectCurrentUser);

  if (self) {
    return (
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4 items-center">
          <img
            onClick={() => alert('to implement')}
            className="h-12 w-12 rounded-full border-2 border-gray-800 cursor-pointer"
            src={currentUser?.imgSrc || avatar}
            alt="Your avatar"
          />
          <a className="text-sm font-semibold text-gray-100">
            {currentUser?.name || 'Guest'}
          </a>
        </div>

        {isActive && <SessionButtons />}
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-4 items-center">
        <img
          onClick={() => alert('to implement')}
          className="h-12 w-12 rounded-full border-2 border-gray-800 cursor-pointer"
          src={player?.imgSrc || avatar}
          alt="Your avatar"
        />
        <a className="text-sm font-semibold text-gray-100">
          {player?.name || 'Opponent'}
        </a>
      </div>

      {isActive && (
        <div className="flex flex-row gap-4">
          <LanguageSelect />
          <Timer />
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
