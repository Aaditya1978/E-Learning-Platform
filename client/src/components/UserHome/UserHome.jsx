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
  const [lineData, setLineData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [pieData, setPieData] = useState([0, 0, 0]);

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
          } else {
            setName(data.user.name);
          }
        });
    }
    fetch(`${process.env.REACT_APP_BASE_URL}/api/user/getUserData`, {
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
        let completed = 0;
        let total = 0;
        let left = 0;
        data.courses.forEach((course) => {
          total += course.videos.length;
        });
        data.userCourses.map((course) => {
          completed += course.progress;
          if (course.completed === true) {
            const month = new Date(course.date_completed).getMonth();
            setLineData((prevState) => {
              const newArray = [...prevState];
              newArray[month] += 1;
              return newArray;
            });
          }
        });
        left = total - completed;
        setPieData([completed, total, left]);
      });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/tracks");
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    navigate("/analytics");
  };

  const handleClick3 = (e) => {
    e.preventDefault();
    navigate("/practice");
  };

  const handleClick4 = (e) => {
    e.preventDefault();
    navigate("/compete");
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
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Courses Done",
        data: lineData,
        fill: false,
        backgroundColor: "#178D4A",
        borderColor: "#178D4A",
      },
    ],
  };

  const data2 = {
    labels: ["Videos Done", "Total Videos", "Pending Videos"],
    datasets: [
      {
        label: "Videos",
        data: pieData,
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
                  <Line
                    data={data}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
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
                    <Card.Title>Learning</Card.Title>
                    <Card.Text>
                      Explore our learning platform and learn from the best
                      content. Here you can find the best videos available. 
                      All you need is to just click on the course and start 
                      learning.
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
                      Here you will get know about different analytics and
                      statistics. You can see the progress of your courses 
                      and also see the analytics of programming languages.
                    </Card.Text>
                    <Button variant="success" onClick={handleClick2}>Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "27rem" }}>
                  <AiTwotoneCode className="card-icon" />
                  <Card.Body>
                    <Card.Title>Practice</Card.Title>
                    <Card.Text>
                      Here you can practice your programming skills and also
                      get know about the best practices. Here you will find 
                      best coding questions and also the solutions.
                    </Card.Text>
                    <Button variant="success" onClick={handleClick3}>Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "27rem" }}>
                  <GiTargetPrize className="card-icon" />
                  <Card.Body>
                    <Card.Title>Compete</Card.Title>
                    <Card.Text>
                      Here you can compete with other users and get know about
                      the best your strengths and weaknesses. You can also
                      compete with other programming languages.
                    </Card.Text>
                    <Button variant="success" onClick={handleClick4}>Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "27rem" }}>
                  <HiUserGroup className="card-icon" />
                  <Card.Body>
                    <Card.Title>Community</Card.Title>
                    <Card.Text>
                      Here you can get know about the best codiing
                      community. You can enrich your knowledge by joining 
                      and get know about some of the best resources.
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
