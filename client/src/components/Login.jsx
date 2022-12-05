import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="login-component">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Login</div>
        <div className="input-div">
          <label>Email </label>
          <input
            type="email"
            placeholder="enter your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label>Password </label>
          <input
            placeholder="enter your password here..."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
        <div className="signup-route">
          Not an existing user? wanna{" "}
          <Link to="/Signup" className="link">
            signup?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
