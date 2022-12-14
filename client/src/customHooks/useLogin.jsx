import useAuthContext from "./useAuthContext";
import { useState } from "react";

const useLogin = () => {
  const { dispatchAuth } = useAuthContext();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = async (email, password) => {
    setIsLoading(true);
    setSuccess("");
    setError("");
    const res = await fetch("/api/user/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
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
    localStorage.setItem("user", JSON.stringify(json));
    setSuccess("Login successful");
    setTimeout(() => {
      setSuccess("");
      dispatchAuth({ type: "login", payload: json });
    }, 500);

    setIsLoading(false);
  };
  return { login, error, success, isLoading };
};

export default useLogin;
