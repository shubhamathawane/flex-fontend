import { createContext, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_START } from "./UserSlice";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(LOGIN_START(user));
    }
  }),
    [dispatch];

  return <Context.Provider value={user}>{children}</Context.Provider>;
};
