import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Row, Col, ProgressBar } from "react-bootstrap";
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
  const [userCoursesIds, setUserCoursesIds] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

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

    fetch(`${process.env.REACT_APP_BASE_URL}/api/user/getTrackById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        token: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTrack(data.track);
        setCourses(data.courses.courses);
        setUserCoursesIds(data.userCoursesIds);
        setUserCourses(data.userCourses);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [id, navigate]);

  const handleStartCourse = (courseId) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/user/startCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: courseId,
        token: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate(`/course/${courseId}`);
        }
      });
  };

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
                {userCoursesIds.length > 0 ? (
                  <h2 className="track-heading">Your Enrolled Courses</h2>
                ) : (
                  ""
                )}
                {courses
                  .filter((course) => userCoursesIds.includes(course._id))
                  .map((course) => (
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
                            <ProgressBar
                              now={userCourses.find(userCourse => userCourse.course === course._id).progress/course.videos.length * 100}
                            />
                          <Button
                            variant="primary"
                            onClick={() => navigate(`/course/${course._id}`)}
                          >
                             <FaArrowRight /> Continue
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>

              <Row>
                {courses.filter(
                  (course) =>
                    course.difficulty === "Beginner" &&
                    !userCoursesIds.includes(course._id)
                ).length > 0 ? (
                  <>
                    <h2 className="track-heading">Beginner Level</h2>
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
                              <Button
                                variant="primary"
                                onClick={() => handleStartCourse(course._id)}
                              >
                                Start Course <FaArrowRight />
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ) : (
                        ""
                      )
                    )}
                  </>
                ) : null}
              </Row>
              <Row>
                {courses.filter(
                  (course) =>
                    course.difficulty === "Intermediate" &&
                    !userCoursesIds.includes(course._id)
                ).length > 0 ? (
                  <>
                    <h2 className="track-heading">
                      Intermidetate Level Courses
                    </h2>
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
                              <Button
                                variant="primary"
                                onClick={() => handleStartCourse(course._id)}
                              >
                                Start Course <FaArrowRight />
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ) : (
                        ""
                      )
                    )}
                  </>
                ) : null}
              </Row>
              <Row>
                {courses.filter(
                  (course) =>
                    course.difficulty === "Advanced" &&
                    !userCoursesIds.includes(course._id)
                ).length > 0 ? (
                  <>
                    <h2 className="track-heading">Advance Level Courses</h2>
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
                              <Button
                                variant="primary"
                                onClick={() => handleStartCourse(course._id)}
                              >
                                Start Course <FaArrowRight />
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ) : (
                        ""
                      )
                    )}
                  </>
                ) : null}
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
