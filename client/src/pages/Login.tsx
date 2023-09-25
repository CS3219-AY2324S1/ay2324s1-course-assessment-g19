import {useState} from "react";
import * as React from "react";
import api from './reactapi';
import {useNavigate} from "react-router-dom";
import bcrypt from 'bcryptjs';

interface LoginProps {
    onFormSwitch: (formName: string) => void;
}

export const Login = (props: LoginProps) => {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const fetchUser = async (username: string) => {
        try {
            return await api.get('/users/' + username);
        } catch (error) {
            console.log("no such user", error);
            throw error;
        }
    }

    const navigate = useNavigate();

    const showFailure = () => {
        setShowFailureMessage(true);

        // Hide the failure message after 3 seconds (adjust the duration as needed)
        setTimeout(() => {
            setShowFailureMessage(false);
        }, 3000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response;
        try {
            response = await fetchUser(username);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                showFailure();
                console.log(error.response.data.error);
            } else {
                console.error("An error occurred:", error.message);
            }
        }

        const jsonResponse = JSON.stringify(response)
        const jsonObject = JSON.parse(jsonResponse);
        console.log(jsonObject.data);
        const hashed_pw = jsonObject.data.password;
        bcrypt.compare(password, hashed_pw, async (err, result) => {
            if (err) {
                // Handle the error (e.g., log or send an error response)
                console.error('Password comparison error:', err);
            } else if (result) {
                // Passwords match, authentication successful
                console.log('Authentication successful');
                navigate(`userDashboard/${username}`);
            } else {
                // Passwords do not match, authentication failed
                showFailure();
                console.log('Authentication failed');
            }
        });
    }

    return (
        <div className="flex flex-col justify-center items-center">

            <form onSubmit={handleSubmit}>
                <h1 className="text-purple text-center font-bold mb-4">Login</h1>
                <div className="border rounded mb-2">
                    <input className="py-1 px-2 w-full" value={username} onChange={(e) => setUser(e.target.value)} type="text" placeholder="Username" required/>
                </div>
                <div className="border rounded mb-2">
                    <input className="py-1 px-2 w-full" value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required/>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-400 rounded text-white hover:bg-blue-600 py-1 px-2 w-full" type="submit">Login</button>
                </div>

            </form>
            <p className="mt-2">Don't have an account? <span className="text-blue-400 hover:text-blue-600 cursor-pointer" onClick={() => props.onFormSwitch('register')}>Register</span></p>
            {showFailureMessage && (
                <div className="bg-red-200 text-red-700 py-2 px-4 rounded-md mb-4">
                    Wrong username or password.
                </div>
            )}
        </div>
    )
}
