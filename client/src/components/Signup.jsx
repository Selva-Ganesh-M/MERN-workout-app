import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../customHooks/useAuthContext";
import useSignup from "../customHooks/useSignup";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useAuthContext();
  const { signup, error, isLoading, success } = useSignup();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.user) {
      await signup(email, password);
      navigate("/");
    }
  };
  return (
    <div className="signup-component">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Sign Up</div>
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
        <div className="login-route">
          Already an existing user? want to{" "}
          <Link to="/login" className="link">
            Login?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
