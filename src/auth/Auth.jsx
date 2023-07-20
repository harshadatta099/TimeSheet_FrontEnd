import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return JSON.parse(localStorage.getItem('isLoggedIn'));
};

export const ProtectedRoute = ({ element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return element;
};

export const ProtectedSignupRoute = ({ element }) => {
  if (isAuthenticated()) {
    return <Navigate to="/home" />;
  }

  return element;
};

export const AuthGuard = ({ element }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  return isLoggedIn ? <Navigate to="/home" /> : element;
};
