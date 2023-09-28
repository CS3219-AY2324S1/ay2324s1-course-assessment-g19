interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h3 className="flex flex-row justify-between items-center text-md text-neutral-500 font-semibold">
      {title}
    </h3>
  );
};

export default SectionHeader;
