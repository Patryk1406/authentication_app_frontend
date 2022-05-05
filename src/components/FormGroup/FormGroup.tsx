import React, { ChangeEvent, useRef } from 'react';
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
}

export function FormGroup({
  inputLabel, inputType, inputPlaceholder, onChangeInputValue, maxLength, minLength, inputValue,
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
      {inputType === 'password' && (
      <Form.Text>
        Your password must contain the following:
        <ul>
          <li>minimum 8 chars</li>
          <li>uppercase letter</li>
          <li>lowercase letter</li>
          <li>number</li>
          <li>special sign</li>
        </ul>
      </Form.Text>
      )}
    </Form.Group>
  );
}
