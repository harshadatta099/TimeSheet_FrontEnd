import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import Signup from './pages/Signup';
// import { ProtectedRoute, ProtectedSignupRoute, AuthGuard }from './auth/auth';

import HomePage from './pages/HomePage';
const App = () => {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<AuthGuard element={<LoginPage />} />} />
    //     <Route path="/signup" element={<ProtectedSignupRoute element={<Signup />} />} />
    //     <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
    //   </Routes>
    // </BrowserRouter>
    <HomePage/>
  );
};

export default App;
