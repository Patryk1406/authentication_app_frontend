import React, {
  ChangeEvent, FormEvent, useContext, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormWithValidation } from '../../components/Form/FormWithValidation/FormWithValidation';
import { EmailFormGroup } from '../../components/Form/FormGroup/EmailFormGroup';
import { PasswordFormGroup } from '../../components/Form/FormGroup/PasswordFormGroup';
import { FormWrapper } from '../../components/Form/FormWrapper/FormWrapper';
import { FormTitle } from '../../components/Form/FormTitle/FormTitle';
import { ContainerCenter } from '../../components/ContainerCenter/ContainerCenter';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { AuthContext, IAuthContext } from '../../store/authContext';
import { useErrorModal } from '../../hooks/useErrorModal';
import { sendRequest } from '../../utils/send-request';
import { CustomAlert } from '../../components/Alerts/CustomAlert';

export function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext) as IAuthContext;
  const [showAlert, setShowAlert] = (
    useState<boolean>(!!(useLocation().state as { loggedOut: boolean })?.loggedOut)
  );
  const [modalElement, openModal, setModalMessage] = useErrorModal();

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await sendRequest('http://localhost:3001/user/login', 'POST', {}, { email, password });
    console.log(res.ok);
    if (!res.ok) {
      setIsLoading(false);
      if (res.status !== 500) {
        const { message } = await res.json() as { message: string };
        setModalMessage(message);
      }
      openModal();
    } else {
      const {
        token,
        expirationTime,
      } = await res.json() as { token: string, expirationTime: number };
      logIn(token, expirationTime);
      navigate('/admin-panel');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ContainerCenter>
      {modalElement}
      <FormTitle title="Log in" />
      <FormWrapper>
        <CustomAlert show={showAlert} variant="warning" dismissible content="Your session has expired. You have to log in again due to the security reasons." closeHandler={() => setShowAlert(false)} />
        <FormWithValidation onSubmit={submitHandler} buttonText="Log in">
          <EmailFormGroup email={email} changeEmailHandler={changeEmailHandler} />
          <PasswordFormGroup
            password={password}
            changePasswordHandler={changePasswordHandler}
            showDescription={false}
          />
        </FormWithValidation>
      </FormWrapper>
    </ContainerCenter>
  );
}
