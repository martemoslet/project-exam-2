import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import * as storage from "../auth/storage";
import { Link } from "react-router-dom";
import Logout from "../profile/Logout";
import { FaRegUser } from "react-icons/fa";

const profile = storage.load("profile");

export default function Navbarnav() {
  return (
    <Navbar bg="white" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="navLogo">
          Holidaze
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {profile ? (
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <Link to={`/profilePage/${profile.name}`}>
                    <FaRegUser size={18} className="me-2" />
                  </Link>

                  <Logout />
                </Navbar.Text>
              </Navbar.Collapse>
            ) : (
              <Navbar.Collapse className="justify-content-end">
                <Link to="/loginPage" className="pe-2">
                  Login
                </Link>
                <Link to="/registerPage">Register</Link>
              </Navbar.Collapse>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
