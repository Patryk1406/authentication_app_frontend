import React from 'react';
import { Col, Row } from 'react-bootstrap';

interface Props {
  title: string
}

export function FormTitle({ title }: Props) {
  return (
    <Row className="h-25 align-items-end mt-4">
      <Col>
        <h1 className="h2 text-center">{ title }</h1>
      </Col>
    </Row>
  );
}
