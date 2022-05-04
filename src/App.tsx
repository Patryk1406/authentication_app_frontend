import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, IAuthContext } from './store/authContext';
import { Header } from './components/Header/Header';
import { Registration } from './views/Registration/Registration';

export function App() {
  const { token } = useContext(AuthContext) as IAuthContext;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/admin" replace /> : <Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </>
  );
}
