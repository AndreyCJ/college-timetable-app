import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

import './header.css';
import Groups from '../groups/Groups';
import Logo from '../../assets/logo-svg.svg';
import Weeks from '../weeks/Weeks';
import MobileMenuToggleBtn from '../mobileMenu/mobileMenuToggleBtn';
import MobileMenu from '../mobileMenu/mobileMenu';
import Backdrop from '../backdrop/backdrop';

import useGroupContext from '../../hooks/useGroupContext';
import useAllGroupsContext from '../../hooks/useAllGroupsContext';
import useWeekContext from '../../hooks/useWeekContext';

const Header = (props) => {
  const [menuState, setMenuState] = useState({
    isMenuOpen: false,
    shadow: 'no-shadow'
  });

  const { setAllGroups } = useAllGroupsContext();
  const { setCurrentGroup } = useGroupContext();
  const { setWeek } = useWeekContext();

  const handleMenuBtnClick = () => {
    setMenuState(
      (prevState) => {
        return {isMenuOpen: !prevState.isMenuOpen};
      }
    );
  };
  
  useEffect(() => {
    setCurrentGroup(localStorage.getItem('currentGroup'));
    const getGroups = async () => {
      const response = await fetch('/api/classTimetable/groups');
      const data = await response.json();
      const distinctGroups = [...new Set(data.map(group => group.group ))];
      const copy = [...distinctGroups];
      console.log(data);
      setAllGroups(copy);
    };

    const getWeek = async () => {
      const response = await fetch('/api/week');
      const data = await response.json();
      setWeek(data);
      console.log(data);
    };

    getGroups();
    getWeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackdropClick = () => {
    setMenuState({isMenuOpen: false});
  };
  
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-logo">
          <a href="/class-timetable">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
          <div className="header-bar-wrapper">
            <div className="page-title">
              {props.title}
            </div>

            <div className="header-tooltip">
              <Weeks />
              <Groups />
            </div>
          </div>
        
      </div>
      <div className="mobileMenu-wrapper">
          <MobileMenuToggleBtn click={handleMenuBtnClick}/>
          <MobileMenu show={menuState.isMenuOpen} weeks={<Weeks />} groups={<Groups />} />
          <Backdrop click={handleBackdropClick} show={menuState.isMenuOpen} />
        </div>
    </header>
  );
};

export default Header;