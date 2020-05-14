import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';

import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
const TimetablesPage = lazy(() => import('../../pages/TimetablesPages/TimetablesPage'));
const CallsPage = lazy(() => import('../../pages/CallsPage/CallsPage'));
const EntryPage = lazy(() => import('../../pages/EntryPage/EntryPage'));
// const AdminPage = lazy(() => import('../../pages/AdminPage/AdminPage'));

const PageContainer = (props) => {
  const [pages] = useState([
    {
      component: EntryPage,
      title: 'Расписание колледжа',
      path: '/'
    },
    {
      component: TimetablesPage,
      title: 'Расписание уроков',
      path: '/class-timetable'
    },
    {
      component: CallsPage,
      title: 'Расписание звоноков',
      path: '/calls'
    }
  ]);

  const [title, setTitle] = useState('Расписание уроков');

  const location = useLocation();
  useEffect(
    () => {
      let title;
      pages.forEach(page => page.path === location.pathname ? title = page.title : false);
      setTitle(title);
    },
    [location, pages]
  );

  return (
    <div className="wrapper">
      <Header title={title}/> 
      <div className="main-content-wrapper">
        <Sidebar />
        <Suspense fallback={<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}>
          <div className="main">
            {localStorage.getItem('currentGroup') === null && <Redirect to='/'/>}
            <Route exact path='/' render={(props) => <EntryPage {...props} />} />
            <Route exact path='/class-timetable' render={(props) => <TimetablesPage {...props} />} />
            <Route exact path='/calls' render={(props) => <CallsPage {...props} />} />
            {/* <Route exact path='/admin' render={(props) => <AdminPage {...props} />} /> */}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default PageContainer;