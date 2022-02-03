import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, ProgressBar } from "react-bootstrap";
import PreLoader from "../PreLoader/PreLoader";
import UserNavBar from "../UserNavBar/UserNavBar";
import ReactPlayer from "react-player";
import "./CourseHome.css";

export default function CourseHome() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          {/* Navbar compnent */}
          <UserNavBar />

          <div className="main-course">
            {/* main heading */}
            <h2>Python for Beginners</h2>
            <div className="main-course-container">
              <div className="tut-vid">
                <div className="vid-player">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    controls
                    url="https://www.youtube.com/watch?v=TCHSXAu5pls"
                  />
                </div>

                <div className="description">
                  <h5>Description</h5>
                  <hr />
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam voluptatum animi maiores quo voluptatem expedita
                    nostrum esse nesciunt commodi, necessitatibus magni corporis
                    sed tenetur explicabo modi corrupti deserunt facilis cumque
                    aliquid repellat quis pariatur iusto vero. Dolore aliquid
                    quam, odit possimus impedit illum magni est fuga totam
                    necessitatibus eveniet ut!
                  </p>
                </div>
              </div>
              <div className="tut-topics">
                <div className="course-completion">
                  <h3>Course Progress</h3>
                  <h4>7/20</h4>
                </div>
                <ProgressBar now={60} />
                <div className="index">
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        class="checkbox-box"
                        type="checkbox"
                        label="This is some text within a card body"
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label="This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label="This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label=" This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label=" This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label=" This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label=" This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label=" This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label=" This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label=" This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label=" This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                  <Card className="lectures">
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        label=" This is some text within a card body."
                      />
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
