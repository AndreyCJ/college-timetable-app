import React, { useState } from "react";

const WeekContext = React.createContext();

const WeekProvider = ({ children }) => {
  const [state, setState] = useState({
    week: ''
  });
  
  return (
    <WeekContext.Provider value={[state, setState]}>
      {children}
    </WeekContext.Provider>
  );
}

export { WeekContext, WeekProvider };