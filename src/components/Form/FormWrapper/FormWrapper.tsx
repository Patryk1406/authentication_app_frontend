import React, { ReactNode } from 'react';
import { Col, Row } from 'react-bootstrap';

interface Props {
  children: ReactNode;
}

export function FormWrapper({ children }: Props) {
  return (
    <Row className="justify-content-center h-75">
      <Col xs="12" md="8" xl="6" xxl="4">
        {children}
      </Col>
    </Row>
  );
}
