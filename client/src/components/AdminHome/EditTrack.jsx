import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import "./EditTrack.css";

export default function EditTrack() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin_login");
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/track/${id}` , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((tdata) => {
          setName(tdata.track.name);
          setDescription(tdata.track.description);
          setImageData(tdata.track.image);
        });
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("name", name);
    formData.append("description", description);
    fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/track/${id}` , {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          setErrorMessage(data.error);
          setTimeout(() => {
            setError(false);
          }, 3000);
        } else {
          navigate("/admin_home");
        }
      });
  };

  return (
    <div>
      <div className="add-track-div">
        <Card className="add-track-card">
          <Card.Title>Update Track</Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Track Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Track Name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Track Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="image">Track Image</Form.Label>
                <Form.Control
                  type="File"
                  accept="image/*"
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                    setImageData(e.target.files[0]);
                  }}
                  name="image"
                  placeholder="Upload Track Image"
                />
              </Form.Group>
              <img className="edit-image" src={imageData} alt="track" />
              <div className="add-track-btn">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            <div className="error-message">{error ? errorMessage : ""}</div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
