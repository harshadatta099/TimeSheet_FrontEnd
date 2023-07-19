import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import ProtectedRoute from './auth/ProtectedRoute';
import AuthGuard from './auth/AuthGuard';

function ProtectedSignupRoute({ element }) {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  return isLoggedIn ? <Navigate to="/home" /> : element;
}

const  App = ()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGuard element={<LoginPage />} />} />
        <Route path="/signup" element={<ProtectedSignupRoute element={<Signup />} />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
