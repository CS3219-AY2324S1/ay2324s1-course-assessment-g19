interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h3 className="flex flex-row justify-between items-center text-md text-gray-400 font-semibold">
      {title}
    </h3>
  );
};

export default SectionHeader;
