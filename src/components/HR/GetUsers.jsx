import React, { useState, useEffect } from "react";
import { Table, Form, Container } from "react-bootstrap";
import axios from "axios";
import GetUserDataById from "./GetUserDataById"; // Import the GetUserDataById component

const GetUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(""); // State to store the selected userId

  useEffect(() => {
    axios
      .get("http://localhost:5070/api/Hr/GetAllUsers")
      .then((response) => {
        setUsersData(response.data); 
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    const filtered = usersData.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserRowClick = (userId) => {
    setSelectedUserId(userId); // Set the selected userId when a user row is clicked
  };

  return (
    <Container>
    <Form className="my-3">
      <Form.Label>
        <div className="fs-5">USER DATA:</div>
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
          <th>Mobile No</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => (
          <tr key={user.userId} onClick={() => handleUserRowClick(user.userId)}>
            <td>{user.userId}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.mobileno}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    {selectedUserId && <div className="fs-5 mb-3">USER DETAILS:</div>}
    {selectedUserId && <GetUserDataById userId={selectedUserId} />}
  </Container>
  );
};

export default GetUsers;
