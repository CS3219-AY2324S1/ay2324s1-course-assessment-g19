import {useState} from "react";
import * as React from "react";
import api from './reactapi';

export const Login = (props) => {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');

    const fetchUser = async (username) => {
        return await api.get('/users/' + username);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = fetchUser(username);
        console.log(response);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit}>
                <h1 className="text-purple">Login</h1>
                <div>
                    <input className="py-1" value={username} onChange={(e) => setUser(e.target.value)} type="text" placeholder="Username" required/>
                </div>
                <div>
                    <input className="py-1" value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required/>
                </div>
                <div>
                    <button className="bg-blue-400 rounded text-white hover:bg-blue-600" type="submit">Login</button>
                </div>

            </form>
            <button className="bg-red-400 rounded" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register</button>
        </div>
    )
}