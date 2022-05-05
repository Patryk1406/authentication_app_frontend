import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  title: string
  body: string;
  closeHandler: () => void;
}

export function CustomModal({
  title, body, closeHandler,
}: Props) {
  return (
    <Modal show onHide={closeHandler} keyboard onEscapeKeyDown={closeHandler} backdrop="static" centered>
      <Modal.Header closeButton>{title}</Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={closeHandler}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
