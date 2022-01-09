import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPython, FaJava, FaCuttlefish, FaReact } from "react-icons/fa";
import { DiJavascript1, DiAndroid } from "react-icons/di";
import "./Category.css";

export default function Category() {

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <Container name="about" className="category">
      <h1 className="category-heading">Different Tracks Available</h1>
      <Row>
        <Col>
          <Card className="category-card" style={{ width: "22rem" }}>
            <Card.Body>
              <FaPython className="category-card-icon" size={50} />
              <Card.Title>Python</Card.Title>
              <Card.Text>
                Python is a widely used high-level, general-purpose,
                interpreted, dynamic programming language. It's suitable for web
                development, software development and much more.
              </Card.Text>
            </Card.Body>
            <Button className="category-card-button" onClick={handleClick}>Explore</Button>
          </Card>
        </Col>
        <Col>
          <Card className="category-card" style={{ width: "22rem" }}>
            <Card.Body>
              <FaCuttlefish className="category-card-icon" size={50} />
              <Card.Title>C/C++</Card.Title>
              <Card.Text>
                C++ is a general-purpose programming language. It has
                object-oriented and generic programming features.
                It was developed by Bjarne Stroustrup in 1979.
                It is a strict superset of C.
              </Card.Text>
            </Card.Body>
            <Button className="category-card-button" onClick={handleClick}>Explore</Button>
          </Card>
        </Col>
        <Col>
          <Card className="category-card" style={{ width: "22rem" }}>
            <Card.Body>
              <FaJava className="category-card-icon" size={50} />
              <Card.Title>Java</Card.Title>
              <Card.Text>
                Java is a general-purpose computer programming language that is
                concurrent, class-based, object-oriented, and specifically
                designed to have as few implementation dependencies as possible.
              </Card.Text>
            </Card.Body>
            <Button className="category-card-button" onClick={handleClick}>Explore</Button>
          </Card>
        </Col>
        <Col>
          <Card className="category-card" style={{ width: "22rem" }}>
            <Card.Body>
              <DiJavascript1 className="category-card-icon" size={50} />
              <Card.Title>JavaScript</Card.Title>
              <Card.Text>
                JavaScript is a high-level, interpreted, dynamic, weakly-typed,
                prototype-based, multi-paradigm, and interpreted programming
                language. It has been standardized by the ECMAScript
                Internationalization API.
              </Card.Text>
            </Card.Body>
            <Button className="category-card-button" onClick={handleClick}>Explore</Button>
          </Card>
        </Col>
        <Col>
          <Card className="category-card" style={{ width: "22rem" }}>
            <Card.Body>
              <FaReact className="category-card-icon" size={50} />
              <Card.Title>React</Card.Title>
              <Card.Text>
                React is a JavaScript library for building user interfaces. It
                is maintained by Facebook. React can be used as a base in the
                development of single-page or mobile applications. It is
                also used in the creation of React Native apps.
              </Card.Text>
            </Card.Body>
            <Button className="category-card-button" onClick={handleClick}>Explore</Button>
          </Card>
        </Col>
        <Col>
          <Card className="category-card" style={{ width: "22rem" }}>
            <Card.Body>
              <DiAndroid className="category-card-icon" size={50} />
              <Card.Title>Android Development</Card.Title>
              <Card.Text>
                Android is a mobile operating system based on Linux. It was
                developed by the Open Handset Alliance (Google). It is developed
                using Java language. It is a free and open source operating
                system.
              </Card.Text>
            </Card.Body>
            <Button className="category-card-button" onClick={handleClick}>Explore</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
