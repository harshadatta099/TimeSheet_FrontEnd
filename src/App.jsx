import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import { ProtectedRoute, ProtectedSignupRoute, AuthGuard } from "./auth/auth";
import Admin from './components/Admin/Admin';
import Hr from "./components/HR/Hr"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGuard element={<LoginPage />} />} />
        <Route
          path="/signup"
          element={<ProtectedSignupRoute element={<Signup />} />}
        />
        <Route
          path="/home"
          element={<ProtectedRoute element={<HomePage />} />}
        />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/hr/*" element={<Hr />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
