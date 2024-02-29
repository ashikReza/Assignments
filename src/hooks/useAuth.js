import { useContext, useDebugValue } from "react";
import { AutoContext } from "../context/index.js";

export const useAuth = () => {
  const { auth } = useContext(AutoContext); 

  useDebugValue(auth, (auth) =>
    auth?.user ? "User Logged in" : "User not logged in" 
  );

  return useContext(AutoContext); 
};
