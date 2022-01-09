import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./About.css"
import AboutImage from "../../../images/about-image.jpg";


export default function About() {
    return (
        <div name="footer" className="about">
        <Container>
          <Row>
            <Col>
              <div className="about-text">
                <h1>About Us</h1>
                <p>
                  We at CodeClub are a group of students who are passionate
                  about learning and sharing knowledge. We believe that learning
                  should be fun and engaging. We want to help you learn and
                  share knowledge with others. We are a community of students
                  who build products like CodeClub to help people and find the
                  right resources to learn and share knowledge.
                </p>
              </div>
            </Col>
            <Col>
              <img src={AboutImage} alt="about" className="about-image" />
            </Col>
          </Row>
        </Container>
      </div>
    );
}