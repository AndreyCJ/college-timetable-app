import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faBell, faPrint } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css';
import Logo from '../../assets/logo-svg.svg';

const Sidebar = ({ history }) => {
  const currentPageClass = 'sidebar-pages__item--selected';
  let timeTablePage, callsPage = '';

  switch (history.location.pathname) {
    case '/':
      timeTablePage = currentPageClass;
      callsPage = '';
      break;
    case '/calls':
      callsPage = currentPageClass;
      timeTablePage = '';
      break;
    default:
      timeTablePage = currentPageClass;
      callsPage = '';
      break;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-logo">
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </div>

        <div className="sidebar-pages">
          <div className={`sidebar-pages__item ${timeTablePage}`}>
            <a href="/">
              <FontAwesomeIcon icon={faTable} />
            </a>
          </div>
          <div className={`sidebar-pages__item ${callsPage}`}>
            <a href="/calls">
              <FontAwesomeIcon icon={faBell} />
            </a>
          </div>
          <div className="sidebar-pages__item">
            <a href="/">
              <FontAwesomeIcon icon={faPrint} />
            </a>
          </div>
        </div>

        <div className="sidebar-spacer" />

        <div className="sidebar-toggle">
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