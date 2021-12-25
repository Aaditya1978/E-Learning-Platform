import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageProgress from "react-page-progress";
import { useNavigate } from "react-router-dom";
import PreLoader from "./PreLoader";
import Navigation from "./Navigation";
import Category from "./Category";
import Number from "./Number";
import About from "./About";
import Footer from "./Footer";
import banner from "../images/banner.png";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          <PageProgress color={"#178d4a"} height={4} />

          <Navigation />

          <div name="home" className="home-container">
            <Container className="header">
              <Row>
                <Col>
                  <h2 className="heading">
                    Programming Journey <br /> with new personalized experience
                  </h2>
                  <p className="sub-heading">So Don't wait!</p>
                  <button className="join-button" onClick={handleClick}>
                    JOIN NOW
                  </button>
                </Col>
                <Col>
                  <img className="banner" src={banner} alt="banner" />
                </Col>
              </Row>
            </Container>
          </div>

          <Category />

          <Number />

          <About />

          <Footer />
        </div>
      )}
    </div>
  );
}
