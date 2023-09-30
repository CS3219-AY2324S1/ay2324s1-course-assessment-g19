import React from 'react';

interface FootertabProps {
  label: string;
  href: string;
}

const Footertab: React.FC<FootertabProps> = ({ label, href }) => {
  return (
    <a
      href={href}
      className="px-4 py-2 text-sm text-gray-300 transition hover:underline"
    >
      {label}
    </a>
  );
};

export default Footertab;
