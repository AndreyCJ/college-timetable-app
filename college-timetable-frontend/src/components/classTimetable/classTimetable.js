import React from 'react';
import { useState, useEffect } from 'react';

import useGroupContext from '../../hooks/useGroupContext';
import useWeekContext from '../../hooks/useWeekContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const ClassTimetable = (props) => {
  const [data, setData] = useState({ classes: [], isFetching: true });
  const { currentGroup } = useGroupContext();
  const { week } = useWeekContext();

  useEffect(() => {
    if (currentGroup !== 'Группа' && week !== '') {
      getClasses(week, currentGroup);
      // console.log(week,currentGroup)
    }
  }, [week, currentGroup]);

  const getClasses = async (theWeek, theGroup) => {
    try {
      setData({ isFetching: true });
      const response = await fetch(`/api/classTimetable/${theWeek}&${theGroup}`);
      const data = await response.json();
      const copy = [...data]
      setData({ classes: copy, isFetching: false });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTables = classes => {
    let tRows = [];

    let monday = [];
    let tuesday = [];
    let wednesday = [];
    let thursday = [];
    let friday = [];

    classes.map(classData => {
      if (classData.day === 'Понедельник'){
        monday[classData.classNum - 1] = [classData.className, classData.classTime, classData.room];
      } 
      else if (classData.day === 'Вторник') {
        tuesday[classData.classNum - 1] = [classData.className, classData.classTime, classData.room];
      }
      else if (classData.day === 'Среда') {
        wednesday[classData.classNum - 1] = [classData.className, classData.classTime, classData.room];
      }
      else if (classData.day === 'Четверг') {
        thursday[classData.classNum - 1] = [classData.className, classData.classTime, classData.room];
      }
      else if (classData.day === 'Пятница') {
        friday[classData.classNum - 1] = [classData.className, classData.classTime, classData.room];
      }
      return true;
    });

    const maxClassNum = Math.max(...classes.map(classesNum => classesNum.classNum));
    const classData = [];

    for (let i = 0; i < maxClassNum; i++) {
      classData.push([monday[i], tuesday[i], wednesday[i], thursday[i], friday[i]]);
    }

    for (let i = 0; i < classData.length; i++) {
      tRows.push(
        <tr key={i}>
          {<td className="number" key={i+1}>{i+1}</td>}
          {classData[i].map((lesson, i) => {
            if (typeof(lesson) !== 'undefined') {
              return (
                <td className="timetables-page__lesson-wrapper" key={i+10}>
                  <div className="timetables-page__lesson">
                    <div>
                      <div className="lesson-text">{lesson[0]}</div>
                      {
                        typeof(lesson[1]) !== 'undefined' &&
                        <div className="classTime"><FontAwesomeIcon icon={faBell}/>{lesson[1]}, каб. №{lesson[2]}</div>
                      }
                    </div>
                  </div>
                </td>
              );
            } else {
              return <td className="timetables-page__lesson-wrapper" key={i+100}></td>
            }
          })}
        </tr>
      );
    }
    return tRows;
  };

  const renderTable = classes => {
    if (data.isFetching === false && classes.length === 0) {
      return <div className="blank-timetable"><span>Расписания нет...</span></div>;
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th className="number">№</th>
              <th>Понедельник</th>
              <th>Вторник</th>
              <th>Среда</th>
              <th>Четверг</th>
              <th>Пятница</th>
            </tr>
          </thead>
  
          <tbody>
            {getTables(classes)}
            <tr className="fake-row">
              <td className="fake-col fake-col-num"></td>
              <td className="fake-col"></td>
              <td className="fake-col"></td>
              <td className="fake-col"></td>
              <td className="fake-col"></td>
              <td className="fake-col"></td>
            </tr>
          </tbody>
        </table>
      );
    }
  };

  const loader = () => {
    return (
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
  };

  return (
    <div className={`timetables-page__wrapper ${data.isFetching ? 'loading-wrapper' : ''}`}>
      {data.isFetching ? loader() : renderTable(data.classes)}
    </div>
  );
};

export default ClassTimetable;