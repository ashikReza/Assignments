/* eslint-disable no-unused-vars */

import React from "react";

import Header from "./components/common/Header.jsx";

import Home from "./pages/home.jsx";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Profile from "./pages/profile.jsx";
import SingleBlog from "./pages/single-blog.jsx";

import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./routes/PrivateRoutes.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
          <Route element={<Profile />} path="/profile" />
          <Route element={<SingleBlog />} path="/singleBlog" />
        </Route>
        
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </>
  );
}

export default App;
