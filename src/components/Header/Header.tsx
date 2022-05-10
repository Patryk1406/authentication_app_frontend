import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext, IAuthContext } from '../../store/authContext';
import { NavItem } from './NavItem/NavItem';

export function Header() {
  const { token, logOut } = useContext(AuthContext) as IAuthContext;

  const toShowIfLogged = (
    <>
      <NavItem path="/admin-panel" text="Admin panel" />
      <NavItem path="/login" text="Log out" onClick={logOut} />
    </>
  );

  const toShowIfNotLogged = (
    <>
      <NavItem path="/signup" text="Sign up" />
      <NavItem path="/login" text="Sign in" />
    </>
  );

  return (
    <Navbar bg="primary" variant="dark" expand="md" className="mb-3">
      <Container fluid>
        <LinkContainer to={token ? '/admin-panel' : '/login'}>
          <Navbar.Brand>My App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {token ? toShowIfLogged : toShowIfNotLogged}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
