import { useEffect } from 'react';
import { fetchQuestions } from './features/questions/questionsSlice';
import { store } from './store';

const Preloader = () => {
  useEffect(() => {
    store.dispatch(fetchQuestions());
  }, [store]);

  return null;
};

export default Preloader;
