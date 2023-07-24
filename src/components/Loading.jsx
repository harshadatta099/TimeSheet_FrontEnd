import React from "react";
import logo from "../assets/smbxllogo.svg"; 

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f2f2f2",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img src={logo} alt="Logo" style={{ width: "100px", height: "100px" }} />
        <div
          style={{
            marginTop: "20px",
            display: "inline-block",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            border: "4px solid #3f51b5",
            borderTopColor: "transparent",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
