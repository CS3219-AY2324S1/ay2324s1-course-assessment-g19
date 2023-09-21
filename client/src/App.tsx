import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {useState} from "react";
import * as React from "react";
import { Outlet } from "react-router-dom";

function App() {
	const [currentForm, setCurrentForm] = useState('login');

	const toggleForm = (formName) => {
		setCurrentForm(formName);
	}
	return (
		<main className="p-24">
			<h1 className="text-3xl font-bold">G19 Assessment</h1>
			{/*<section className="p-8">*/}
			{/*	<QuestionTable />*/}
			{/*</section>*/}
			{
				currentForm === 'login' ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
			}
			<Outlet />
		</main>

	);
}

export default App;
