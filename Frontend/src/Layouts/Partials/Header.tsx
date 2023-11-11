import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { toast } from "react-toastify";
import { userLogout } from "../../api/UserApi";
import { useDispatch } from "react-redux";
import { logOut } from "../../Pages/Entry/loginSlice";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logMeOut = () => {
    try {
      userLogout();
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("crmSite");
      dispatch(logOut())
      toast.success("Logged out successfully")
      navigate('/')
    } catch (error) {
      toast.warning("Something went wrong! Please try again later")
    }
  }

  return (
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md" className="h-100">
      <Navbar.Brand className="ps-1">
        <img src={logo} alt="logo" className="img-fluid rounded-circle" width="40px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link className="px-2">
            <Link to={'/tickets'}>Tickets</Link>
          </Nav.Link>
          <Nav.Link className="px-2">
            <Link to={'/dashboard'}>Dashboard</Link>
          </Nav.Link>
          <Nav.Link className="px-2" onClick={logMeOut}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};