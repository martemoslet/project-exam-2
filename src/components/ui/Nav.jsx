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
import { FaRegUser } from 'react-icons/fa';


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

            { profile ?
            <div>
              <Link to={`/profilePage/${profile.name}`}><FaRegUser size={20} className="me-2" /></Link>
              <Nav.Link href="#"><Logout /></Nav.Link>
            </div> 
            
            :
            <div>
            <Nav.Link href="/loginPage">Login</Nav.Link>
            <Nav.Link href="/registerPage">Register</Nav.Link>
            </div>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}