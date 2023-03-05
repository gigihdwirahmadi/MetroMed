import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './../assets/css/login.css';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [remember, setRemember] = useState(0);
  const [errorform,setError] = useState()
  const navigate = useNavigate();

  const LoginForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    try {
      await axios
        .post("http://localhost:8000/api/login", formData)
        .then((response) => {
          localStorage.setItem(
            "token",
            response.data.access_token
          );
          navigate("/dashboard", { replace: true });
        });
    } catch (error) {
      setError(error.response.data.errors);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
    document.title = "Login";
  }, ["Login"]);

  return (
    <>
      <div className="wall-login">
        <div className="form-login">
          <div className="header-form">
           
            <div className="desc1">
              LOGIN
             
            </div>
          </div>
          <p className="desc">Please sign-in your account..</p>
          <div className="body-form">
            <form onSubmit={LoginForm}>
              <div className="form-input-wall">
             
                <input
                className={`form-control ${errorform?.email ? "is-invalid" : ""}`}
               
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
                {errorform?.email && 
  <span className='invalid-feedback'>{errorform.email}</span>}
              </div>
              <div className="form-input-wall">
                <input
              className={`form-control ${errorform?.password ? "is-invalid" : ""}`}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
                 {errorform?.password && 
  <span className='invalid-feedback'>{errorform.password}</span>}
              </div>
              
              <div className="button-form">
              <div className="register-button">dont have acoount? <a href="#">register</a></div>
              <div className="botttom-button">
                <button className="btn btn-dark" type="submit">Sign In</button>
                </div>
              </div>
             
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
