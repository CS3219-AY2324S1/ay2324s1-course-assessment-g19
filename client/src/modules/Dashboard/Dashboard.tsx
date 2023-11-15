import QuestionTable from '../Questions/QuestionTable';
import PlayBox from '../../components/Playbox/PlayBox';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <PlayBox />
      <QuestionTable />
    </div>
  );
};

export default Dashboard;
