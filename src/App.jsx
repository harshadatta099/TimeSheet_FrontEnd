import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import { ProtectedRoute, ProtectedSignupRoute, AuthGuard }from './auth/auth';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGuard element={<LoginPage />} />} />
        <Route path="/signup" element={<ProtectedSignupRoute element={<Signup />} />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
