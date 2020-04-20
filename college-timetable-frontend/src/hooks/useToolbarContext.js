import { useContext } from 'react';
import { ToolbarContext } from '../context/ToolbarContext';

const useToolbarContext = () => {
  const [state, setState] = useContext(ToolbarContext);

  const setWeek = (newWeek) => {
    setState({ week: newWeek });
  };

  const setGroup = (newGroup) => {
    setState({ group: newGroup})
  };

  return {
    ...state,
    setWeek,
    setGroup
  }
};

export default useToolbarContext;