import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../redux/slice/userslice'; 
import './Header.css'; 
import imglogo from './s4.png'; 

function Header() {
  const { loginUserStatus } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(resetState());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar style={{ backgroundColor: "#82c341" }} expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={imglogo} alt="NutriNext Logo" style={{ width: '55px', marginRight: '10px' }} />
          NutriNext
        </Navbar.Brand>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!loginUserStatus && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
            {loginUserStatus && (
              <>
                <Nav.Link as={Link} to="/dashboard" style={{ marginRight: "20px" }}>Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/find-nutrition" style={{ marginRight: "20px" }}>Find Nutrition</Nav.Link>
                <Nav.Link as={Link} to="/queries" style={{ marginRight: "20px" }}>Queries</Nav.Link>
                <Nav.Link onClick={signOut} style={{ display: "flex", marginRight: "20px" }}>
                  <FaSignOutAlt /><span>Logout </span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;