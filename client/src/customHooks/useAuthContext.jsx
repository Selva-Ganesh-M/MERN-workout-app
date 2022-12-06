import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("Requesting context values outside its scope.");
  }
  return context;
};

export default useAuthContext;
