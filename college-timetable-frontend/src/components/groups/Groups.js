import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import useGroupContext from '../../hooks/useGroupContext';
import useAllGroupsContext from '../../hooks/useAllGroupsContext';

const Groups = (props) => {
  const [clicked, setClicked] = useState(false);
  const [groupRows, setGroupRows] = useState([]);
  const { currentGroup, setCurrentGroup } = useGroupContext();
  const { groups } = useAllGroupsContext();

  useEffect(() => {
    const copy = [...groups];
    renderGroups(copy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups])

  const handleSetCurrentGroup = (myGroup) => {
    setCurrentGroup(myGroup)
    localStorage.setItem('currentGroup', myGroup);
  };

  const renderGroups = (copy) => {
    const rows = copy.map((theGroup, i) => (
      <li className="header-tooltip__group__item" onClick={() => handleSetCurrentGroup(theGroup)} id={i} key={i}>{theGroup}</li>
      )
    );
    setGroupRows(rows);
  };

  const showMenu = () => {
    setClicked(prev => !prev);
  };

  const closeMenu = () => {
    setClicked(false);
  };

  const renderGroupBox = () => {
    return (
      <div
        className={`header-tooltip-group-wrapper select-wrapper ${clicked ? '--clicked' : ''}`}
        onClick={() => showMenu()}
        tabIndex="0"
        onBlur={ closeMenu }
      >
      <label className="header-tooltip-group__label --ul-label --current">{currentGroup} <FontAwesomeIcon icon={faCaretDown} /></label>
      <ul className={`header-tooltip-group ${clicked ? '--shown' : ''}`}>
        {
          groupRows
        }
      </ul>
      </div>
    );
  };

  return (
    <span>{currentGroup === null ? '' : renderGroupBox()}</span>
  );
};

export default Groups;