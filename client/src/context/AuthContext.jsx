import { createContext } from "react";
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
      console.log("logout case executed");
      return {
        user: null,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(authReducer, initialState);
  console.log("initial auth.user", auth.user);
  return (
    <AuthContext.Provider value={{ auth, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
