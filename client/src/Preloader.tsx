import { useEffect } from 'react';
import { fetchQuestions } from './features/questions/questionsSlice';
import { checkAuthStatus } from './features/user/authSlice';
import { store } from './store';
import { fetchLanguages } from './features/play/playSlice';

const Preloader = () => {
  useEffect(() => {
    store.dispatch(checkAuthStatus());
    store.dispatch(fetchQuestions());
    store.dispatch(fetchLanguages());
  }, [store]);

  return null;
};

export default Preloader;
