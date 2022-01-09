import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";
import logo from "../../images/logo.png";
import "./UserHome.css";

export default function UserHome() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const response = fetch("api/user/verifyToken", {
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
  }, []);

  return (
    <div className="userhome">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand aria-expanded="false">
            <FiMenu className="nav-icon" onClick={(e) => setSidebarOpen(!sidebarOpen)} />
            <img className="nav-logo" src={logo} alt="logo" />
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className={`${sidebarOpen ? "openedsidebar": ""} sidebar mt-5`}>
        <FiMenu />
      </div>
      <div className={`${sidebarOpen ? "openedmain": ""} maincontent mt-5`}>content</div>
    </div>
  );
}
