import {useState} from "react";
import * as React from "react";
import api from './reactapi';

export const Register = (props) => {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');


    const handleSubmit = async (e) => {
        if (password === confirmPass) {
            const formData = {
                username: username,
                password: password,
            };
            console.log(formData);
            await api.post('/users/', formData);
            props.onFormSwitch('login');

        } else {
            e.preventDefault();
            console.log("passwords do not match")
        }

    }

    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div>
                    <input value={username} onChange={(e) => setUser(e.target.value)} type="text" placeholder="Username" required/>
                </div>
                <div>
                    <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required/>
                </div>
                <div>
                    <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="Confirm Password" required/>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
            <button onClick={() => props.onFormSwitch('login')}>Already have an account? Sign in</button>
        </div>
    )
}