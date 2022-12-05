import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="title">Workouts</h1>
      <nav className="nav">
        <Link to="/login" className="login">
          <span>Login</span>
        </Link>
        <Link to="/signup" className="signup">
          <span>Signup</span>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
