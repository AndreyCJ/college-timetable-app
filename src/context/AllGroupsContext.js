import React, { useState } from "react";

const AllGroupsContext = React.createContext();

const AllGroupsProvider = ({ children }) => {
  const [state, setState] = useState({
    groups: 'Группы'
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
    <AllGroupsContext.Provider value={[state, setState]}>
      {children}
    </AllGroupsContext.Provider>
  );
}

export { AllGroupsContext, AllGroupsProvider };