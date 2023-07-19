import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const AuthGuard = ({ element }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  

  if (isLoggedIn) {
    // User is logged in, redirect to home page
    return <Navigate to="/home" />;
  }


  // User is not logged in, render the original element
  return element;
};

export default AuthGuard;
