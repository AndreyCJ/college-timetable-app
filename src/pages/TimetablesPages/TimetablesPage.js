import React from 'react';

import './TimetablesPage.css';
import ClassTimetable from '../../components/classTimetable/classTimetable';

const TimetablesPage = (props) => {
  return (
    <div className="timetables-page">
      <ClassTimetable />
    </div>
  );
};

export default TimetablesPage;
