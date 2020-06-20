import React, { useEffect, useState } from 'react';

import './CallsPage.css'

const CallsPage = () => {
  const [ callsTable, setCallsTable ] = useState('');
  const [ callsInfo, setCallsInfo ] = useState(null);
  useEffect(() => {
    const getCalls = async () => {
      const response = await fetch('/api/callsTimetable');
      const data = await response.json();
      renderCalls(data);
      // console.log(data.callsInfo[0].infoDay)
      console.log(data)
    }
    getCalls();
  }, []);

  const renderCalls = (data) => {
    if (data.calls.length === 0 && data.callsInfo.length === 0) {
      setCallsTable(<div className="blank-timetable"><span>Расписания нет...</span></div>);
    } else {
      const callsArr = data.calls.map(callsTimetable => callsTimetable.CallsArr);
      console.log(callsArr)
      const table = data.calls.map((call, i) => {
        return (
          <div className="callsPage__callsTimetable__item" key={i+1200}>
            <h2 className="callsPage__callsTimetable-shiftNum" key={i}>{call.shiftNum}</h2>
            <table className="callsPage__callsTimetable-table" key={i+5000}>
              <tbody key={i+100}>{
                callsArr[i].map((call, i) => {
                  return (
                    <tr key={i-1}>
                      <td className="callsPage__callsTimetable-table-call__class" key={i+10000}>{call.className}</td>
                      <td className="callsPage__callsTimetable-table-call__time" key={i+100}>{call.time}</td>
                    </tr>
                  );
                })
              }</tbody>
            </table>
          </div>
        );
      });

      const theCallsInfo = data.callsInfo.length === 0 ?
      <div className="callsPage__callsTimetable__info">
        <div className="callsPage__callsTimetable__info-day"><h1>Расписание</h1></div>
      </div> :
      (
        <div className="callsPage__callsTimetable__info">
          {
            data.callsInfo[0].infoDay === undefined || data.callsInfo[0].infoDay === '-' || data.callsInfo[0].infoDay === '' ?
            <div className="callsPage__callsTimetable__info-day"><h1>Расписание</h1></div> : 
            <div className="callsPage__callsTimetable__info-day"><h1>{data.callsInfo[0].infoDay}</h1></div>
          }
          {
            data.callsInfo[0].infoDate === undefined && data.callsInfo[0].infoExpireDate === undefined ? null :
            <div className="callsPage__callsTimetable__info-credentialsWrapper">
              {
                data.callsInfo[0].infoDate === undefined ? null :
                <div className="callsPage__callsTimetable__info-date"><span>{data.callsInfo[0].infoDate}</span></div>
              }
              {
                data.callsInfo[0].infoExpireDate === undefined ? null :
                <div className="callsPage__callsTimetable__info-expireDate"><span>{data.callsInfo[0].infoExpireDate}</span></div>
              }
            </div>
          }
        </div>
      );
      
      setCallsInfo(theCallsInfo);
      setCallsTable(table);
    }
  };

  const loader = () => {
    return (
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
  };

  return (
    <div className="callsPage-wrapper">
      <div className={`callsPage__callsTimetable-wrapper ${callsTable === '' ? 'callsPage-loading-wrapper' : null}`}>
        {callsInfo === null ? null : callsInfo}
        {callsTable === '' ? loader() : callsTable}
      </div>
    </div>
  );
};

export default CallsPage;