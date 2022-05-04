import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import React from 'react';

interface Props {
  path: string;
  text: string;
  onClick?: () => void;
}

export function NavItem({ path, text, onClick }: Props) {
  return (
    <Nav.Item>
      <Nav.Link as={NavLink} to={path} onClick={onClick}>{text}</Nav.Link>
    </Nav.Item>
  );
}
