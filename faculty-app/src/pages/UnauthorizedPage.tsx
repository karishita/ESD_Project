import React from "react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff5f5",
        color: "#b91c1c",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
         Access Denied
      </h1>
      <p style={{ marginBottom: "20px" }}>
        You are not authorized to access the faculty registration page.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#b91c1c",
          color: "white",
          cursor: "pointer",
        }}
      >
        Go Back to Login
      </button>
    </div>
  );
}
