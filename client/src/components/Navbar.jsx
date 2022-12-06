import React from "react";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import useLogout from "../customHooks/useLogout";
import useAuthContext from "../customHooks/useAuthContext";

const Navbar = () => {
  const { auth } = useAuthContext();
  const location = useLocation();
  const logout = useLogout();
  const handleSignout = async () => {
    logout();
  };
  return (
    <div className="navbar">
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/"
      >
        <h1 className="title">Workouts</h1>
      </Link>

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
            {location.pathname === "/signup" ? (
              <Link to="/login" className="login">
                <span>Login</span>
              </Link>
            ) : (
              <></>
            )}
            {location.pathname === "/login" ? (
              <Link to="/signup" className="signup">
                <span>Signup</span>
              </Link>
            ) : (
              <></>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
