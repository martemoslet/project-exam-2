import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as storage from "../auth/storage"
import { Link } from 'react-router-dom';
import Logout from '../profile/Logout';
import { useState, createContext } from "react";

const profile = storage.load("profile");

export default function Navbarnav() {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Holidaze</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profilePage">Profile</Nav.Link>
            <Nav.Link href="/registerPage">Register</Nav.Link>

            { profile ? 
            <Nav.Link href="#"><Logout /></Nav.Link>
            :
            <Nav.Link href="/loginPage">Login</Nav.Link> }
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}