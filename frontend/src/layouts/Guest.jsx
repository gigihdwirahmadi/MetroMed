import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './../assets/css/guest.css'
const Guest = ({ children, title }) => {
  const navigate= useNavigate();
  if (localStorage.getItem("token")) {
    navigate("/dashboard");
  }
  return (
    <div className="wall row container-fluid">
      <div className="content col-md-4">
        <div className="">{children}</div>
      </div>
    </div>
  );
};
export default Guest;
