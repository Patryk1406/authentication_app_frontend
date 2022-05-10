import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

interface Props {
  children: ReactNode;
}

export function ContainerCenter({ children }: Props) {
  return (
    <Container className="position-absolute start-50 top-50 translate-middle" fluid>
      {children}
    </Container>
  );
}
