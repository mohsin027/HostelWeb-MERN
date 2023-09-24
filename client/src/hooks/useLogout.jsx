// import { useAuthContext } from './useAuthContext'
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
