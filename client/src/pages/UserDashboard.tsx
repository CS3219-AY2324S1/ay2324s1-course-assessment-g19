import { useParams} from "react-router-dom";
import { Link } from 'react-router-dom';
import QuestionTable from '../components/Question/QuestionTable';

export const UserDashboard = () => {
    const {username} = useParams();

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between w-full px-4 mt-4">
                <h1 className="font-bold text-2xl">Welcome, {username}</h1>

                <Link className="hover:text-blue-600" to={`/accountSettings/${username}`}>
                    Account Settings
                </Link>
                <Link className="hover:text-blue-600" to={`/`}>
                    Log out
                </Link>

            </div>


            <section className="p-8">
                <QuestionTable />
            </section>

            <div>
            </div>
        </div>
    );

};
