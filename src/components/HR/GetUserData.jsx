import React, { useState } from "react";
import { Table, Form } from "react-bootstrap";

const GetUserData = () => {
  // Sample user records (temporary local data)
  const initialUserRecords = [
    {
      timesheetId: 1,
      task: "Task 1",
      hours: 5,
      createdDate: "2023-07-23",
      projectId: 1,
      userId: 101,
      activityId: 201,
    },
    {
      timesheetId: 2,
      task: "Task 2",
      hours: 3,
      createdDate: "2023-07-22",
      projectId: 2,
      userId: 102,
      activityId: 202,
    },
    // Add more sample records as needed
  ];

  const [userRecords, setUserRecords] = useState(initialUserRecords);
  const [searchUserId, setSearchUserId] = useState("");

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchUserId(e.target.value);
  };

  // Function to filter user records based on userId
  const filterUserRecords = () => {
    if (searchUserId === "") {
      return userRecords; // No filter, return all records
    }
    return userRecords.filter((record) =>
      record.userId.toString().includes(searchUserId)
    );
  };

  const filteredUserRecords = filterUserRecords();

  return (
    <div>
      <Form className="mb-3">
        <Form.Group controlId="formSearchUserId">
          <Form.Label>
            <div className="fs-5">HR Tasks:</div>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User ID"
            value={searchUserId}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Timesheet ID</th>
            <th>Task</th>
            <th>Hours</th>
            <th>Created Date</th>
            <th>Project ID</th>
            <th>User ID</th>
            <th>Activity ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredUserRecords.map((record) => (
            <tr key={record.timesheetId}>
              <td>{record.timesheetId}</td>
              <td>{record.task}</td>
              <td>{record.hours}</td>
              <td>{record.createdDate}</td>
              <td>{record.projectId}</td>
              <td>{record.userId}</td>
              <td>{record.activityId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GetUserData;
