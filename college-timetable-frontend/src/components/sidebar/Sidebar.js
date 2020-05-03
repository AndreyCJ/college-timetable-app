import React, { useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faBell } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css';

const Sidebar = (props) => {
  const [ isSidebarOpen, setSidebarOpen ] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  }

  return (
    <div className={`sidebar ${isSidebarOpen ? '--sidebar-open' : '--sidebar-closed'}`}>
      <div className="sidebar-wrapper">

        <div className="sidebar-pages">
          <div className={`sidebar-pages__item ${isSidebarOpen ? '--sidebar-open' : '--sidebar-closed'}`}>
            <NavLink
              to={localStorage.getItem('currentGroup') === null ? '/' : '/class-timetable'}
              activeClassName={localStorage.getItem('currentGroup') === null ? '' : 'sidebar-pages__item--selected'}
            >
              <FontAwesomeIcon icon={faTable} />
              <span className={`sidebar-text ${isSidebarOpen ? '--sidebar-open' : '--sidebar-closed'}`}>Расписание уроков</span>
            </NavLink>
          </div>
          <div className={`sidebar-pages__item ${isSidebarOpen ? '--sidebar-open' : '--sidebar-closed'}`}>
            <NavLink
              to={localStorage.getItem('currentGroup') === null ? '/' : '/calls'}
              activeClassName={localStorage.getItem('currentGroup') === null ? '' : 'sidebar-pages__item--selected'}
            >
              <FontAwesomeIcon icon={faBell} />
              <span className={`sidebar-text ${isSidebarOpen ? '--sidebar-open' : '--sidebar-closed'}`}>Расписание звонков</span>
            </NavLink>
          </div>
        </div>

        <div className="sidebar-spacer" />

        <div className={`sidebar-toggle ${isSidebarOpen ? '--sidebar-open' : '--sidebar-closed'}`} onClick={handleSidebarToggle}>
          <button className="sidebar-toggle__button">
            <div className="sidebar-toggle__button__line" />
            <div className="sidebar-toggle__button__line" />
            <div className="sidebar-toggle__button__line" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);