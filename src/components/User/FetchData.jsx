import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import AddTasks from "./AddTasks"; 
const FetchData = ({projectNames, activityNames}) => {
  
 
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
    
  ];
  const [userRecords, setUserRecords] = useState(initialUserRecords);

  const [showModal, setShowModal] = useState(false);
  const [editedTimesheet, setEditedTimesheet] = useState(null);

  const handleEditClick = (timesheet) => {
    setShowModal(true);
    setEditedTimesheet(timesheet);
  };

  const handleDeleteClick = (timesheetId) => {
    const updatedRecords = userRecords.filter(
      (record) => record.timesheetId !== timesheetId
    );
    setUserRecords(updatedRecords);
  };

  const addTask = (newTask) => {
    const newRecords = [...userRecords, newTask];
    setUserRecords(newRecords);
  };

  const handleSaveChanges = () => {
    const editedIndex = userRecords.findIndex(
      (record) => record.timesheetId === editedTimesheet.timesheetId
    );

    if (editedIndex !== -1) {
      const updatedRecords = [...userRecords];
      updatedRecords[editedIndex] = editedTimesheet;
      setUserRecords(updatedRecords);
    }

    setShowModal(false);
  };

  

  return (
    <div>
        <AddTasks addTask={addTask} />
        <br />
      <Table  bordered hover>
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
          {userRecords.map((record) => (
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
                  className="w-100"
                  onClick={() => handleEditClick(record)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  className="w-100"
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
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
  );
};

export default FetchData;
