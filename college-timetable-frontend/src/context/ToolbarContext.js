import React, { useState, useEffect } from "react";

const ToolbarContext = React.createContext([{}, () => {}]);

const ToolbarProvider = (props) => {
  const [state, setState] = useState({
    week: 'Четная',
    group: ['Группа']
  });

  useEffect(() => {
    const getGroups = async () => {
      const response = await fetch('/api/classTimetable/groups');
      const data = await response.json();
      const distinctGroups = [...new Set(data.map(group => group.group ))];
      setState({group: distinctGroups});
      console.log(distinctGroups); 
    }
    getGroups();
  }, [])

  return (
    <ToolbarContext.Provider value={[state, setState]}>
      {props.children}
    </ToolbarContext.Provider>
  );
}

export { ToolbarContext, ToolbarProvider };