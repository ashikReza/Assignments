/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AutoContext } from "../context/index.js";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AutoContext.Provider value={{ auth, setAuth }}>
      {children}
    </AutoContext.Provider>
  );
};

export default AuthProvider;
