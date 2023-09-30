import React from 'react';
import { toCamelCase } from '../../utils/string';

interface PlayTabProps {
  item: string;
  icon: React.ReactNode;
  tab: string;
  setTab: (tab: string) => void;
}

const PlayTab: React.FC<PlayTabProps> = ({ item, icon, tab, setTab }) => {
  return (
    <div
      onClick={() => setTab(item)}
      className={`flex flex-col flex-grow justify-center items-center p-3 text-xs gap-1 bg-gray-800 rounded-t-lg cursor-pointer transition hover:opacity-80 ${
        tab === item && 'opacity-80'
      }`}
    >
      {icon}
      {toCamelCase(item)}
    </div>
  );
};

export default PlayTab;
