import { useContext } from 'react';
import { AllGroupsContext } from '../context/AllGroupsContext';

const useAllGroupsContext = () => {
  const [state, setState] = useContext(AllGroupsContext);

  const setAllGroups = (newGroup) => {
    setState({ groups: newGroup });
  };

  return {
    ...state,
    setAllGroups
  }
};

export default useAllGroupsContext;