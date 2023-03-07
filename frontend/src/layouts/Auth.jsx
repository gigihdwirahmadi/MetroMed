import axios from "axios";
import './../assets/css/auth.css'
import { React,useState, useEffect,  } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap'
import AuthVerify from './../plugins'
const Layout = ({ children, title }) => {
  const [user, setUser] = useState([]);
  const [errorform,setError] = useState()
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
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://localhost:8000/api/user").then((response) => {
      //set response user to state
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
    if (!token && user.length == 0) {
      navigate("/");
    }
    fetchData();
  }, []);
  return (
    <div>
      <AuthVerify />
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class=" collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Feature</a>
              </li>
             
            </ul>
            <ul class="navbar-nav ms-auto">
              <li class="nav-item mx-5">
                <div class="btn btn-yellow " aria-current="page" href="#"  onClick={logoutHandler}>Logout</div>
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
