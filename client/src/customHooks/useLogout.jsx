import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { auth, dispatchAuth } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatchAuth("logout");
    console.log(auth);
  };
  return logout;
};

export default useLogout;
