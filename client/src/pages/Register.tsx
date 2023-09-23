import {useState} from "react";
import * as React from "react";
import api from './reactapi';
import bcrypt from 'bcryptjs';


export const Register = (props: { onFormSwitch: (arg0: string) => void; }) => {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === confirmPass) {

            const saltRounds = 10; // Number of salt rounds
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const formData = {
                username: username,
                password: hashedPassword,
            };
            console.log(formData);
            await api.post('/users/', formData);
            props.onFormSwitch('login');

        } else {
            console.log("passwords do not match")
        }

    }

    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit}>
                <h1 className="text-purple text-center font-bold mb-4">Register</h1>
                <div className="border rounded mb-2">
                    <input className= "py-1 px-2 w-full" value={username} onChange={(e) => setUser(e.target.value)} type="text" placeholder="Username" required/>
                </div>
                <div className="border rounded mb-2">
                    <input className= "py-1 px-2 w-full" value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required/>
                </div>
                <div className="border rounded mb-2">
                    <input className= "py-1 px-2 w-full" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="Confirm Password" required/>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-400 rounded text-white hover:bg-blue-600 py-1 px-2 w-full" type="submit">Register</button>
                </div>
            </form>
            <p className="mt-2">Already have an account? <span className="text-blue-400 hover:text-blue-600 cursor-pointer" onClick={() => props.onFormSwitch('login')}>Sign in</span></p>
        </div>
    )
}