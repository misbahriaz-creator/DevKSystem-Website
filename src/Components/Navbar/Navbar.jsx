import React, { useEffect, useRef } from 'react';
import "./Navbar.css";
import logo from "../Images/logo.png";
import { IoMdCall } from "react-icons/io";
import { FaBarsStaggered } from "react-icons/fa6";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import gsap from "gsap";

export default function MyNavbar() {
  const navbarRef = useRef(null);

  useEffect(() => {
    // Slide navbar in from top on page load
    gsap.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    
  }, []);

  return (
    <Navbar
      ref={navbarRef}
      collapseOnSelect
      expand="lg"
      fixed="top" // fixed navbar
      className="navbar"
      style={{ transition: "background-color 0.3s" }}
    >
      <Container>
        <Navbar.Brand><img src={logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler">
          <FaBarsStaggered className="toggler-icon" />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto menu">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Projects</Nav.Link>
            <Nav.Link>Meet</Nav.Link>
            <Nav.Link>Reviews</Nav.Link>
          </Nav>
          <Nav className="menu2side">
            <Nav.Link><IoMdCall className='icon' />+92 3139614220</Nav.Link>
            <Button variant="light">Book a Call</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
