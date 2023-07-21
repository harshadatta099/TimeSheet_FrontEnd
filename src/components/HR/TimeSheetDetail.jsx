import React, { useState } from 'react';
import axios from 'axios';

const TimeSheetDetail = () => {
  const [timeSheetData, setTimeSheetData] = useState(null);
  const [timeSheetId, setTimeSheetId] = useState('');

  const handleInputChange = (event) => {
    setTimeSheetId(event.target.value);
  };

  const handleFetchRecord = () => {
    // Make the API call to fetch the specific time sheet record
    axios.get(`/api/hr/timesheets/${timeSheetId}`)
      .then((response) => {
        setTimeSheetData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching time sheet record:', error);
      });
  };

  return (
    <div>
      <h2>Get Specific Time Sheet Record</h2>
      <label htmlFor="timesheetId">Time Sheet ID:</label>
      <input
        type="text"
        id="timesheetId"
        value={timeSheetId}
        onChange={handleInputChange}
      />
      <button onClick={handleFetchRecord}>Fetch Record</button>

      {timeSheetData && (
        <div>
          <h3>Time Sheet Record</h3>
          <p>Project Name: {timeSheetData.projectName}</p>
          <p>Activity Name: {timeSheetData.activityName}</p>
          <p>Task: {timeSheetData.task}</p>
          <p>No. of Hours: {timeSheetData.hours}</p>
          <p>Date: {timeSheetData.date}</p>
        </div>
      )}
    </div>
  );
};

export default TimeSheetDetail;
