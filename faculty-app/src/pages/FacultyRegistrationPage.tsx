import React from "react";
import FacultyRegistrationContainer from "../components/container/FacultyRegistrationContainer";
import { Navbar } from "../components/presentation/Navbar";

export default function FacultyRegistrationPage() {
  return (
    <>
      <Navbar />
      
      <div className="page-header">
        Faculty Registration
      </div>

      <FacultyRegistrationContainer />
    </>
  );
}
