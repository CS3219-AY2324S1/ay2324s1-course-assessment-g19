import { useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "./reactapi";


export const UserDashboard = () => {
    const [new_username, setNewUser] = useState('');
    const [new_password, setNewPass] = useState('');
    const {username} = useParams();
    const [currentUsername, setCurrentUsername] = useState(username);

    const deleteAccount = async () => {
        await api.delete(`/users/${username}`);
        console.log("deleted:", {username});
    }

    const navigate = useNavigate();

    const changeUsername = async (e) => {
        e.preventDefault()
        await api.put(`/change-user/${currentUsername}/${new_username}`);
        setCurrentUsername(new_username);
        console.log("username updated from " + username + " to " + new_username);
        navigate(`/userDashboard/${new_username}`);
    }
    const changePassword = async () => {}

    return (
        <div>
            <h1>Welcome to your Dashboard, {currentUsername}</h1>

            <form onSubmit={changeUsername}>
                <h1>Change Username</h1>
                <input value={new_username} onChange={(e) => setNewUser(e.target.value)} type="text" placeholder="New Username" required/>
                <button type="submit">Confirm change</button>
            </form>

            <form onSubmit={changePassword}>
                <h1>Change Password</h1>
                <input value={new_password} onChange={(e) => setNewPass(e.target.value)} type="text" placeholder="New Password" required/>
                <button type="submit">Confirm change</button>
            </form>

            <button onClick={deleteAccount}> delete account </button>
        </div>
    );

    // const [authenticated, setAuthenticated] = useState(null);
    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("authenticated");
    //     if (loggedInUser) {
    //         setAuthenticated(loggedInUser);
    //     }
    // }, []);
    //
    // if (!authenticated) {
    //     return <Navigate replace to="/login" />;
    // } else {
    //     return (
    //         <div>
    //             <p>Welcome to your Dashboard</p>
    //         </div>
    //     );
    // }

};

