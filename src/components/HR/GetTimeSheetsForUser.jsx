import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetTimeSheetsForUser = ({ userId }) => {
  const [timeSheets, setTimeSheets] = useState([]);

  useEffect(() => {
    // Fetch time sheet records for the specific user from the backend API
    const fetchTimeSheetsForUser = async () => {
      try {
        const response = await axios.get(`/api/timesheets/user/${userId}`); // Replace with your API endpoint
        setTimeSheets(response.data); // Assuming the API returns an array of time sheet records
      } catch (error) {
        console.error(`Error fetching time sheets for user ${userId}:`, error);
      }
    };

    fetchTimeSheetsForUser();
  }, [userId]);

  return (
    <div>
      <h2>Time Sheets for User {userId}</h2>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Activity Name</th>
            <th>Task</th>
            <th>No. of Hours</th>
            <th>Date</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetTimeSheetsForUser;
