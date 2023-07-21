import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllTimeSheets = () => {
  const [timeSheets, setTimeSheets] = useState([]);

  useEffect(() => {
    // Fetch all time sheet records from the backend API
    const fetchTimeSheets = async () => {
      try {
        const response = await axios.get('/api/timesheets'); // Replace with your API endpoint
        setTimeSheets(response.data); // Assuming the API returns an array of time sheet records
      } catch (error) {
        console.error('Error fetching time sheets:', error);
      }
    };

    fetchTimeSheets();
  }, []);

  return (
    <div>
      <h2>All Time Sheets</h2>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Activity Name</th>
            <th>Task</th>
            <th>No. of Hours</th>
            <th>Date</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {timeSheets.map((entry, index) => (
            <tr key={index}>
              <td>{entry.projectName}</td>
              <td>{entry.activityName}</td>
              <td>{entry.task}</td>
              <td>{entry.hours}</td>
              <td>{entry.date}</td>
              <td>{entry.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllTimeSheets;
