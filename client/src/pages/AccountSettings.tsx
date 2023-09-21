import { useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import api from "./reactapi";

export const AccountSettings = () => {
    const [new_username, setNewUser] = useState('');
    const [old_password, setOldPass] = useState('');
    const [new_password, setNewPass] = useState('');
    const [confirm_new_password, setNewConfirmPass] = useState('');
    const {username} = useParams();
    const [currentUsername, setCurrentUsername] = useState(username);
    const [showUserSuccessMessage, setShowUserSuccessMessage] = useState(false);
    const [showUserFailureMessage, setShowUserFailureMessage] = useState(false);
    const [showPassSuccessMessage, setShowPassSuccessMessage] = useState(false);
    const [showPassFailureMessage, setShowPassFailureMessage] = useState(false);

    const deleteAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmDelete) {
            await api.delete(`/users/${username}`);
            console.log("deleted:", {username});
        }
    }

    const navigate = useNavigate();

    const showUserSuccess = () => {
        setShowUserSuccessMessage(true);

        // Hide the success message after 3 seconds (adjust the duration as needed)
        setTimeout(() => {
            setShowUserSuccessMessage(false);
        }, 3000);
    };

    const showUserFailure = () => {
        setShowUserFailureMessage(true);

        // Hide the failure message after 3 seconds (adjust the duration as needed)
        setTimeout(() => {
            setShowUserFailureMessage(false);
        }, 3000);
    };

    const showPassSuccess = () => {
        setShowPassSuccessMessage(true);

        // Hide the success message after 3 seconds (adjust the duration as needed)
        setTimeout(() => {
            setShowPassSuccessMessage(false);
        }, 3000);
    };

    const showPassFailure = () => {
        setShowPassFailureMessage(true);

        // Hide the failure message after 3 seconds (adjust the duration as needed)
        setTimeout(() => {
            setShowPassFailureMessage(false);
        }, 3000);
    };

    const changeUsername = async (e) => {
        try {
            e.preventDefault()
            await api.put(`/change-user/${currentUsername}/${new_username}`);
            setCurrentUsername(new_username);
            console.log("username updated from " + username + " to " + new_username);
            navigate(`/accountSettings/${new_username}`);
            showUserSuccess();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                showUserFailure();
                console.log("Username clash error:", error.response.data.error);
            } else {
                console.error("An error occurred:", error.message);
            }
        }
        
    }



    const changePassword = async (e) => {
        try {
            e.preventDefault();

            // Check if new password and confirmation match
            if (new_password !== confirm_new_password) {
                showPassFailure();
                console.log("New password and confirmation do not match");
                return;
            }

            // Verify the old password before changing
            const response = await api.post(`/verify-password/${currentUsername}`, {
                password: old_password,
            });

            if (response.status === 200) {
                // Old password is correct; proceed to change password
                await api.put(`/change-password/${currentUsername}`, {
                    password: new_password,
                });
                console.log("Password updated successfully");
                showPassSuccess();
            } else {
                // Old password is incorrect
                showPassFailure();
                console.log("Incorrect old password");
            }
        } catch (error) {
            showPassFailure();
            console.error("An error occurred:", error.message);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <p>username: {currentUsername}</p>

            <div className="w-full px-4 mt-4">
                <div className="flex justify-center">
                    <h1 className="font-bold text-2xl">Account Settings</h1>
                </div>
                <div className="flex justify-end">
                    <Link className="hover:text-blue-600" to={`/userDashboard/${username}`}>
                        Home
                    </Link>
                </div>

                {showUserSuccessMessage && (
                    <div className="bg-green-200 text-green-700 py-2 px-4 rounded-md mb-4">
                        Username successfully changed!
                    </div>
                )}

                {showUserFailureMessage && (
                    <div className="bg-red-200 text-red-700 py-2 px-4 rounded-md mb-4">
                        Username clash error. Please choose a different username.
                    </div>
                )}
            </div>

            <form className="border rounded p-4 mb-4" onSubmit={changeUsername}>
                <h1 className="text-purple font-bold mb-4">Edit Username</h1>
                <div>
                    <input className="border rounded mb-2 py-1 px-2 w-full" value={new_username} onChange={(e) => setNewUser(e.target.value)} type="text" placeholder="New Username" required/>
                </div>
                <div>
                    <button className="bg-blue-400 hover:bg-blue-600 text-white rounded py-1 px-2 w-full" type="submit">Confirm change</button>
                </div>
            </form>

            {showPassSuccessMessage && (
                <div className="bg-green-200 text-green-700 py-2 px-4 rounded-md mb-4">
                    Password successfully changed!
                </div>
            )}

            {showPassFailureMessage && (
                <div className="bg-red-200 text-red-700 py-2 px-4 rounded-md mb-4">
                    Incorrect password or passwords do not match.
                </div>
            )}
            <form className="border rounded p-4 mb-4" onSubmit={changePassword}>
                <h1 className="text-purple font-bold mb-4">Edit Password</h1>
                <div>
                    <input className="border rounded mb-2 py-1 px-2 w-full" value={old_password} onChange={(e) => setOldPass(e.target.value)} type="password" placeholder="Old Password" required/>
                </div>
                <div>
                    <input className="border rounded mb-2 py-1 px-2 w-full" value={new_password} onChange={(e) => setNewPass(e.target.value)} type="password" placeholder="New Password" required/>
                </div>
                <div>
                    <input className="border rounded mb-2 py-1 px-2 w-full" value={confirm_new_password} onChange={(e) => setNewConfirmPass(e.target.value)} type="password" placeholder="Confirm New Password" required/>
                </div>
                <div>
                    <button className="bg-blue-400 hover:bg-blue-600 text-white rounded py-1 px-2 w-full" type="submit">Confirm change</button>
                </div>

            </form>

            <div className="rounded p-4 mb-4">
                <button className="bg-red-400 hover:bg-red-600 text-white rounded py-1 px-2 w-full" onClick={deleteAccount}> delete account </button>
            </div>

        </div>
    );

};

