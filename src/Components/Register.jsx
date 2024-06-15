import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { useUserAuth } from "../contexts/UserAuthContext";
import styled from "styled-components";

const Button = styled.button`
  background-color: blue;
  padding: 10px;
  border-radius: 5px;
  color: white;
  border: none;
  font-size: 20px;
  width: 100%;

  &:hover {
    background-color: white;
    color: blue;
    border: 2px solid blue;
  }
`;

const Register = () => {
  const [userid, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password, userid, name);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLoginClick = () => {
    navigate("login.jsx");
  };

  return (
    <>
      <div className="p-4 box" style={{ width: "50%", margin: "100px auto" }}>
        <h2 className="mb-3 text-center">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUserId">
            <Form.Control
              type="text"
              placeholder="User ID"
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
        <hr />
        <div className="text-center">
          Already have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleLoginClick}>Login here</span>
        </div>
      </div>
    </>
  );
};

export default Register;
