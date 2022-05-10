import React, { useState } from 'react';
import { ErrorModal } from '../components/Modals/ErrorModal/ErrorModal';

export function useModal(): [false | JSX.Element, () => void, (message: string) => void] {
  const [isShowed, setIsShowed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const openModal = () => {
    setIsShowed(true);
  };

  const closModalHandler = () => {
    setIsShowed(false);
  };

  const setModalMessage = (message: string) => {
    setErrorMessage(message);
  };

  const modal = isShowed && <ErrorModal body={errorMessage} closeHandler={closModalHandler} />;

  return [modal, openModal, setModalMessage];
}
