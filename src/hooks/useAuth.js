// import { useContext } from "react";
// import { AutoContext } from "../context/index.js";

// export const useAuth = () => {
//   const { auth, setAuth } = useContext(AutoContext); // Destructure setAuth from context

//   return { auth, setAuth }; // Return setAuth along with auth
// };

import { useContext, useDebugValue } from "react";
import { AutoContext } from "../context/index.js";

export const useAuth = () => {
  const { auth, setAuth } = useContext(AutoContext);

  useDebugValue(auth, (auth) =>
    auth?.user ? "User Logged in" : "User not logged in"
  );

  return { auth, setAuth };
};
