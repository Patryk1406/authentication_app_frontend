import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, IAuthContext } from './store/authContext';
import { Header } from './components/Header/Header';
import { Registration } from './views/Registration/Registration';
import { Login } from './views/Login/Login';
import { AdminaPanel } from './views/AdminPanel/AdminaPanel';

export function App() {
  const { token } = useContext(AuthContext) as IAuthContext;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/admin-panel" replace /> : <Navigate to="/login" replace />} />
        <Route path="/signup" element={token ? <Navigate to="/admin-panel" replace /> : <Registration />} />
        <Route path="/login" element={token ? <Navigate to="/admin-panel" replace /> : <Login />} />
        <Route path="/admin-panel" element={token ? <AdminaPanel /> : <Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
