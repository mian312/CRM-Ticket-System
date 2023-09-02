import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

export const Header = () => {
  return (
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
      <Navbar.Brand className="ps-1">
        <img src={logo} alt="logo" className="img-fluid rounded-circle" width="40px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link className="px-2"><Link to={'/tickets'}>Tickets</Link></Nav.Link>
          <Nav.Link className="px-2"><Link to={'/dashboard'}>Dashboard</Link></Nav.Link>
          <Nav.Link className="px-2"><Link to={'/Logout'}>Logout</Link></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};