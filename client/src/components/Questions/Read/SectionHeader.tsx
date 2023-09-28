interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h3 className="flex flex-row justify-between items-center text-md text-neutral-800 font-semibold">
      <a className="rounded-xl bg-gray-100 px-4 py-2 shadow-inner text-neutral-500">
        {title}
      </a>
    </h3>
  );
};

export default SectionHeader;
