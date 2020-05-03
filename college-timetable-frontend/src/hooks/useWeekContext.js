import { useContext } from 'react';
import { WeekContext } from '../context/WeekContext';

const useWeekContext = () => {
  const [state, setState] = useContext(WeekContext);

  const setWeek = (newWeek) => {
    setState({ week: newWeek });
  };

  return {
    ...state,
    setWeek
  }
};

export default useWeekContext;