import { socket } from '../../socket';
import { store } from '../../store';
import { useSelector } from 'react-redux';
import { selectChatMessages } from '../../features/play/chatSlice';
import { selectCurrentUser } from '../../features/user/authSlice';
import { ChatMessage } from '../../types';
import { useEffect, useState } from 'react';
import { selectGameId } from '../../features/play/gameSlice';

const Chat = () => {
  const currentUser = useSelector(selectCurrentUser);
  const messages = useSelector(selectChatMessages);
  const gameId = useSelector(selectGameId);

  const [messageInput, setMessageInput] = useState<string>('');

  if (!currentUser) return null;

  const handleSendMessage = () => {
    const time = new Date(Date.now());
    const payload: ChatMessage = {
      id: `game-${gameId}-user-${currentUser.id}-${time.toLocaleString()}`,
      sender: currentUser,
      message: messageInput,
      timestamp: time,
      gameId: gameId
    };

    console.log(payload);
    socket.emit('chat_message_send', payload);
    setMessageInput('');
  };

  return (
    <div className="flex flex-col gap-1 items-center bg-gray-800 rounded-lg h-full opacity-80 w-[448px] overflow-auto">
      <div className="flex flex-col-reverse flex-grow gap-2 justify-end items-center w-full px-4 pt-4">
        {messages.toReversed().map((message, index) => (
          <div key={index} className="w-full">
            <div
              className={`rounded-xl break-words flex flex-col gap-1 w-full items-${
                message.sender === 'SYSTEM'
                  ? 'center'
                  : message.sender.id === currentUser.id
                  ? 'start bg-gray-700 p-2'
                  : 'end bg-gray-900 p-2'
              }`}
            >
              <span
                className={`text-sm mx-2 ${
                  message.sender === 'SYSTEM' ? 'text-gray-400' : 'text-white'
                }`}
              >
                {message.message}
              </span>
            </div>
            {message.sender !== 'SYSTEM' && (
              <span
                className={`flex text-[10px] font-extralight italic px-2 pt-2 text-white justify-${
                  message.sender.id === currentUser.id ? 'end' : 'start'
                }`}
              >
                {message.sender.name}
                {' - '}
                {new Date(message.timestamp).toLocaleDateString()},{' '}
                {new Date(message.timestamp).toLocaleTimeString().slice(0, -3)}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-4 items-center w-full sticky bottom-0 bg-gray-800 p-4">
        <input
          type="text"
          className="flex-grow bg-gray-700 text-white rounded-lg p-2 break-words overflow-hidden overscroll-none"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(event) => {
            event.preventDefault();
            setMessageInput(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          className="bg-gray-700 text-white rounded-lg p-2 px-4"
          onClick={(event) => {
            event.preventDefault();
            handleSendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
