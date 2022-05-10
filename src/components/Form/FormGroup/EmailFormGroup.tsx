import React, { ChangeEvent } from 'react';
import { FormGroup } from './FormGroup';

interface Props {
  email: string;
  changeEmailHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export function EmailFormGroup({ email, changeEmailHandler }: Props) {
  return <FormGroup inputLabel="E-mail address" inputPlaceholder="Enter your email address" inputType="email" inputValue={email} onChangeInputValue={changeEmailHandler} maxLength={70} />;
}
