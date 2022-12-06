import { createContext, useEffect } from "react";
import React from "react";
import { useReducer } from "react";

export const AuthContext = createContext();
const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
      };
    case "logout":
      return {
        user: null,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(authReducer, initialState);
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("user"));
    if (res) {
      dispatchAuth({ type: "login", payload: res });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ auth, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
