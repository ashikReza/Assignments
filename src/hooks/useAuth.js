import { useContext, useDebugValue } from "react";
import { AutoContext } from "../context/index.js";

export const useAuth = () => {
  const { auth } = useContext(AutoContext); // Change AuthContext to AutoContext

  useDebugValue(auth, (auth) =>
    auth?.user ? "User Logged in" : "User not logged in" 
  );

  return useContext(AutoContext); // Change AuthContext to AutoContext
};
