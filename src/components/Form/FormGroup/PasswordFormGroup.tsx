import React, { ChangeEvent } from 'react';
import { FormGroup } from './FormGroup';

interface Props {
  password: string;
  changePasswordHandler: (e: ChangeEvent<HTMLInputElement>) => void
  showDescription: boolean;
  minLength?: number
}

export function PasswordFormGroup({
  password, changePasswordHandler, showDescription, minLength,
}: Props) {
  return (
    <FormGroup
      inputLabel="Password"
      inputPlaceholder="Enter your password address"
      inputType="password"
      inputValue={password}
      onChangeInputValue={changePasswordHandler}
      minLength={minLength}
      formText={showDescription && (
        <>
          Your password must contain the following:
          <ul>
            <li>minimum 8 chars</li>
            <li>uppercase letter</li>
            <li>lowercase letter</li>
            <li>number</li>
            <li>special sign</li>
          </ul>
        </>
      )}
    />
  );
}
