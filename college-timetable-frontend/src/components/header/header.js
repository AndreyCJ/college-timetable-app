import React, { useState, useEffect } from 'react';

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
    const fetchGroups = async () => {
      const response = await fetch('/api/classTimetable/groups');
      const data = await response.json();
      const distinctGroups = [...new Set(data.map(group => group.group ))];
      const copy = [...distinctGroups];
      console.log(data);
      setAllGroups(copy);
    };

    const getWeek = () => {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      // January 4 is always in week 1.
      let week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    };

    const theWeek =  getWeek() % 2 === 0 ? 'Четная' : 'Нечетная';
    setWeek(theWeek);

    fetchGroups();
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
            {localStorage.getItem('currentGroup') !== null &&
            <MobileMenuToggleBtn click={handleMenuBtnClick}/>}
            <MobileMenu show={menuState.isMenuOpen} weeks={<Weeks />} groups={<Groups />} />
            <Backdrop click={handleBackdropClick} show={menuState.isMenuOpen} />
        </div>
    </header>
  );
};

export default Header;