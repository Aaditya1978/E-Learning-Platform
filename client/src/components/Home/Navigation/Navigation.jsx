import React from "react";
import { Link } from "react-scroll";
import { useNavigate  } from "react-router-dom";
import logo from "../../../images/logo.png";
import "./Navigation.css";

export default function Navigation() {

  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-head">
        <a href="/" className="navbar-logo">
          <img className="nav-logo" src={logo} alt="logo" />
        </a>
        <div className="navbar-links">
          <span><Link activeClass="active" to="home" spy={true} smooth={true}>Home</Link></span>
          <span><Link  to="about" spy={true} smooth={true}>About</Link></span>
          <span><Link  to="footer" spy={true} smooth={true}>Contact Us</Link></span>
        </div>
      </div>
      <div className="justify-content-left buttons">
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleSignupClick}>Signup</button>
      </div>
    </div>
  );
}
