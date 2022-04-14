import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Error } from '../../components/Error/Error';

export function Registration() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const navigate = useNavigate();

  async function sendSignUpForm() {
    const res = await fetch('https://itransition-app.herokuapp.com/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!data.ok) {
      setErrorMessage(data.message);
    } else navigate('/login');
  }

  return (
    <>
      { errorMessage && <Error message={errorMessage} />}
      <form onSubmit={async (e) => {
        e.preventDefault();
        await sendSignUpForm();
      }}
      >
        <label htmlFor="name">
          Name:
          <input type="text" id="name" minLength={1} maxLength={50} required value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label htmlFor="e-mail">
          E-mail:
          <input type="email" id="e-mail" minLength={1} maxLength={70} required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}
