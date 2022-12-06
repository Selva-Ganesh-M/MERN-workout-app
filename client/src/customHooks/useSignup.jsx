import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const { dispatchAuth } = useAuthContext();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signup = async (email, password) => {
    setIsLoading(true);
    setSuccess("");
    setError("");
    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) {
      setSuccess("");
      setIsLoading(false);
      setError(json);
      setTimeout(() => setError(""), 1000);
      return;
    }

    // string token in local storeage
    localStorage.setItem("user", JSON.stringify(json));

    // setting the authcontext
    dispatchAuth({
      type: "login",
      payload: json,
    });
    setSuccess("Signup successful");
    setTimeout(() => {
      setSuccess("");
    }, 1000);

    setIsLoading(false);
  };
  return { signup, error, success, isLoading };
};

export default useSignup;
