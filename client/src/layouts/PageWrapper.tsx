import Navbar from '../components/Navbar/Navbar';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col gap-4 w-full overflow-hidden flex-grow bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
