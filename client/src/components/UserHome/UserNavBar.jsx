import React from "react";
import "./UserNavBar.css";
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import logo from "../../images/logo.png";
import {MdSearch} from "react-icons/md";
import {MdOutlineMessage} from "react-icons/md";
import {GrAppsRounded} from "react-icons/gr";
import user from "../../images/user.png";
export default function UserNavBar() {
    
    return (
        <Navbar collapseOnSelect expand="lg" className="usernav navbar-fixed-top">
            <Container>
                <Navbar.Brand href="#home">
                    <img className="nav-logo" src={logo} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className="active">Dashboard</Nav.Link>
                        <Nav.Link href="#pratice">Practice</Nav.Link>
                        <Nav.Link href="#leaderboard">Leaderboard</Nav.Link>
                    </Nav>

                    <Form className="d-flex search_bar">
                        <MdSearch className="search-icon"/>
                            <FormControl 
                                type="search"
                                placeholder="Search"
                                className="me-2 search"
                                aria-label="Search"
                            />
                        </Form>
                    <Nav>
                        <GrAppsRounded className="appIcon"/>
                        <MdOutlineMessage className="msgIcon"/>
                        <div style={{display:"flex"}}>
                        <div className="userProfile">
                        <img src={user} className="userIcon" alt=""/>
                        <span>aastha252001</span>
                        </div>
                        <Button variant="dark" className="signOut">SignOut</Button>
                        </div>
                    </Nav>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    );
}