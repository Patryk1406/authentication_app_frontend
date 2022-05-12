import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  show: boolean
  content: string;
  variant?: string;
  className?: string;
  dismissible?: boolean
  closeHandler?: () => void

}

export function CustomAlert({
  show, content, className, dismissible, closeHandler, variant,
}: Props) {
  return (
    <Alert show={show} variant={variant || 'success'} className={className || 'text-center'} dismissible={dismissible} onClose={closeHandler}>
      {content}
    </Alert>
  );
}
