import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
  setToken: (newValue: string) => void
}

export function Login({ setToken }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  async function sendLgoInForm() {
    const res = await fetch('https://itransition-app.herokuapp.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}
        ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      }),
    });
    const data = await res.json();
    if (data.redirect) {
      alert('We are sorry, but you are blocked:(');
    } else if (data.message) {
      alert(data.message);
    } else {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate('/admin');
    }
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendLgoInForm();
  };

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="container vh-100 d-flex flex-wrap align-items-center justify-content-center">
      <h1 className="w-100 align-self-end text-center">Welcome on our page!</h1>
      <Form className="align-self-start" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={emailChangeHandler} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={passwordChangeHandler} autoComplete="on" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
