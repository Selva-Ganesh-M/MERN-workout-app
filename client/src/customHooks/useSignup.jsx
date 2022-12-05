import React from "react";
import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const { auth, dispatchAuth } = useAuthContext();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signup = async (email, password) => {
    setIsLoading(true);
    setSuccess("");
    setError("");
    const res = await fetch("http://localhost:4000/api/user/signup", {
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
    console.log("added to local storeage");

    // setting the authcontext
    dispatchAuth({
      type: "signup",
      payload: json,
    });
    setSuccess("Signup successful");
    setTimeout(() => {
      setSuccess("");
    }, 1000);
    console.log("authDispatch done");

    setIsLoading(false);
  };
  return { signup, error, success, isLoading };
};

export default useSignup;
