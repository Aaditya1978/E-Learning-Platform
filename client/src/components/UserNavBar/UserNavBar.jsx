import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { MdSearch } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { RiCopperCoinLine } from "react-icons/ri";
import "./UserNavBar.css";
import logo from "../../images/logo.png";
import user from "../../images/user.png";

export default function UserNavBar() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

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
          else{
            setEmail(data.user.email);
          }
        });
    }
  }, [navigate]);

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="usernav">
      <Container>
        <Navbar.Brand>
          <img className="nav-logo" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/home" className={({ isActive }) => isActive ? "active links" : "links"}>
              Dashboard
            </NavLink>
            <NavLink to="/discuss" className={({ isActive }) => isActive ? "active links" : "links"}>
              Discuss
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? "active links" : "links"}>
              Analytics
            </NavLink>
          </Nav>

          <Form className="d-flex search_bar">
            <MdSearch className="search-icon" />
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 search"
              aria-label="Search"
            />
          </Form>

          <Nav>
            <Nav.Link style={{ display: "flex" }}>
              <FaTasks className="appIcon" />
            </Nav.Link>
            <Nav.Link style={{ display: "flex" }}>
              <MdOutlineMessage className="msgIcon" />
            </Nav.Link>
            <NavDropdown
              align={{ lg: "start" }}
              title={
                <>
                  <img src={user} className="userIcon" alt="" />
                  <span className="userp-text">{email}</span>
                </>
              }
              className="userProfile"
            >
              <NavDropdown.Item className="drop-point">
                <RiCopperCoinLine /> CodeCoins - 0{" "}
              </NavDropdown.Item>
              <NavDropdown.Item>
                <CgProfile /> My Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogOut}>
                <BiLogOut /> Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
