import React, { useRef, useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== password2Ref.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/bioadd");
    } catch (error) {
      setError("Failed to create an acount");
    }
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-center mb-4">Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="signUpUsername">
          <Form.Label> Email </Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Form.Group id="signUpPassword1">
          <Form.Label> Password </Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>
        <Form.Group id="signUpPassword2">
          <Form.Label> Password Confirmation </Form.Label>
          <Form.Control type="password" ref={password2Ref} required />
        </Form.Group>
        <Button disabled={loading} className="btnn btnn-success" type="submit">
          Sign Up
        </Button>
      </Form>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log-in</Link>
      </div>
    </div>
  );
}
