import axios from "axios";
import './../assets/css/auth.css'
import { React, useState, useEffect, } from "react";
import {NavLink} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap'
import AuthVerify from './../plugins'
const Layout = ({ children, title }) => {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://localhost:8000/api/user").then((response) => {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    });
  };

  const logoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post("http://localhost:8000/api/logout").then(() => {
    });
    localStorage.removeItem("token");
    navigate("/")
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <AuthVerify />
      <nav className="navbar navbar-expand-lg bg-light fixed-top">
        <div className="container-fluid">
        <NavLink
                  to={`/dashboard`}
                  className="NavLink"
                >
          <span className="navbar-brand cursor-pointer" href="#">MetroMed</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to={`/mystatus`}
                  className="NavLink"
                >
                  <span className="nav-link cursor-pointer" href="#">Our Status</span>
                </NavLink>
              </li>

            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-5">
                <div className="btn btn-yellow " aria-current="page" href="#" onClick={logoutHandler}>Logout</div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container wall-auth">

        <div >{children}</div>
      </div>

    </div>
  );
};
export default Layout;
