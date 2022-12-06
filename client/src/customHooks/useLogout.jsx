import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";
import useWorkoutContext from "./useWorkoutContext";

const useLogout = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const navigate = useNavigate();
  const { auth, dispatchAuth } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatchAuth({ type: "logout" });
    dispatch({ type: "reset" });
    navigate("/login");
  };
  return logout;
};

export default useLogout;
