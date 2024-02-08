/* eslint-disable no-unused-vars */

import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
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
