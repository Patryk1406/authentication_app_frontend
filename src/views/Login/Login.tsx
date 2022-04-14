import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Error } from '../../components/Error/Error';

interface Props {
  setToken: (newValue: string) => void
}

export function Login({ setToken }: Props) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  async function sendLgoInForm() {
    const res = await fetch('https://itransition-app.herokuapp.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.redirect) {
      setErrorMessage('We are sorry, but you are blocked:(;');
    } else if (data.message) {
      setErrorMessage(data.message);
    } else {
      setToken(data.token);
      navigate('/');
    }
  }

  return (
    <>
      { errorMessage && <Error message={errorMessage} />}
      <form onSubmit={async (e) => {
        e.preventDefault();
        await sendLgoInForm();
      }}
      >
        <label htmlFor="email">
          E-mail:
          <input type="email" id="email" minLength={1} maxLength={70} required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log in</button>
      </form>
    </>
  );
}
