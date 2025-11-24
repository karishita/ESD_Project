
import React from "react";

export default function LoginPage() {
  const handleLogin = () => {
    // backend entry point for Google OAuth
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  // return (
  //   <div style={{ padding: 24 }}>
  //     <h1>Faculty Portal</h1>
  //     <p>Sign in with Google to continue</p>
  //     <button onClick={handleLogin}>Sign in with Google</button>
  //   </div>
  // );

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "380px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "12px", color: "#333" }}>Faculty Portal</h2>
        <p style={{ marginBottom: "24px", color: "#555", fontSize: "14px" }}>
          Sign in with Google to continue
        </p>

        <button
          onClick={handleLogin}
          style={{
            background: "#4285F4",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            width: "100%",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: "0 4px 12px rgba(66, 133, 244, 0.4)",
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
