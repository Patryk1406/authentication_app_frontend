import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

interface Props {
  path: string;
  text: string;
  className?: string;
  onClick?: () => void;
}

export function NavItem({
  path, text, onClick, className,
}: Props) {
  return (
    <Nav.Item className={className}>
      <Nav.Link as={NavLink} to={path} onClick={onClick}>{text}</Nav.Link>
    </Nav.Item>
  );
}
