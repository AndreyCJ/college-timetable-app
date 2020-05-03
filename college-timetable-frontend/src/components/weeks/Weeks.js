import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import useWeekContext from '../../hooks/useWeekContext';

const Weeks = (props) => {
  const { week, setWeek } = useWeekContext();
  const [clickedClass, setClickedClass] = useState(false);

  const showMenu = () => {
    setClickedClass(prev => !prev);
  };

  const closeMenu = () => {
    setClickedClass(false)
  };

  const selectWeek = (theWeek) => {
    setWeek(theWeek);
  };

  return (
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
  );
};

export default Weeks;