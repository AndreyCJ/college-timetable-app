import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './app.css';

import { WeekProvider } from '../../context/WeekContext';
import { GroupProvider } from '../../context/GroupsContext';
import { AllGroupsProvider } from '../../context/AllGroupsContext';

import PageContainer from '../pageContainer/pageContainer';

const App = (props) => {
  return (
      <Router>
        <GroupProvider>
          <WeekProvider>
            <AllGroupsProvider>
              <PageContainer />
            </AllGroupsProvider>
          </WeekProvider>
        </GroupProvider>
      </Router>
  );
};

export default App;