/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import Search from "./components/Search.jsx";
import { useNewsContext } from "./contexts/NewsContext.jsx";
import useNewsQuery from "./hooks/useNewsQuery";

const Header = () => {
  const [currentTime, setCurrentTime] = useState("");

  const [categoryLoading, setCategoryLoading] = useState(true);
  const { categories, loading, error } = useNewsQuery();

  const { handleCategorySelect, selectedCategory } = useNewsContext(); // Get selected category from context

  useEffect(() => {
    // Check if category data has been fetched
    if (!loading) {
      setCategoryLoading(false);
    }

    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(formatDate());
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [loading]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to format the current date
  const formatDate = () => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const currentDate = new Date();
    return currentDate.toLocaleDateString("en-US", options);
  };

  const toTitleCase = (text) => {
    const words = text.split(" ");
    // Map over each word and transform the first letter to upper case and the rest to lower case
    const titleCaseWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    return titleCaseWords.join(" ");
  };

  return (
    <nav className="border-b border-black py-6 md:py-8 px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <span>{currentTime}</span>
        </div>
        <a href="/">
          <img
            className="max-w-[100px] md:max-w-[165px] lg:absolute top-8 left-[50%] "
            src={logo}
            alt="Lws"
          />
        </a>
        <div className="w-full flex justify-center lg:flex-none lg:w-auto">
          <Search />
        </div>
      </div>
      <div className="container mx-auto mt-6">
        {categoryLoading ? (
          <div className="w-full flex justify-center">
            Loading categories...
          </div>
        ) : (
          <ul className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold lg:text-base">
            {categories.map((category, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => handleCategorySelect(category)}
                  className={`cursor-pointer ${
                    selectedCategory === category
                      ? "text-green-500"
                      : "text-black"
                  }`}
                >
                  {toTitleCase(category)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
