// import { useContext } from "react";
// import { AutoContext } from "../context/index.js";

// export const useAuth = () => {
//   const { auth, setAuth } = useContext(AutoContext); // Destructure setAuth from context

//   return { auth, setAuth }; // Return setAuth along with auth
// };

// useAuth.js
import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context/index.js";

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  useDebugValue(auth, (auth) =>
    auth?.user ? "User Logged in" : "User not logged in"
  );

  // Logout function
  const logout = () => {
    setAuth(null); // Clear the authentication state
  };

  return { auth, setAuth, logout }; // Return the logout function
};
