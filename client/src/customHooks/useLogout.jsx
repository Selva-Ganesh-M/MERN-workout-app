import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { auth, dispatchAuth } = useAuthContext();
  console.log("typeof", typeof auth);
  const logout = () => {
    localStorage.removeItem("user");
    dispatchAuth({ type: "logout" });
  };
  return logout;
};

export default useLogout;
