import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobileno: "",
    roleType: "User", // Set the default roleType to "User"
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    mobileno: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const newErrors = {
      username: formData.username ? "" : "Username is required.",
      email: formData.email ? "" : "Email is required.",
      password: formData.password ? "" : "Password is required.",
      mobileno: formData.mobileno ? "" : "Mobile No is required.",
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).every((error) => error === "")) {
      // No errors, submit the form
      const apiURL = "http://localhost:5070/signup";

      axios
        .post(apiURL, formData)
        .then((response) => {
          // Handle successful signup response
          console.log("Signup successful:", response.data);
          if (response.data != null) {
            alert("Signup successful");
            navigate("/home", { replace: true });
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Error signing up:", error);
        });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Card className="p-5">
        <h2 className="text-center mb-4">Signup</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <Alert variant="danger">{errors.username}</Alert>
            )}
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <Alert variant="danger">{errors.email}</Alert>}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <Alert variant="danger">{errors.password}</Alert>
            )}
          </Form.Group>

          <Form.Group controlId="mobileno">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type="text"
              name="mobileno"
              value={formData.mobileno}
              onChange={handleChange}
              required
            />
            {errors.mobileno && (
              <Alert variant="danger">{errors.mobileno}</Alert>
            )}
          </Form.Group>

          <Form.Group controlId="roleType">
            <Form.Label>Role Type</Form.Label>
            <Form.Control
              as="select"
              name="roleType"
              value={formData.roleType}
              onChange={handleChange}
              required
            >
              <option value="Admin">Admin</option>
              <option value="HR">HR</option>
              <option value="User">User</option>
            </Form.Control>
          </Form.Group>

          <Button className="mt-3 w-100" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
