import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext, IAuthContext } from '../../store/authContext';
import { NavItem } from './NavItem/NavItem';

export function Header() {
  const { token, logOutHandler } = useContext(AuthContext) as IAuthContext;

  const toShowIfLogged = (
    <>
      <NavItem path="/admin" text="Admin panel" />
      <NavItem path="/signup" text="Log out" onClick={logOutHandler} />
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
        <LinkContainer to={token ? '/admin' : '/login'}>
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
