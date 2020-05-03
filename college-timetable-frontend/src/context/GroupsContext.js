import React, { useState } from "react";

// const GroupContext = React.createContext([{}, () => {}]);
const GroupContext = React.createContext();

const GroupProvider = ({ children }) => {
  const [state, setState] = useState({
    currentGroup: 'Группа'
  });

  // useEffect(() => {
  //   const getGroups = async () => {
  //     const response = await fetch('/api/classTimetable/groups');
  //     const data = await response.json();
  //     const distinctGroups = [...new Set(data.map(group => group.group ))];
  //     console.log(distinctGroups[0]); 
  //     setState({ group: distinctGroups, currentGroup: distinctGroups[0] });
  //   }
  //   getGroups();
  // }, [])
  
  return (
    <GroupContext.Provider value={[state, setState]}>
      {children}
    </GroupContext.Provider>
  );
}

export { GroupContext, GroupProvider };