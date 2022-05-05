import { createPortal } from 'react-dom';
import React from 'react';
import { CustomModal } from '../CustomModal/CustomModal';

interface Props {
  closeHandler: () => void;
  body: string
}

export const ErrorModal = ({ closeHandler, body }: Props) => (
  createPortal(<CustomModal title="Oh no, something went wrong." body={body || 'Our team has been informed about that. Try to repeat your action in a few minutes.'} closeHandler={closeHandler} />, document.body)
);
