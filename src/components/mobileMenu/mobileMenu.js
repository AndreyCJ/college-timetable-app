import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../assets/logo-svg.svg';

import './mobileMenu.css';


const MobileMenu = props => {
    let menuClasess = 'mobileMenu';
    if (props.show) {
        menuClasess = 'mobileMenu open';
    };

    return (
        <div>
            <nav className={menuClasess}>
                <div className="header-logo">
                  <a href="/class-timetable">
                    <img src={Logo} alt="Logo" />
                  </a>
                </div>
                <ul className="mobileMenu-ul">
                  <li className='headerNavItem__mobile'>
                    <NavLink
                      to="/class-timetable"
                      activeClassName="mobilelink-active"
                      className="nav-link"
                    >
                      Расписание уроков
                    </NavLink>
                  </li>
                  <li className='headerNavItem__mobile'>
                    <NavLink
                      to="/calls"
                      className="nav-link"
                      activeClassName="mobilelink-active"
                    >
                      Расписание звонков
                    </NavLink>
                  </li>
                  <li className='headerNavItem__mobile toolbar__item'>
                    {props.weeks}
                  </li>
                  <li className='headerNavItem__mobile toolbar__item'>
                    {props.groups}
                  </li>
                </ul>
            </nav>
        </div>
    );   
};

export default MobileMenu;