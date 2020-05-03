import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import useGroupContext from '../../hooks/useGroupContext';
import useAllGroupsContext from '../../hooks/useAllGroupsContext';

import './EntryPage.css';

const EntryPage = (props) => {
  const { setCurrentGroup } = useGroupContext();
  const { groups } = useAllGroupsContext();
  const [ selectedGroup, setSelectedGroup ] = useState('');
  const [ errorMessageClass, setErrorMessageClass ] = useState('');
  const [ submitDisabled, setSubmitDisabled ] = useState(false);
  const [ isFetching, setIsFetching ] = useState(false);

  useEffect(() => {
    setIsFetching(true);
  }, []);

  useEffect(() => {
    if (groups !== 'Группы') {
      setIsFetching(false);
    }
  }, [groups]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGroup === '') {
      setErrorMessageClass('show')
      setSubmitDisabled(true);
      setTimeout(() => {
        setErrorMessageClass('');
        setSubmitDisabled(false);
      }, 2900);
    } else {
      setCurrentGroup(selectedGroup);
      localStorage.setItem('currentGroup', selectedGroup);
      // console.log(selectedGroup);
      props.history.push('/class-timetable');
    }
  };

  const handeCurrentGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  }

  const loader = () => {
    return (
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
  };

  return (
    <div className="entryPage-wrapper">
      {localStorage.getItem('currentGroup') !== null && <Redirect to='/class-timetable'/>}
      {isFetching ? loader() : 
      <div className="entryPage-content-wrapper">
        <h1>Выберите группу</h1>
        <div className="form-wrapper">
          <form>
            <div className="entryPage-groups-wrapper">
              {
                groups !== 'Группы' && groups.map((group, i) => (
                  <label key={i+200}>
                    {group}
                    <input key={i} checked={selectedGroup === group} onChange={handeCurrentGroupChange} value={group} type="radio" name="Group" />
                    <span className="checkmark"></span>
                  </label>
                ))
              }
            </div>
            <button className="submit-btn" disabled={submitDisabled} type="submit" onClick={(e) => handleSubmit(e)}>Выбрать</button>
          </form>
        </div>
      </div>}
      {<div className={`snackbar ${errorMessageClass}`}>Выберите группу</div>}
    </div>
  );
};

export default EntryPage;