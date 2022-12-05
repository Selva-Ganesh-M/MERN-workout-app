import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import useLogout from "../customHooks/useLogout";
import useAuthContext from "../customHooks/useAuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const { auth, dispatchAuth } = useAuthContext();
  const logout = useLogout();
  const handleSignout = async () => {
    logout();
  };
  return (
    <div className="navbar">
      <h1 className="title">Workouts</h1>

      <nav className="nav">
        {auth.user ? (
          <div className="sec-2">
            <div className="email-id">
              <i className="fa fa-user"></i>
              {auth.user.email}
            </div>
            <button onClick={handleSignout} className="btn">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="sec-1">
            <Link to="/login" className="login">
              <span>Login</span>
            </Link>
            <Link to="/signup" className="signup">
              <span>Signup</span>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
