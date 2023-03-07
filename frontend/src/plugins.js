import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = () => {
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token) {
      const decodedJwt = parseJwt(token);
    console.log(decodedJwt.exp*1000, Date.now());
      if (decodedJwt.exp * 1000 < Date.now()) {
       
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.post("http://localhost:8000/api/logout").then(() => {
        });
        localStorage.removeItem("token");
       
        navigate("/")
      }
    }
    else if(!token && user.length == 0 ){
      navigate("/")
    }
  }, []);

  return ;
};

export default AuthVerify;