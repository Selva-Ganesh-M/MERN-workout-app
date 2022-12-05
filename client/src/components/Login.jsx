import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../customHooks/useLogin";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading, success } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    await login(email, password);
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
        <button disabled={isLoading}>Signup</button>
        {error && <div className="err-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
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
