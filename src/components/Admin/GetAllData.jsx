import React, { useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";

const GetAllData = () => {
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
  const [showModal, setShowModal] = useState(false);
  const [editedTimesheet, setEditedTimesheet] = useState(null);

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

  // Function to handle edit button click
  const handleEditClick = (timesheet) => {
    setShowModal(true);
    setEditedTimesheet(timesheet);
  };

  // Function to handle delete button click
  const handleDeleteClick = (timesheetId) => {
    const updatedRecords = userRecords.filter(
      (record) => record.timesheetId !== timesheetId
    );
    setUserRecords(updatedRecords);
  };

  const filteredUserRecords = filterUserRecords();

  return (
    <div>
      <Form className="mb-3">
        <Form.Group controlId="formSearchUserId">
          <Form.Label>Search by User ID:</Form.Label>
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
            <th>Edit</th>
            <th>Delete</th>
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
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditClick(record)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(record.timesheetId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for editing timesheet */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Timesheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedTimesheet && (
            <Form>
              <Form.Group controlId="formTimesheetId">
                <Form.Label>Timesheet ID</Form.Label>
                <Form.Control
                  type="text"
                  value={editedTimesheet.timesheetId}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formTask">
                <Form.Label>Task</Form.Label>
                <Form.Control
                  type="text"
                  value={editedTimesheet.task}
                  onChange={(e) =>
                    setEditedTimesheet({
                      ...editedTimesheet,
                      task: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formHours">
                <Form.Label>Hours</Form.Label>
                <Form.Control
                  type="number"
                  value={editedTimesheet.hours}
                  onChange={(e) =>
                    setEditedTimesheet({
                      ...editedTimesheet,
                      hours: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCreatedDate">
                <Form.Label>Created Date</Form.Label>
                <Form.Control
                  type="date"
                  value={editedTimesheet.createdDate}
                  onChange={(e) =>
                    setEditedTimesheet({
                      ...editedTimesheet,
                      createdDate: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProjectId">
                <Form.Label>Project ID</Form.Label>
                <Form.Control
                  type="text"
                  value={editedTimesheet.projectId}
                  onChange={(e) =>
                    setEditedTimesheet({
                      ...editedTimesheet,
                      projectId: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formUserId">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  value={editedTimesheet.userId}
                  onChange={(e) =>
                    setEditedTimesheet({
                      ...editedTimesheet,
                      userId: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formActivityId">
                <Form.Label>Activity ID</Form.Label>
                <Form.Control
                  type="text"
                  value={editedTimesheet.activityId}
                  onChange={(e) =>
                    setEditedTimesheet({
                      ...editedTimesheet,
                      activityId: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GetAllData;
