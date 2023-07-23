import React, { useState } from "react";
import { Table, Form, Container } from "react-bootstrap";

const usersData = [
  {
    userId: 1,
    username: "user1",
    email: "user1@example.com",
    password: "user1pass",
    mobileNo: "1234567890",
  },
  {
    userId: 2,
    username: "user2",
    email: "user2@example.com",
    password: "user2pass",
    mobileNo: "9876543210",
  },
  // Add more users as needed
];

const GetUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    const filtered = usersData.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <Container>
      <Form className="my-3">
        <Form.Label>
          <div className="fs-5">HR GET USER DATA:</div>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Mobile No</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.mobileNo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GetUsers;
