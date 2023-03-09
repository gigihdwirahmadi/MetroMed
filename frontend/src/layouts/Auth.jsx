import axios from "axios";
import './../assets/css/auth.css'
import { React, useState, useEffect, } from "react";
import {NavLink} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap'
import AuthVerify from './../plugins'
const Layout = ({ children, title }) => {
  const [user, setUser] = useState([]);
  const [errorform, setError] = useState()
  const token = localStorage.getItem("token");
  const [formStatus, setformStatus] = useState('');
  const [isShow, invokeModal] = useState(false)
  const navigate = useNavigate();

  const initModal = () => {
    if (isShow == false) {
      return invokeModal(true)
    }
    else {
      return invokeModal(false)
    }
  }
  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://localhost:8000/api/user").then((response) => {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    });
  };

  const logoutHandler = async () => {
    console.log("ada")
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
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
        <NavLink
                  to={`/dashboard`}
                  className="NavLink"
                >
          <a className="navbar-brand" href="#">Navbar</a>
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
                  <a className="nav-link" href="#">Our Status</a>
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
      <div className="container">

        <div className="">{children}</div>
      </div>

    </div>
  );
};
export default Layout;
