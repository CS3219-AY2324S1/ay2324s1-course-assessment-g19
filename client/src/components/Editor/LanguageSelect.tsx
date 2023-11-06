import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toCamelCase } from '../../utils/string';
import { useSelector } from 'react-redux';
import {
  selectLanguage,
  selectLanguages,
  setLanguage
} from '../../features/play/playSlice';
import { Language } from '../../types';
import { socket } from '../../socket';
import { store } from '../../store';
import { selectGameId } from '../../features/play/gameSlice';

const LanguageSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const language = useSelector(selectLanguage);
  const languages = useSelector(selectLanguages);
  const gameId = useSelector(selectGameId);

  const handleClick = useCallback(
    (e: Language) => {
      socket.emit('language_send', { language: e.name, gameId });
      setIsOpen(false);
    },
    [socket]
  );

  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row gap-2 justify-between w-64 h-full items-center cursor-pointer text-gray-100 px-4 py-2 bg-gray-800 rounded-lg transition hover:opacity-80"
      >
        <a>{toCamelCase(language?.name)}</a>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
      {isOpen && (
        <div className="absolute top-0 translate-y-12 z-30 flex flex-col rounded-lg max-h-96 overflow-auto">
          {languages.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item)}
              className={`gap-4 w-64 p-4 text-gray-100 bg-gray-500 cursor-pointer transition hover:opacity-90 ${
                index === 0 && 'rounded-tl-lg'
              } ${index === languages.length - 1 && 'rounded-bl-lg'}`}
            >
              <a>{toCamelCase(item.name)}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
