import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import PageProgress from "react-page-progress";
import PreLoader from "./PreLoader";
import Footer from "./Footer";
import logo from "../images/logo.png";
import icon from "../images/icon.png";
import authImage from "../images/auth-image.png";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (password !== confirmPassword) {
      event.preventDefault();
      event.stopPropagation();
      setError(true);
      setErrorMessage("Passwords do not match");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }

    setValidated(true);
  };

  return (
    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          <PageProgress color={"#178d4a"} height={4} />

          <div className="navbar">
            <div className="navbar-head">
              <a href="/" className="navbar-logo">
                <img className="nav-logo" src={logo} alt="logo" />
              </a>
              <div className="navbar-links">
                <span onClick={handleClick}>Home</span>
                <span onClick={handleClick}>About</span>
                <span onClick={handleClick}>Contact Us</span>
              </div>
            </div>
            <div className="justify-content-left buttons">
              <button>Login</button>
              <button>Signup</button>
            </div>
          </div>

          <div className="register-container">
            <Container>
              <Row>
                <Col>
                  <div className="card-top">
                    <div className="card-icon">
                      <img src={icon} alt="icon" />
                    </div>
                    <Button className="register-button">SIGNUP</Button>
                    <Button className="login-button">SIGNIN</Button>
                  </div>
                  <Card className="register-card" style={{ width: "30rem" }}>
                    <Card.Title>Create Your Account</Card.Title>
                    <Card.Body>
                      <Form
                        className="register-form"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                      >
                        <Form.Group className="mb-3" controlId="formName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please Enter Name
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter valid email.
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter Password.
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formConformPassword"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter Password.
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCheckbox">
                          <Form.Check
                            required
                            type="checkbox"
                            label="I agree to Terms And Condition"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                          />
                        </Form.Group>

                        <Button className="submit-button" type="submit">
                          SIGN UP
                        </Button>
                        <div className="error-message">
                          {error ? errorMessage : ""}
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <div className="auth-image">
                    <img
                      className="left-logo"
                      src={authImage}
                      alt="left-logo"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
}
