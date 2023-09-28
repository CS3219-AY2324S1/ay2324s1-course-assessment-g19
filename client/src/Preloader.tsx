import { useEffect } from 'react';
import { fetchQuestions } from './features/questions/questionsSlice';
import { checkAuthStatus } from './features/user/authSlice';
import { store } from './store';

const Preloader = () => {
  useEffect(() => {
    store.dispatch(checkAuthStatus());
    store.dispatch(fetchQuestions());
  }, [store]);

  return null;
};

export default Preloader;
