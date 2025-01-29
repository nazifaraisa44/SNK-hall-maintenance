import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    }).then(response => {
        if(response.data.status) {
          const role = response.data.role;
          if (role === "admin") {
            navigate("/adminhome", { state: { isAuthenticated: true } }); // Redirect to admin home
          }
          else if (role === "provost") {
            navigate("/adminhomeprovost", { state: { isAuthenticated: true } }); // Redirect to admin home
          }
          
          else {
            navigate("/adminhomeprovost", { state: { isAuthenticated: true } }); // Redirect to user home
          }
        }
    }).catch(err => {
        console.log(err);
    });
  };
  return (
    
    <div className='body'>
    <div className="wrapper">
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className="input-box">
            <input type="email" placeholder="Email"   onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-box">
            <input type="password" placeholder="password"   onChange={(e) => setPassword(e.target.value)}/>
            <i className='bx bxs-lock-alt' ></i>
            </div>
  
            <div className="remember-forgot">
                <label><input type="checkbox" />Remember Me</label>
                <Link to="/forgotPassword">Forgot Password?</Link>
                
            </div>
            <button type="submit" className="btn" id="loginButton">Login</button>
            <div className="register-link">
                <p>Don't Have an Account?<Link to="/signup"> Register</Link></p>
            </div>
        </form>
    </div>
    </div>
  );
};

export default Login;
