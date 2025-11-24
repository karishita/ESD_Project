import React from "react";
import {useNavigate} from "react-router-dom"
export const Navbar: React.FC = () => {
  const navigate=useNavigate();
  const handleLogout=()=>
  {
    localStorage.removeItem("accessToken");
    navigate("/",{replace:true});
  }
  return (
    <div className="navbar">
      <div className="navbar-title">My College Portal</div>

      <div className="navbar-links">
        <a href="#">Registration</a>
        <a href="#">Courses</a>
       <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
