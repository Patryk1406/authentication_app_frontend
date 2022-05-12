import React, {
  ChangeEvent, FormEvent, useReducer, useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserEntity } from 'types';
import { FormGroup } from '../../components/Form/FormGroup/FormGroup';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { FormWithValidation } from '../../components/Form/FormWithValidation/FormWithValidation';
import { EmailFormGroup } from '../../components/Form/FormGroup/EmailFormGroup';
import { PasswordFormGroup } from '../../components/Form/FormGroup/PasswordFormGroup';
import { FormTitle } from '../../components/Form/FormTitle/FormTitle';
import { FormWrapper } from '../../components/Form/FormWrapper/FormWrapper';
import { ContainerCenter } from '../../components/ContainerCenter/ContainerCenter';
import { useErrorModal } from '../../hooks/useErrorModal';
import { sendRequest } from '../../utils/send-request';
import { CustomAlert } from '../../components/Alerts/CustomAlert';

enum UserActionType {
  'CHANGE_EMAIL',
  'CHANGE_PASSWORD',
  'CHANGE_NAME',
}

export interface UserAction {
  type: UserActionType.CHANGE_NAME | UserActionType.CHANGE_EMAIL | UserActionType.CHANGE_PASSWORD
  payload: string;
}

const userReducer = (prevState: UserEntity, action: UserAction): UserEntity => {
  switch (action.type) {
    case UserActionType.CHANGE_EMAIL:
      return { ...prevState, email: action.payload };
    case UserActionType.CHANGE_NAME:
      return { ...prevState, name: action.payload };
    case UserActionType.CHANGE_PASSWORD:
      return { ...prevState, password: action.payload };
    default:
      return prevState;
  }
};

const initialUser = {
  email: '',
  name: '',
  password: '',
};

export function Registration() {
  const [user, dispatchUser] = useReducer(userReducer, initialUser);
  const [modalElement, openModal, setModalMessage] = useErrorModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchUser({ type: UserActionType.CHANGE_EMAIL, payload: e.target.value });
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!/[a-z]/.test(input.value)) input.setCustomValidity('Your password must contain a lowercase letter.');
    else if (!/[A-Z]/.test(input.value)) input.setCustomValidity('Your password must contain an uppercase letter.');
    else if (!/\d/.test(input.value)) input.setCustomValidity('Your password must contain a number.');
    else if (!/[!@#$%^&*()_\-=+\\|'";:?/.>,<[\]{}`~]/.test(input.value)) input.setCustomValidity('Your password must contain a special sign.');
    else input.setCustomValidity('');

    dispatchUser({ type: UserActionType.CHANGE_PASSWORD, payload: e.target.value });
  };

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^\p{L}+$/u.test(e.target.value)) e.target.setCustomValidity('Your name can only be made up of letters.');
    else e.target.setCustomValidity('');
    dispatchUser({ type: UserActionType.CHANGE_NAME, payload: e.target.value });
  };

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await sendRequest('http://localhost:3001/user/signup', 'POST', {}, user);
    if (!res.ok) {
      setIsLoading(false);
      if (res.status === 409) {
        const { message } = await res.json() as { message: string };
        setModalMessage(message);
      }
      openModal();
    } else {
      setIsLoading(false);
      setShowAlert(true);
      window.setTimeout(() => navigate('/login'), 2000);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ContainerCenter>
      {modalElement}
      <FormTitle title="Create your account" />
      <FormWrapper>
        <CustomAlert show={showAlert} content="You are registered successfully! We will redirect you in a moment" className="text-center" dismissible={false} />
        <FormWithValidation onSubmit={formSubmitHandler} buttonText="Sign up">
          <EmailFormGroup email={user.email} changeEmailHandler={changeEmailHandler} />
          <PasswordFormGroup
            password={user.password as string}
            changePasswordHandler={changePasswordHandler}
            showDescription
            minLength={8}
          />
          <FormGroup
            inputLabel="Name"
            inputPlaceholder="Enter your first name"
            inputType="text"
            inputValue={user.name}
            onChangeInputValue={changeNameHandler}
            minLength={2}
            maxLength={60}
          />
        </FormWithValidation>
        <p className="mt-4 h6 text-center">
          You are already signed up? Let&apos;s click&nbsp;
          <Link to="/login">here</Link>
          &nbsp;to go to the login page.
        </p>
      </FormWrapper>
    </ContainerCenter>
  );
}
