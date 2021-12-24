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
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col>
            <div className="footer-text">
              <h2>Support</h2>
              <p>
                We are a team of students who are passionate about learning and
                sharing knowledge. We are always open to new ideas and
                collaborations. If you have any questions, please contact us at{" "}
                <a href="mailto:aadityasinghal1978@gmai.com">Here</a>
              </p>
            </div>
          </Col>
          <Col>
            <div className="footer-contact">
              <h2>Contact Us</h2>
              <Row>
                <a href="mailto:support@codeclub.com">
                  <MdEmail className="contact-icon" size={30} />{" "}
                  support@codeclub.com
                </a>
              </Row>
              <Row>
                <p>
                  <FaPhoneAlt className="contact-icon" size={30} />{" "}
                  +91-9888888888
                </p>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="footer-text">
              <h2>Follow Us</h2>
              <p>
                <a
                  className="footer-icon"
                  href="https://www.facebook.com/codeclub.iitr"
                >
                  <FaFacebookSquare className="footer-icon" size={50} />
                </a>
                <a
                  className="footer-icon"
                  href="https://www.instagram.com/codeclub.iitr/"
                >
                  <FaInstagram className="footer-icon" size={50} />
                </a>
                <a
                  className="footer-icon"
                  href="https://twitter.com/codeclub_iitr"
                >
                  <FaTwitterSquare className="footer-icon" size={50} />
                </a>
                <a
                  className="footer-icon"
                  href="https://www.linkedin.com/company/codeclub-iitr/"
                >
                  <FaLinkedin className="footer-icon" size={50} />
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
