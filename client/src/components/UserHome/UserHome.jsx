import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import Chart from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import { HiLightBulb, HiUserGroup } from "react-icons/hi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { AiTwotoneCode } from "react-icons/ai";
import { GiTargetPrize } from "react-icons/gi";
import PreLoader from "../PreLoader/PreLoader";
import UserNavBar from "../UserNavBar/UserNavBar";
import Footer from "../Footer/Footer";
import "./UserHome.css";

export default function UserHome() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetch("api/user/verifyToken", {
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
          else{
            setName(data.user.name);
          }
        });
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/tracks");
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    datasets: [
      {
        label: "Tracks Done",
        data: [10, 12, 8, 11, 6, 19, 10, 9, 3, 5],
        fill: false,
        backgroundColor: "#4ed487",
        borderColor: "#4ed487",
      },
    ],
  };

  const data2 = {
    labels: ["Tasks Done", "Total Tasks", "Pending Tasks"],
    datasets: [
      {
        label: "Tasks",
        data: [10, 18, 8],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          {/* Navbar compnent */}
          <UserNavBar />

          {/* main heading */}
          <div className="user-home container">
            <h2>Hello {name}</h2>
            <h6 className="sub-head">What's up going on !!</h6>

            {/* alaytics section */}
            <div className="home-analytic container">
              <h2 className="heading">Your current stats</h2>
              <Row>
                <Col xs={6} md={6}>
                  <Line data={data} />
                </Col>
                <Col xs={6} md={6}>
                  <Doughnut
                    data={data2}
                    width={50}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </Col>
              </Row>
            </div>

            {/* cards section */}
            <Row className="user-home-cards container">
              <h2 className="heading">Features to explore</h2>
              <Col>
                <Card style={{ width: "27rem" }}>
                  <HiLightBulb className="card-icon" />
                  <Card.Body>
                    <Card.Title>Lerning</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </Card.Text>
                    <Button variant="success" onClick={handleClick}>
                      Explore
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "27rem" }}>
                  <IoAnalyticsSharp className="card-icon" />
                  <Card.Body>
                    <Card.Title>Discover</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </Card.Text>
                    <Button variant="success">Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "27rem" }}>
                  <AiTwotoneCode className="card-icon" />
                  <Card.Body>
                    <Card.Title>Practice</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </Card.Text>
                    <Button variant="success">Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "27rem" }}>
                  <GiTargetPrize className="card-icon" />
                  <Card.Body>
                    <Card.Title>Compete</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </Card.Text>
                    <Button variant="success">Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "27rem" }}>
                  <HiUserGroup className="card-icon" />
                  <Card.Body>
                    <Card.Title>Community</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </Card.Text>
                    <Button variant="success">Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          {/* footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
