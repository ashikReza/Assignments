/* eslint-disable react/prop-types */
import { useState } from "react";

import { AutoContext } from "../context/index.js";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AutoContext.Provider value={{ auth, setAuth }}>
      {children}
    </AutoContext.Provider>
  );
};

export default AuthProvider;
