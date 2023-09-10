import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import QuestionDetailsModal from './components/Question/QuestionDetailsModal.tsx';
import QuestionModal from './components/Question/QuestionModal.tsx';
import './index.css';
import { store } from './store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<QuestionModal />
			<QuestionDetailsModal />
		</Provider>
	</React.StrictMode>
);
