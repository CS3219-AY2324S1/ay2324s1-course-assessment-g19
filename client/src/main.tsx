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
import Question from './modules/Questions/Question';
import QuestionCreator from './modules/Questions/QuestionCreator';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/dashboard" />
  },
  {
    path: '/dashboard',
    element: (
      <PageWrapper>
        <Dashboard />
      </PageWrapper>
    )
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
    path: '/question/:title',
    element: (
      <PageWrapper>
        <Question />
      </PageWrapper>
    )
  },
  {
    path: '/question/create',
    element: (
      <PageWrapper>
        <QuestionCreator />
      </PageWrapper>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Preloader />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
