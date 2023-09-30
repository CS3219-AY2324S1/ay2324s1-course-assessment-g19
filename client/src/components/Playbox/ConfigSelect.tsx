import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';
import { toCamelCase } from '../../utils/string';

interface ConfigSelectProps {
  option: string;
  selected: any;
  callback: (e: any) => void;
  options: any[];
  icon: React.ReactNode;
}

const ConfigSelect: React.FC<ConfigSelectProps> = ({
  option,
  selected,
  callback,
  options,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback((e: any) => {
    callback(e);
    setIsOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center justify-between gap-4 text-center w-64 p-4 rounded-lg text-gray-100 bg-gray-500 shadow-inner cursor-pointer transition hover:opacity-90"
      >
        {icon}
        <a className="text-sm font-medium">
          {toCamelCase(selected) || toCamelCase(option)}
        </a>
        <ChevronDownIcon className="h-4 w-4 inline-block" />
      </div>
      {isOpen && (
        <div className="flex flex-col rounded-lg">
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item)}
              className={`gap-4 w-64 p-4  text-gray-100 bg-gray-500 cursor-pointer transition hover:opacity-90 ${
                index === 0 && 'rounded-t-lg'
              } ${index === options.length - 1 && 'rounded-b-lg'}`}
            >
              <a className="text-sm">{toCamelCase(item)}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfigSelect;
