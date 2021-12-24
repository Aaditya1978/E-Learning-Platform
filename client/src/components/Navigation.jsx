import React from "react";
import { Link } from "react-scroll";
import logo from "../images/logos2.png";
import "./Navigation.css";

export default function Navigation() {
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
        <button>Login</button>
        <button>Signup</button>
      </div>
    </div>
  );
}
