import React from 'react';

interface SidetabProps {
  label: string;
  href: string;
}

const Sidetab: React.FC<SidetabProps> = ({ label, href }) => {
  return (
    <a href={href} className="text-white p-4 transition hover:bg-gray-300">
      {label}
    </a>
  );
};

export default Sidetab;
