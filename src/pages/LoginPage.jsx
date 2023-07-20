import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    const apiUrl = "http://localhost:5070/login";
    const data = {
      email: email,
      password: password,
      userType: 0,
    };
    e.preventDefault();
    axios.post(apiUrl, data).then((response) => {
      console.log(response.data);
      if (response.data != null) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home", { replace: true });
      } else {
        alert("Invalid credentials");
      }
    });
    if (!validateForm()) {
      return;
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password" className="mt-2">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
