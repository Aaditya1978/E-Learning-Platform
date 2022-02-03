import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import { FiPlus, FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline, MdOutlineOpenInNew } from "react-icons/md";
import ReactPlayer from "react-player";
import "./AdminTrack.css";

export default function AdminTrack() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [name, setName] = useState("");
  const [courses, setCourse] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin_login");
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/verifyToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminToken: localStorage.getItem("adminToken"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.admin) {
            localStorage.removeItem("adminToken");
            navigate("/admin_login");
          } else {
            fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/courses/${id}` , {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((cdata) => {
                setCourse(cdata.courses.courses);
                setName(cdata.track.name);
              });
          }
        });
    }
  }, [id, navigate]);

  const deleteCourse = (cid) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/courseDelete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: cid,
        trackId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCourse(data.courses.courses);
      });
  };

  return (
    <div>
      <div className="container admin-home">
        {/*Main Heading */}
        <div className="admin-home-heading">
          <h1>{name}</h1>
        </div>

        {/* Main Div */}
        <div className="container admin-track">
          {/* Tacks Heading */}
          <div className="admin-track-heading">
            <h2>Avaliable Courses</h2>
          </div>

          {/* Add Track */}
          <div className="add-track">
            <Button
              variant="primary"
              onClick={() => navigate("/admin_add_course/" + id)}
            >
              <FiPlus /> Add Course
            </Button>
          </div>

          {/* Tracks Table */}
          {courses.length > 0 ? (
            <div className="tracks">
              <Table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Difficulty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <>
                      <tr key={course._id}>
                        <td>
                          <img src={course.image} alt={course.name} />
                        </td>
                        <td className="title">{course.name}</td>
                        <td className="desc">{course.description}</td>
                        <td className="diff">{course.difficulty}</td>
                        <td className="act">
                          <Button variant="primary" onClick={handleShow}>
                            <MdOutlineOpenInNew /> View
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() =>
                              navigate(`/admin_home/edit_Course/${course._id}`)
                            }
                          >
                            <FiEdit3 /> Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => deleteCourse(course._id)}
                          >
                            <MdDeleteOutline /> Delete
                          </Button>
                        </td>
                      </tr>
                      <Modal
                        size="lg"
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>{course.name} Videos</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {course.videos.map((video) => (
                            <ReactPlayer
                              className="react-player"
                              url={video}
                              controls
                              width="30rem"
                              height="20rem"
                            />
                          ))}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="no-tracks">
              <h3>No course Available</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
