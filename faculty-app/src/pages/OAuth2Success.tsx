
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OAuth2Success() {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");

    if (token) {
      // store token (localStorage)
      localStorage.setItem("accessToken", token);
      // navigate to registration page (remove token from URL)
      navigate("/registration", { replace: true });
    } else {
      // no token -> go back to login
      navigate("/", { replace: true });
    }
  }, [search, navigate]);

  return <div>Signing you in…</div>;
}
