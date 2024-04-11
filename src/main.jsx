import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./styles/index.css";

import AuthProvider from "./providers/AuthProvider.jsx";
import { SingleBlogProvider } from "./context/SingleBlogContext.jsx";
import BlogsProvider from "./providers/BlogsProvider.jsx";
import ProfileProvider from "./providers/ProfileProvider.jsx";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <BlogsProvider>
          <ProfileProvider>
            <SingleBlogProvider>
              <App />
            </SingleBlogProvider>
          </ProfileProvider>
        </BlogsProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
