import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import useLogout from "../customHooks/useLogout";

const Navbar = () => {
  const logout = useLogout();
  const handleSignout = async () => {
    logout();
  };
  return (
    <div className="navbar">
      <h1 className="title">Workouts</h1>

      <nav className="nav">
        <div className="sec-1">
          <Link to="/login" className="login">
            <span>Login</span>
          </Link>
          <Link to="/signup" className="signup">
            <span>Signup</span>
          </Link>
        </div>
        <div className="sec-2">
          <button onClick={handleSignout} className="btn">
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
