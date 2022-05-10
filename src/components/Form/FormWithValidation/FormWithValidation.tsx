import React, { FormEvent, ReactNode, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  children: ReactNode;
}

export function FormWithValidation({
  children, onSubmit, buttonText,
}: Props) {
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const onClickSubmitBtnHandler = () => {
    setIsValidated(true);
  };

  return (
    <Form validated={isValidated} onSubmit={onSubmit}>
      {children}
      <Button variant="primary" type="submit" onClick={onClickSubmitBtnHandler}>{buttonText}</Button>
    </Form>
  );
}
