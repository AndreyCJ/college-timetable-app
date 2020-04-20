import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
// faUser

import './header.css';
import Groups from '../groups/Groups';
import useToolbarContext from '../../hooks/useToolbarContext';


const Header = () => {
  const { week, setWeek } = useToolbarContext();
  const [clickedClass, setClickedClass] = useState(false);

  const showMenu = () => {
    setClickedClass(prev => !prev);
  }

  const closeMenu = () => {
    setClickedClass(false)
  }

  const selectWeek = (week) => {
    setWeek(week);
  }

  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="page-title">
          Расписание
        </div>

        <div className="header-tooltip">
          <div
            className={`header-week-wrapper select-wrapper ${clickedClass ? '--clicked' : ''}`}
            onClick={() => showMenu()}
            tabIndex="0"
            onBlur={ closeMenu }
          >
            <label className="header-week__label --ul-label --current">{week} неделя <FontAwesomeIcon icon={faCaretDown} /></label>
            <ul className={`header-week ${clickedClass ? '--shown' : ''}`}>
              <li className="header-week__item" onClick={() => selectWeek('Четная')}>Четная неделя</li>
              <li className="header-week__item" onClick={() => selectWeek('Нечетная')}>Нечетная неделя</li>
            </ul>
          </div>
          <Groups />
          <div className="header-tooltip__item header-tooltip__search">
            <button className="header-tooltip__button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          {/* <div className="header-tooltip__item header-tooltip__account-nav">
            <button className="header-tooltip__button">
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;