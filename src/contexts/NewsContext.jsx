/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
// contexts/NewsContext.jsx
import React, { createContext, useState, useContext } from "react";

const NewsContext = createContext();

export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <NewsContext.Provider
      value={{
        selectedCategory,
        handleCategorySelect,
        searchQuery, // Include searchQuery in the context value
        setSearchQuery, // Include setSearchQuery in the context value
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
