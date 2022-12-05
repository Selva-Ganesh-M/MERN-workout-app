import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    console.log("Signup:", email, password);
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
        <button>Signup</button>
        <div className="login-route">
          Already an existing user? wanna{" "}
          <Link to="/Login" className="link">
            Login?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
