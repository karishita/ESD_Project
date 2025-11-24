import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OAuth2Success from "./pages/OAuth2Success";
import FacultyRegistrationPage from "./pages/FacultyRegistrationPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/oauth2/success" element={<OAuth2Success />} />

      {/* Redirected from backend when unauthorized */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    
      {/* Protected Route */}
      <Route
        path="/registration"
        element={
          <ProtectedRoute>
            <FacultyRegistrationPage />
          </ProtectedRoute>
        }
      />
      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

