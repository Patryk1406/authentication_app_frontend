import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

interface Props {
  token: string;
  activeKey: string
  setToken: (arg: string) => void;
  setActiveKey: (newActiveKey: string) => void;
}

export function Header({
  token, activeKey, setToken, setActiveKey,
}: Props) {
  const navigate = useNavigate();

  const logOut = () => {
    setToken('');
    localStorage.removeItem('token');
    setActiveKey('login');
    navigate('/');
  };

  if (!token) {
    return (
      <Nav variant="tabs" className="justify-content-center" activeKey={activeKey}>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/signup" eventKey="signup" onClick={() => setActiveKey('signup')}>Sign up</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/" eventKey="login" onClick={() => setActiveKey('login')}>Sign in</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

  return (
    <Nav variant="tabs" className="justify-content-center" activeKey="admin">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/admin" eventKey="admin" onClick={() => setActiveKey('admin')}>Admin panel</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as="button" eventKey="logout" onClick={logOut}>Log out</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
