import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
  setActiveKey: (newActiveKey: string) => void;
}

export function Registration({ setActiveKey }: Props) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  async function sendSignUpForm() {
    const res = await fetch('https://itransition-app.herokuapp.com/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      }),
    });
    const data = await res.json();
    if (!data.ok) {
      alert(data.message);
    } else {
      setActiveKey('login');
      navigate('/');
    }
  }

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendSignUpForm();
  };
  return (
    <div className="container vh-100 d-flex flex-wrap align-items-center justify-content-center">
      <p className="w-100 align-self-end text-center"><b>Enter your personal data to create an account</b></p>
      <Form className="align-self-start" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={emailChangeHandler} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={passwordChangeHandler} autoComplete="on" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" onChange={nameChangeHandler} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
