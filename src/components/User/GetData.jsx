import React, { useEffect, useState } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { fetchUserDataByUserId } from "../../services/API"

const FetchData = () => {
  const userId = localStorage.getItem("userId");
  const [tasksData, setTasksData] = useState([]); 
  // const [weekDates, setWeekDates] = useState([]); 
  const today = new Date(); 

  const generateWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    
    // Skip Sunday (dayOfWeek = 0) by adding 1 to the start day
    weekStart.setDate(today.getDate() - dayOfWeek + 1);

    const dates = [...Array(6)].map((_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });

    return dates;
  };

  useEffect(() => {
    fetchUserDataByUserId(userId)
      .then((data) => setTasksData(data));
  }, [userId]);


  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      weekday: "long",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const weekDates = generateWeekDates();
  return (
    <Container>
      <Table bordered>
      <thead>
  <tr>
    <th>Project Name</th>
    <th>Activity</th>
    <th>Task</th>
    {weekDates.map((date, index) => (
      <th key={index}>
        {formatDate(date) }
        {date.toDateString() === today.toDateString() && (
          <span> (Today)</span>
        )}
      </th>
    ))}
  </tr>
</thead>
<tbody>
  {tasksData.map((taskData, index) => (
    <tr key={index}>
      <td>{taskData.projectName}</td>
      <td>{taskData.activityName}</td>
      <td>{taskData.task}</td>
      {weekDates.map((date, index) => {
        const taskCreatedDate = new Date(taskData.createdDate);
        return (
          <td key={index}>
            {date.toDateString() === taskCreatedDate.toDateString() && (
              <span>{taskData.hours}</span>
            )}
          </td>
        );
      })}
    </tr>
  ))}
</tbody>
      </Table>
    </Container>
  );
};

export default FetchData;
