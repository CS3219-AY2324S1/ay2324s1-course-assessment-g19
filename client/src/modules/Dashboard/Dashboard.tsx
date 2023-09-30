import PlayBox from '../../components/Dashboard/PlayBox';
import QuestionTable from '../../components/Dashboard/QuestionTable';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <PlayBox />
      <QuestionTable />
    </div>
  );
};

export default Dashboard;
