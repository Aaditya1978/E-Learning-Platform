import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import PreLoader from "../PreLoader/PreLoader";
import UserNavBar from "../UserNavBar/UserNavBar";
import Footer from "../Footer/Footer";
import "./TrackHome.css";

export default function TrackHome() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetch("http://localhost:5000/api/user/verifyToken", {
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

    fetch("http://localhost:5000/api/user/getTrackById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTrack(data.track);
        setCourses(data.courses.courses);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  
  return (
    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          {/* Navbar compnent */}
          <UserNavBar />

          <div className="main-track container">
            {/* main heading */}
            <div className="main-heading">
              <h1>CodeClub - {track.name} Track</h1>
            </div>

            <div>
              <Row>
                {courses.filter((course) => course.difficulty === "Beginner")
                  .length > 0 ? (
                  <h2 className="track-heading">Beginner Level</h2>
                ) : null}
                {courses.map((course) =>
                  course.difficulty === "Beginner" ? (
                    <Col key={course._id}>
                      <Card className="card-course">
                        <Card.Img
                          className="card-img"
                          variant="top"
                          src={course.image}
                        />
                        <Card.Body>
                          <Card.Title>{course.name}</Card.Title>
                          <Card.Text>{course.description}</Card.Text>
                          <Button variant="primary" onClick={()=>{
                            navigate("/course/"+course._id);
                          }}>
                            Start Course <FaArrowRight />
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ) : (
                    ""
                  )
                )}
              </Row>
              <Row>
                {courses.filter(
                  (course) => course.difficulty === "Intermediate"
                ).length > 0 ? (
                  <h2 className="track-heading">Intermidetate Level Courses</h2>
                ) : null}
                {courses.map((course) =>
                  course.difficulty === "Intermediate" ? (
                    <Col key={course._id}>
                      <Card className="card-course">
                        <Card.Img
                          className="card-img"
                          variant="top"
                          src={course.image}
                        />
                        <Card.Body>
                          <Card.Title>{course.name}</Card.Title>
                          <Card.Text>{course.description}</Card.Text>
                          <Button variant="primary" onClick={()=>{
                            navigate("/course/"+course._id);
                          }}>
                            Start Course <FaArrowRight />
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ) : (
                    ""
                  )
                )}
              </Row>
              <Row>
                {courses.filter((course) => course.difficulty === "Advanced")
                  .length > 0 ? (
                  <h2 className="track-heading">Advance Level Courses</h2>
                ) : null}
                {courses.map((course) =>
                  course.difficulty === "Advanced" ? (
                    <Col key={course._id}>
                      <Card className="card-course">
                        <Card.Img
                          className="card-img"
                          variant="top"
                          src={course.image}
                        />
                        <Card.Body>
                          <Card.Title>{course.name}</Card.Title>
                          <Card.Text>{course.description}</Card.Text>
                          <Button variant="primary" onClick={()=>{
                            navigate("/course/"+course._id);
                          }}>
                            Start Course <FaArrowRight />
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ) : (
                    ""
                  )
                )}
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
