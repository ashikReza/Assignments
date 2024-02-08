/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext } from "react";

const NewsContext = createContext();

export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <NewsContext.Provider
      value={{
        selectedCategory,
        handleCategorySelect,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
