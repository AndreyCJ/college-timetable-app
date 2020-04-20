import React, { useState, useEffect } from 'react';

import useToolbarContext from '../../hooks/useToolbarContext';

const Groups = (props) => {
  const [clicked, setClicked] = useState(false);
  const [isGroupSet, setGroupIsSet] = useState(false);
  const { group, setGroup } = useToolbarContext();

  console.log(group)

  // const [ groups, setGroups ] = useState(["Группа"]);
  // const [groups] = useState([
  //   {
  //     id: 'P43',
  //     name: 'П-43'
  //   },
  //   {
  //     id: 'R47',
  //     name: 'Р-47'
  //   },
  //   {
  //     id: '103',
  //     name: '103'
  //   }
  // ]);

  // useEffect(() => {
  //   setGroupIsSet(true);
  // }, [group]);


  

  const showMenu = () => {
    setClicked(prev => !prev);
  }

  const closeMenu = () => {
    setClicked(false)
  }

  return (
    <div
      className={`header-tooltip-group-wrapper select-wrapper ${clicked ? '--clicked' : ''}`}
      onClick={() => showMenu()}
      tabIndex="0"
      onBlur={ closeMenu }
    >
    <label className="header-tooltip-group__label --ul-label --current">{group[0]}</label>
    <ul className={`header-tooltip-group ${clicked ? '--shown' : ''}`}>
      {
        // isGroupSet ? group.map((theGroup, i) => <li className="header-tooltip__group__item" onClick={setGroup(theGroup)} id={i} key={i}>{theGroup}</li>) : ''
      }
    </ul>
    </div>
  );
};

export default Groups;