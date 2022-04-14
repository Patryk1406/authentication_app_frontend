import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../Header/Header';
import { AdminaPanel } from '../../views/AdminPanel/AdminaPanel';
import { Registration } from '../../views/Registration/Registration';
import { Login } from '../../views/Login/Login';

export function App() {
  const [token, setToken] = useState<string>('');
  return (
    <>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<AdminaPanel setToken={setToken} token={token} />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </>

  );
}
