import { socket } from '../../socket';
import { useSelector } from 'react-redux';
import {
  selectChatMessages,
  selectIsAssistantLoading
} from '../../features/play/chatSlice';
import { selectCurrentUser } from '../../features/user/authSlice';
import { ChatMessage } from '../../types';
import { useEffect, useRef, useState } from 'react';
import { selectGameId } from '../../features/play/gameSlice';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { obsidian } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './styles.css';

const Chat = () => {
  const currentUser = useSelector(selectCurrentUser);
  const messages = useSelector(selectChatMessages);
  const gameId = useSelector(selectGameId);
  const isAssistantLoading = useSelector(selectIsAssistantLoading);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    socket.emit('chat_message_send', payload);
    setMessageInput('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesEndRef}
      className="flex flex-col gap-1 items-center bg-gray-800 rounded-lg h-full opacity-80 w-[448px] overflow-auto"
    >
      <div className="flex flex-col-reverse flex-grow gap-2 justify-end items-center w-full px-4 pt-4">
        {messages.toReversed().map((message, index) => {
          const parts = message.message.split('```');

          return (
            <div key={index} className="w-full">
              <div
                className={`rounded-xl break-words flex flex-col gap-1 w-full items-${
                  message.sender === 'SYSTEM'
                    ? 'center pb-2'
                    : message.sender.id === 'SATURDAY'
                    ? 'end bg-gray-100 p-2'
                    : message.sender.id === currentUser.id
                    ? 'start bg-gray-700 p-2'
                    : 'end bg-gray-900 p-2'
                }`}
              >
                {parts.map((part, partIndex) => {
                  if (partIndex % 2 === 0) {
                    return (
                      <span
                        key={partIndex}
                        className={`text-sm mx-2 ${
                          (message.isPrompt ||
                            (message.sender !== 'SYSTEM' &&
                              message.sender.id === 'SATURDAY')) &&
                          'font-semibold'
                        } ${
                          message.sender === 'SYSTEM'
                            ? 'text-gray-400'
                            : message.sender.id === 'SATURDAY'
                            ? 'text-gray-800'
                            : 'text-white'
                        }`}
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {part}
                      </span>
                    );
                  } else {
                    const lines = part.split('\n');
                    const language = lines[0];
                    const code = lines.slice(1).join('\n');

                    return (
                      <SyntaxHighlighter
                        key={partIndex}
                        language={language}
                        style={obsidian}
                        className="text-sm rounded-lg m-2"
                      >
                        {code}
                      </SyntaxHighlighter>
                    );
                  }
                })}
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
                  {new Date(message.timestamp)
                    .toLocaleTimeString()
                    .slice(0, -3)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {isAssistantLoading && (
        <div className="loading text-gray-100 w-full px-6 text-left text-xs font-semibold">
          Saturday is typing
        </div>
      )}

      <div className="flex flex-row gap-4 items-center w-full sticky bottom-0 bg-gray-800 p-4">
        <input
          type="text"
          className="flex-grow bg-gray-700 text-white text-sm rounded-lg p-2 break-words overflow-hidden overscroll-none"
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
          className="bg-gray-700 text-white text-sm rounded-lg p-2 px-4"
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
