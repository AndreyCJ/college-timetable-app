import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import TimetablesPage from '../../pages/TimetablesPages/TimetablesPage';
import CallsPage from '../../pages/CallsPage/CallsPage';

import { ToolbarProvider } from '../../context/ToolbarContext';

import './app.css';

const App = (props) => {
  const [pages] = useState([
    {
      component: TimetablesPage,
      title: 'Расписание',
      path: '/'
    },
    {
      component: CallsPage,
      title: 'Расписание звоноков',
      path: '/calls'
    }
  ]);

  return (
      <Router>
        <ToolbarProvider>
        <div className="wrapper">
          <Sidebar />
          <div className="main">
            <Header /> 
            {
              pages.map(( { component: C, path }, i ) => {
                return <Route
                  exact
                  key={i}
                  path={path}
                  render={(props) => <C {...props} />}
                />
              })
            }
          </div>
        </div>
        </ToolbarProvider>
      </Router>
  );
};

export default App;