import React, { useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import LogoutButton from "./Logout";
import logo from "../logo.png"; // Assuming the component is in a subdirectory
import bannerImage from "../banner.jpg";

const Layout = () => {
  const isLoggedIn = localStorage.getItem("accessToken") !== null;
  const location = useLocation();
  const isMerchantLogin = location.pathname === "/merchantLogin";
  const isCustomerLogin = location.pathname === "/customerLogin";

  const [showCustomization, setShowCustomization] = useState(false);

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
  };

  const handleSettingsClick = () => {
    setShowCustomization(true);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="sticky-top">
        <Container style={{minWidth:"100%"}}>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Logo" width="50" height="50" />{" "}
            {/* Adjust width and height as needed */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" style={{ marginRight: "10px" }}>
                Home
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/products"
                    style={{ marginRight: "10px" }}>
                    Products
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/plans"
                    style={{ marginRight: "10px" }}>
                    Plans
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/subscriptions"
                    style={{ marginRight: "10px" }}>
                    Subscriptions
                  </Nav.Link>
                  <Dropdown
                    show={showCustomization}
                    onToggle={setShowCustomization}>
                    <Dropdown.Toggle
                      as={Nav.Link}
                      to="/settings"
                      style={{ marginRight: "10px" }}
                      onClick={handleSettingsClick}>
                      Settings
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/customization">
                        Customization
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Nav.Item>
                    <LogoutButton onLogout={handleLogout} />
                  </Nav.Item>
                </>
              ) : (
                <>
                  {!isMerchantLogin && !isCustomerLogin && (
                    <>
                      <Nav.Link
                        as={Link}
                        to="/merchantLogin"
                        style={{ marginRight: "10px" }}>
                        Merchant Login
                      </Nav.Link>
                      {/* <span style={{ marginRight: "10px" }}>Don't have an account?</span> */}
                    </>
                  )}
                </>
              )}
              <Nav.Link as={Link} to="/contact" style={{ marginRight: "10px" }}>
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;