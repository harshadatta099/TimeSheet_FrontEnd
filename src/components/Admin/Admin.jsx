import React from "react";
import { Routes, Route } from "react-router-dom";
import GetAllData from "./GetAllData";
import GetAllUsers from "./GetAllUsers";

const Admin = () => {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<GetAllData />} />
        <Route path="get-all-users" element={<GetAllUsers />} />
      </Routes>
    </div>
  );
};

export default Admin;
