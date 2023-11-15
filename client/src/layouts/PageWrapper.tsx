import Sidebar from '../components/Sidebar/Sidebar';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-row bg-gray-700">
      <Sidebar />
      <main className="flex flex-col gap-4 w-full overflow-hidden flex-grow">
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
