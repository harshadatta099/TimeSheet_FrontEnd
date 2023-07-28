import React from "react";
import { Routes, Route } from "react-router-dom";
import GetUserData from "./GetUserData";
import GetUsers from "./GetUsers";

const Hr = () => {
  return (
    <div className="container mt-4">
      <Routes>
        <Route exact path="data" element={<GetUserData />} />
        <Route exact path="users" element={<GetUsers />} />
      </Routes>
    </div>
  );
};

export default Hr;
