import { useContext } from 'react';
import { GroupContext } from '../context/GroupsContext';

const useGroupContext = () => {
  const [state, setState] = useContext(GroupContext);

  const setCurrentGroup = (newGroup) => {
    setState({ currentGroup: newGroup });
  };

  return {
    ...state,
    setCurrentGroup
  }
};

export default useGroupContext;