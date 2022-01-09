import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import {
  FaLaptopCode,
  FaFileCode
} from "react-icons/fa";
import { GiVideoConference } from "react-icons/gi";
import { MdArticle } from "react-icons/md";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import "./Number.css";

export default function Number() {
    return(
        <div className="numbers">
        <Container>
          <Row>
            <Col>
              <FaLaptopCode className="number-icon" size={100} />
              <br />
              <div className="number-text">
                <CountUp start={0} end={100} suffix="+" duration="1">
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>{" "}
                Topics
              </div>
            </Col>
            <Col>
              <GiVideoConference className="number-icon" size={100} />
              <br />
              <div className="number-text">
                <CountUp start={0} end={1200} suffix="+" duration="1">
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>{" "}
                Videos
              </div>
            </Col>
            <Col>
              <MdArticle className="number-icon" size={100} />
              <br />
              <div className="number-text">
                <CountUp start={0} end={500} suffix="+" duration="1">
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>{" "}
                Articles
              </div>
            </Col>
            <Col>
              <FaFileCode className="number-icon" size={100} />
              <br />
              <div className="number-text">
                <CountUp start={0} end={1100} suffix="+" duration="1">
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>{" "}
                Codes
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
}