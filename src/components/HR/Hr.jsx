import React from "react";
import { Routes, Route } from "react-router-dom";
import GetUserData from "./GetUserData";
import GetUsers from "./GetUsers";

const Hr = () => {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/get-data" element={<GetUserData />} />
        <Route path="get-users" element={<GetUsers />} />
      </Routes>
    </div>
  );
};

export default Hr;
