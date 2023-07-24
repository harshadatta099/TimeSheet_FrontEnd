import React, { useState } from "react";
import { Table, Container, Row, Col, Form } from "react-bootstrap";

const WeekData = () => {
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
    {
      timesheetId: 2,
      task: "Task 2",
      hours: 3,
      createdDate: "2023-07-23",
      projectId: 2,
      userId: 102,
      activityId: 202,
    },
    {
      timesheetId: 2,
      task: "Task 2",
      hours: 3,
      createdDate: "2023-07-24",
      projectId: 2,
      userId: 102,
      activityId: 202,
    },
    // Add more sample records as needed
  ];

  const [userRecords] = useState(initialUserRecords);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to filter user records based on the selected date range
  const filterUserRecordsByDateRange = () => {
    if (!startDate || !endDate) {
      return userRecords; // If either start date or end date is not selected, return all records
    }

    return userRecords.filter(
      (record) =>
        record.createdDate >= startDate && record.createdDate <= endDate
    );
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filteredUserRecords = filterUserRecordsByDateRange();

  return (
    <Container>
      <Row className="m-3">
        <Col lg={3} md={6}>
          <Form.Group controlId="formStartDate">
            <Form.Label>Select Start Date:</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Form.Group>
        </Col>
        <Col lg={3} md={6}>
          <Form.Group controlId="formEndDate">
            <Form.Label>Select End Date:</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
};

export default WeekData;
