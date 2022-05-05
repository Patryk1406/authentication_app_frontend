import React, {
  ChangeEvent, FormEvent, useReducer, useState,
} from 'react';
import {
  Button,
  Col, Container, Form, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserEntity } from '../../types/user.entity';
import { FormGroup } from '../../components/FormGroup/FormGroup';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { ErrorModal } from '../../components/Modals/ErrorModal/ErrorModal';

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
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorBody, setErrorBody] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeModalHandler = () => {
    setShowErrorModal(false);
  };

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
    setValidated(true);
    setIsLoading(true);
    const res = await fetch('http://localhost:3001/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      setIsLoading(false);
      if (res.status === 409) {
        const { message } = await res.json() as { message: string };
        console.log(message);
        setErrorBody(message);
      }
      setShowErrorModal(true);
    } else {
      navigate('/login');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      { showErrorModal && <ErrorModal body={errorBody} closeHandler={closeModalHandler} />}
      <Container>
        <Row>
          <Col>
            <h2 className="text-center">Create your account</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="12" md="8" xl="6">
            <Form onSubmit={formSubmitHandler} validated={validated}>
              <FormGroup inputLabel="E-mail address" inputPlaceholder="Enter your email address" inputType="email" inputValue={user.email} onChangeInputValue={changeEmailHandler} maxLength={70} />
              <FormGroup inputLabel="Password" inputPlaceholder="Enter your password address" inputType="password" inputValue={user.password} onChangeInputValue={changePasswordHandler} minLength={8} />
              <FormGroup inputLabel="Name" inputPlaceholder="Enter your first name" inputType="text" inputValue={user.name} onChangeInputValue={changeNameHandler} minLength={2} maxLength={60} />
              <Button variant="primary" type="submit">Sign Up</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
