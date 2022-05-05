import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export function LoadingSpinner() {
  return (
    <Container fluid className="position-fixed start-0 top-50 translate-middle-y d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}
