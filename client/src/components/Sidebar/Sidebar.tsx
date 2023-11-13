import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';
import { logoutUser, selectCurrentUser } from '../../features/user/authSlice';
import { store } from '../../store';
import Sidetab from './Sidetab';
import { useCallback } from 'react';
import { socket } from '../../socket';
import { selectGameId } from '../../features/play/gameSlice';
import { current } from '@reduxjs/toolkit';

const Sidebar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const gameId = useSelector(selectGameId);

  const tabs = [
    { label: 'Play', href: '/play' },
    { label: 'Questions', href: '/questions' }
  ];

  const onLogout = useCallback(() => {
    if (!gameId || !currentUser) {
      return;
    }

    socket.emit('leave_game', { gameId, currentUser });
    store.dispatch(logoutUser());
  }, [store, gameId, currentUser]);

  return (
    <div className="flex flex-col justify-between bg-gray-800 rounded-r-xl w-36">
      <div className="flex flex-col">
        <div className="flex flex-shrink-0 p-4 items-center">
          <img className="h-8 w-auto" src={logo} alt="Your Company" />
        </div>
        {tabs.map((tab, index) => (
          <Sidetab key={index} label={tab.label} href={tab.href} />
        ))}

        {!currentUser && (
          <div className="flex flex-col py-2">
            <a
              href="/register"
              className="text-gray-100 text-center bg-gray-500 shadow-xl transition hover:scale-95 hover:shadow-inner hover:opacity-75 px-4 py-2 mx-4 my-2 rounded-lg cursor-pointer"
            >
              Register
            </a>
            <a
              href="/login"
              className="text-gray-800 text-center bg-gray-100 shadow-xl transition hover:scale-95 hover:shadow-inner hover:opacity-75 px-4 py-2 mx-4 my-2 rounded-lg cursor-pointer"
            >
              Sign in
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-col pb-8">
        {currentUser && (
          <a className="flex flex-col items-center gap-4 p-4" href="/settings">
            <img
              className="h-12 w-12 rounded-full border-2 border-gray-500 cursor-pointer"
              src={currentUser.imgSrc || avatar}
              alt="Your avatar"
            />
            <span className="text-gray-100 bg-gray-700 w-full text-center text-sm p-1 rounded-md cursor-pointer transition hover:bg-gray-500">
              {currentUser.name}
            </span>
          </a>
        )}

        {currentUser && (
          <button
            onClick={onLogout}
            className="text-white text-sm rounded-lg p-2 m-4 bg-gray-700 transition hover:bg-gray-500 cursor-pointer"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 inline-block mr-2" />
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
