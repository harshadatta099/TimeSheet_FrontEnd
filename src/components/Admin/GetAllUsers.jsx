import React, { useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";

const GetAllUsers = () => {
  // Sample user records (temporary local data)
  const initialUserRecords = [
    {
      userId: 1,
      username: "sai",
      email: "sai@gmail.com",
      password: "123456",
      mobileno: "1234567890",
    },
    {
      userId: 2,
      username: "sreyas",
      email: "sreyas@gmail.com",
      password: "123456",
      mobileno: "1234567890",
    },
    // Add more sample records as needed
  ];

  const [userRecords, setUserRecords] = useState(initialUserRecords);
  const [searchEmail, setSearchEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };

  // Function to filter user records based on email
  const filterUserRecords = () => {
    if (searchEmail === "") {
      return userRecords; // No filter, return all records
    }
    return userRecords.filter((record) =>
      record.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  };

  // Function to handle edit button click
  const handleEditClick = (user) => {
    setShowModal(true);
    setEditedUser(user);
  };

  // Function to handle delete button click
  const handleDeleteClick = (userId) => {
    const updatedRecords = userRecords.filter(
      (record) => record.userId !== userId
    );
    setUserRecords(updatedRecords);
  };

  const filteredUserRecords = filterUserRecords();

  return (
    <div>
      <Form className="mb-3">
        <Form.Group controlId="formSearchEmail">
          <Form.Label>Search by Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={searchEmail}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Mobile No</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUserRecords.map((record) => (
            <tr key={record.userId}>
              <td>{record.userId}</td>
              <td>{record.username}</td>
              <td>{record.email}</td>
              <td>{record.password}</td>
              <td>{record.mobileno}</td>
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
                  onClick={() => handleDeleteClick(record.userId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for editing user */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedUser && (
            <Form>
              <Form.Group controlId="formUserId">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="text" value={editedUser.userId} readOnly />
              </Form.Group>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={editedUser.username}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={editedUser.password}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, password: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formMobileNo">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control
                  type="text"
                  value={editedUser.mobileno}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, mobileno: e.target.value })
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

export default GetAllUsers;
