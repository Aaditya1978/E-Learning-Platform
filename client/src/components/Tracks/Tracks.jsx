import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import PreLoader from "../PreLoader/PreLoader";
import UserNavBar from "../UserNavBar/UserNavBar";
import Footer from "../Footer/Footer";
import "./Tracks.css";

export default function Tracks() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
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
          if (!data.user) {
            localStorage.removeItem("token");
            navigate("/");
          }
        });
    }

    fetch(`${process.env.REACT_APP_BASE_URL}/api/user/getAllTracks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTracks(data.tracks);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          {/* Navbar compnent */}
          <UserNavBar />

          <div className="tracks container">
            {/* main heading */}
            <div className="main-heading">
              <h2>Avaliable Tracks</h2>
            </div>

            {/* tracks cards */}
            <div className="tracks-card">
              <Row>
                {tracks.map((track) => (
                <Col key={track._id}>
                  <Card>
                    <Card.Body>
                      <Card.Img
                        fluid="true"
                        variant="top"
                        src={track.image}
                      />
                      <Card.Title>{track.name}</Card.Title>
                      <Card.Text>
                        {track.description}
                      </Card.Text>
                      <Button
                        variant="success"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/track/${track._id}`);
                        }}
                      >
                        Prepare
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                ))}
              </Row>
            </div>
          </div>

          {/* footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
