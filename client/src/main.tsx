import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import Preloader from './Preloader';
import './index.css';
import PageWrapper from './layouts/PageWrapper';
import Login from './modules/Authentication/Login';
import Register from './modules/Authentication/Register';
import Dashboard from './modules/Dashboard/Dashboard';
import Play from './modules/Play/Play';
import QuestionCreator from './modules/Questions (prev)/QuestionCreator';
import QuestonTable from './modules/Questions/QuestionTable';
import { store } from './store';
import QuestionEditor from './modules/Questions (prev)/QuestionEditor';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/play" />
  },
  {
    path: '/play',
    element: <Play />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/questions',
    element: <QuestonTable />
  },
  {
    path: '/questions/create',
    element: <QuestionCreator />
  },
  {
    path: '/questions/edit/:id',
    element: <QuestionEditor />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <Preloader />
      <PageWrapper>
        <RouterProvider router={router} />
      </PageWrapper>
    </Provider>
  </React.StrictMode>
);
