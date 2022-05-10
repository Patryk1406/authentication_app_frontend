import React, { ChangeEvent, ReactNode, useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

interface Props {
  inputLabel: string;
  inputType: string;
  inputPlaceholder: string;
  inputValue: string;
  onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  maxLength?: number;
  formText?: ReactNode;
}

export function FormGroup({
  inputLabel,
  inputType,
  inputPlaceholder,
  onChangeInputValue,
  maxLength,
  minLength,
  inputValue,
  formText,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const changeInputType = (newType: string) => {
    inputRef.current?.setAttribute('type', newType);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{inputLabel}</Form.Label>
      <InputGroup className="align-items-center position-relative">
        <Form.Control
          ref={inputRef}
          type={inputType}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={onChangeInputValue}
          required
          minLength={minLength}
          maxLength={maxLength}
          autoComplete="on"
        />
        { inputType === 'password' && <FontAwesomeIcon className="position-absolute end-0 me-2" style={{ cursor: 'pointer' }} icon={faEye} onMouseDown={() => changeInputType('text')} onMouseUp={() => changeInputType('password')} />}
      </InputGroup>
      <Form.Text>{formText}</Form.Text>
    </Form.Group>
  );
}
