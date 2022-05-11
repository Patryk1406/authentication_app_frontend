import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  content: string;
}

export function SuccessAlert({ content }: Props) {
  return (
    <Alert variant="success" className="text-center">
      {content}
    </Alert>
  );
}
