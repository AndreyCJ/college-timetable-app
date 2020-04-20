import React from 'react';
import { useState, useEffect } from 'react';

import useToolbarContext from '../../hooks/useToolbarContext';

const ClassTimetable = (props) => {
  const [data, setData] = useState({ classes: [], isFetching: false });
  const { week, group } = useToolbarContext();

  useEffect(() => {
    const getClasses = async () => {
      try {
        setData({ isFetching: true });
        const response = await fetch(`/api/classTimetable/${week}&${group}`);
        const data = await response.json();
        setData({ classes: data, isFetching: false });
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, [week])

  const getTables = classes => {
    let tRows = [];

    let monday = [];
    let tuesday = [];
    let wednesday = [];
    let thursday = [];
    let friday = [];

    classes.map(classData => {
      if (classData.day === 'Понедельник'){
        monday[classData.classNum - 1] = classData.className;
      } 
      else if (classData.day === 'Вторник') {
        tuesday[classData.classNum - 1] = classData.className;
      }
      else if (classData.day === 'Среда') {
        wednesday[classData.classNum - 1] = classData.className;
      }
      else if (classData.day === 'Четверг') {
        thursday[classData.classNum - 1] = classData.className;
      }
      else if (classData.day === 'Пятница') {
        friday[classData.classNum - 1] = classData.className;
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
            return (
              <td className="timetables-page__lesson-wrapper" key={i+10}>
                <div className={`${typeof(lesson) !== 'undefined' ? 'timetables-page__lesson' : ''}`}>{lesson}</div>
              </td>
            );
          })}
        </tr>
      );
    }
    return tRows;
  };

  const renderTable = classes => {
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