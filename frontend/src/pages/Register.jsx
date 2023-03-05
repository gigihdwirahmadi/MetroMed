import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './../assets/css/login.css';
const Register = () => {

  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [errorform, setError] = useState()
  const [phone_number, setPhone_number] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("phone_number", phone_number);
    formData.append("password_confirmation", password_confirmation);
    try {
      await axios
        .post("http://localhost:8000/api/register", formData)
        .then((response) => {
          axios.post("http://localhost:8000/api/login", formData)
            .then((response) => {
              localStorage.setItem(
                "token", response.data.access_token
              );
              navigate("/dashboard", { replace: true });
            });
          console.log(response)

        });
    } catch (error) {
      setError(error.response.data.errors);
    }
  };
  useEffect(() => {

    document.title = "Sign-Up";
  });

  return (
    <>
      <div className="wall-register">
        <div className="form-login">
          <div className="header-form">

            <div className="desc1">
              <span>Register</span>

            </div>
          </div>
          <p className="desc">Please fill this form..</p>
          <div className="body-form">
            <form onSubmit={Register}>
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
              <div className="form-input-wall">
                <input
                  className={`form-control ${errorform?.password_confirmation ? "is-invalid" : ""}`}
                  type="password"
                  name="password confirmation"
                  id="password confirmation"
                  value={password_confirmation}
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  placeholder="Enter Your confirmation Password"
                />
                {errorform?.password_confirmation &&
                  <span className='invalid-feedback'>{errorform.password_confirmation}</span>}
              </div>
              <div className="form-input-wall">
                <input
                  className={`form-control ${errorform?.name ? "is-invalid" : ""}`}
                  type="text"
                  name="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                />
                {errorform?.name &&
                  <span className='invalid-feedback'>{errorform.name}</span>}
              </div>
              <div className="form-input-wall">
                <input
                  className={`form-control ${errorform?.phone_number ? "is-invalid" : ""}`}
                  type="text"
                  name="text"
                  id="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                  placeholder="Enter Your Phone Number"
                />
                {errorform?.phone_number &&
                  <span className='invalid-feedback'>{errorform.phone_number}</span>}
              </div>

              <div className="button-form">
                <div className="register-button"></div>
                <div className="botttom-button">
                  <button class="btn btn-dark" type="submit">Sign up</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
