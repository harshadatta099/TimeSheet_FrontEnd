import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return JSON.parse(localStorage.getItem('isLoggedIn'));
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
