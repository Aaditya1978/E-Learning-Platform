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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState([""]);
  const [videoTitle, setVideoTitle] = useState([""]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [check, setCheck] = useState([false]);

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

    fetch(`${process.env.REACT_APP_BASE_URL}/api/user/getCourseById`, {
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
        setTitle(data.course.name);
        setDescription(data.course.description);
        setVideoUrl(data.course.videos.map((video) => video.url));
        setVideoTitle(data.course.videos.map((video) => video.title));
        setCheck(data.userCourse.checked);
        setProgress(data.userCourse.progress);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [navigate, id]);

  const handleVideoComplete = () => {
    if (currentVideo < videoUrl.length - 1) {
      if (!check[currentVideo]) {
        fetch(
          `${process.env.REACT_APP_BASE_URL}/api/user/handleCourseProgress`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId: id,
              token: localStorage.getItem("token"),
              progress: progress + 1,
              checked: check.map((item, index) =>
                index === currentVideo ? true : item
              ),
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data.success) {
              localStorage.removeItem("token");
              navigate("/");
            }
            setProgress(data.userCourse.progress);
            setCheck(data.userCourse.checked);
            setCurrentVideo(currentVideo + 1);
          });
      } else {
        setCurrentVideo(currentVideo + 1);
      }
    } else {
      if (!check[currentVideo]) {
        fetch(
          `${process.env.REACT_APP_BASE_URL}/api/user/handleCourseProgress`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId: id,
              token: localStorage.getItem("token"),
              progress: progress + 1,
              checked: check.map((item, index) =>
                index === currentVideo ? true : item
              ),
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data.success) {
              localStorage.removeItem("token");
              navigate("/");
            }
            setProgress(data.userCourse.progress);
            setCheck(data.userCourse.checked);
          });
      }
    }
  };

  const handleVideoCheck = (index) => {
    if (check[index]) {
      check[index] = false;
      fetch(`${process.env.REACT_APP_BASE_URL}/api/user/handleCourseProgress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: id,
          token: localStorage.getItem("token"),
          progress: progress - 1,
          checked: check,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            localStorage.removeItem("token");
            navigate("/");
          }
          setProgress(data.userCourse.progress);
          setCheck(data.userCourse.checked);
        });
    } else {
      check[index] = true;
      fetch(`${process.env.REACT_APP_BASE_URL}/api/user/handleCourseProgress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: id,
          token: localStorage.getItem("token"),
          progress: progress + 1,
          checked: check,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            localStorage.removeItem("token");
            navigate("/");
          }
          setProgress(data.userCourse.progress);
          setCheck(data.userCourse.checked);
        });
    }
  };

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
            <h2>{title}</h2>
            <div className="main-course-container">
              <div className="tut-vid">
                <div className="vid-player">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    controls
                    url={videoUrl[currentVideo]}
                    onEnded={handleVideoComplete}
                  />
                </div>

                <div className="description">
                  <h5>Description</h5>
                  <hr />
                  <p>{description}</p>
                </div>
              </div>
              <div className="tut-topics">
                <div className="course-completion">
                  <h3>Course Progress</h3>
                  <h4>
                    {progress}/{videoUrl.length}
                  </h4>
                </div>
                <ProgressBar now={(progress / videoUrl.length) * 100} />
                <div className="index">
                  {videoTitle.map((title, index) => (
                    <Card className="lectures" key={index}>
                      <Card.Body onClick={() => setCurrentVideo(index)}>
                        <Form.Check
                          class="checkbox-box"
                          type="checkbox"
                          label={title}
                          checked={check[index]}
                          onChange={handleVideoCheck.bind(this, index)}
                        />
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
