/* eslint-disable no-unused-vars */

// App.jsx

import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import NewsBoard from "./components/NewsBoard.jsx";
import { NewsProvider } from "./contexts/NewsContext.jsx";

function App() {
  return (
    <>
      <NewsProvider>
        <Header />
        <NewsBoard />
      </NewsProvider>
      <Footer />
    </>
  );
}

export default App;
