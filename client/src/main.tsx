import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import QuestionDetailsModal from './components/Question/QuestionDetailsModal.tsx';
import QuestionModal from './components/Question/QuestionModal.tsx';
import {UserDashboard} from "./pages/UserDashboard";
import './index.css';
import { store } from './store.ts';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AccountSettings} from "./pages/AccountSettings";

const router = createBrowserRouter([
	{
		path:"/",
		element: <App/>,
	},
	{
		path:"/userDashboard/:username",
		element: <UserDashboard/>,
	},
	{
		path:"/accountSettings/:username",
		element:<AccountSettings/>,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<QuestionModal />
			<QuestionDetailsModal />
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
