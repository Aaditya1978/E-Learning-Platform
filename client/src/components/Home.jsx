import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageProgress from "react-page-progress";
import { TraceSpinner } from "react-spinners-kit";
import Navigation from "./Navigation";
import Category from "./Category";
import Number from "./Number";
import About from "./About";
import Footer from "./Footer";
import banner from "../images/banner2.png";
import "./Home.css";

export default function Home() {

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3600);
  }, []);

  return (
    <div>

      {loading ? (
        <div className="pre-loader">
        <TraceSpinner size={110}/>
        </div>
      ) : (
      <div>

      <PageProgress color={'#178d4a'} height={4}/>

      <Navigation />

      <div name="home" className="home-container">
        <Container className="header">
          <Row>
            <Col>
              <h2 className="heading">
                Programming Journey <br /> with new personalized experience
              </h2>
              <p className="sub-heading">So Don't wait!</p>
              <button className="join-button">JOIN NOW</button>
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
