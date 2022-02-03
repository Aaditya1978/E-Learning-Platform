import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageProgress from "react-page-progress";
import { useNavigate } from "react-router-dom";
import PreLoader from "../PreLoader/PreLoader";
import Navigation from "./Navigation/Navigation";
import Category from "./Category/Category";
import Number from "./Number/Number";
import About from "./About/About";
import Footer from "../Footer/Footer";
import banner from "../../images/banner.png";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/user/verifyToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            navigate("/home");
          } else {
            localStorage.removeItem("token");
          }
        });
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [navigate]);

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
