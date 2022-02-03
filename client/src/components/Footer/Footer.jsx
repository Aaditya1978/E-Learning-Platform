import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "../../images/logo.png";

import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col xs={2}>
            <div className="footer-logo">
              {/* <img src={icon} alt="logo" /> */}
          <img className="nav-logo" src={logo} alt="logo" />
      
            </div>
          </Col>
          <Col xs={6}>
            <div className="footer-text">
              <h2>Support</h2>
              <p>
                We are a team of students who are passionate about learning and
                sharing knowledge. We are always open to new ideas and
                collaborations. If you have any questions, please contact us at{" "}
                <a href="mailto:aadityasinghal1978@gmai.com">Here</a><br/>
                Copyright © 2022, All rights reserved.
              </p>
            </div>
          </Col>
          <Col className="colum">
            <Row>
              <div className="footer-contact">
                <h2>Contact Us</h2>
                <Row>
                  <a href="mailto:support@codeclub.com">
                    <MdEmail className="contact-icon"/>{" "}
                    support@codeclub.com
                  </a>
                </Row>
                <Row>
                  <p>
                    <FaPhoneAlt className="contact-icon"/>{" "}
                    +91-9888888888
                  </p>
                </Row>
              </div>
            </Row>
            <Row>
              <div className="footer-text">
                <h2>Follow Us</h2>
                <p>
                  <a
                    className="footer-icon"
                    href="https://www.facebook.com/codeclub.iitr"
                  >
                    <FaFacebookSquare className="footer-icon" size={40} />
                  </a>
                  <a
                    className="footer-icon"
                    href="https://www.instagram.com/codeclub.iitr/"
                  >
                    <FaInstagram className="footer-icon" size={40} />
                  </a>
                  <a
                    className="footer-icon"
                    href="https://twitter.com/codeclub_iitr"
                  >
                    <FaTwitterSquare className="footer-icon" size={40} />
                  </a>
                  <a
                    className="footer-icon"
                    href="https://www.linkedin.com/company/codeclub-iitr/"
                  >
                    <FaLinkedin className="footer-icon" size={40} />
                  </a>
                </p>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
