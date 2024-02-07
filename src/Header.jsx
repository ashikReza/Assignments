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

  const { handleCategorySelect } = useNewsContext();

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

  return (
    <nav className="border-b border-black py-6 md:py-8 px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0.5C12.1421 0.499999 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.499999 3.85786 3.85786 0.5 8 0.5Z"
              stroke="#00D991"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 15.4286L8 0.571507"
              stroke="#00D991"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.4995 14.9999C10.4995 14.9999 12.5715 12.6429 12.5715 8.00008C12.5715 3.35722 10.4995 0.999939 10.4995 0.999939"
              stroke="#00D991"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.50049 1.00006C5.50049 1.00006 3.4285 3.35706 3.4285 7.99992C3.4285 12.6428 5.50049 15.0001 5.50049 15.0001"
              stroke="#00D991"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.4282 8L0.499512 8"
              stroke="#00D991"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.5 5C1.5 5 3.5 5 8 5C12.5 5 14.5 5 14.5 5"
              stroke="#00D991"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.5 11C1.5 11 3.5 11 8 11C12.5 11 14.5 11 14.5 11"
              stroke="#00D991"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{currentTime}</span>
        </div>
        <a href="/">
          <img
            className="max-w-[100px] md:max-w-[165px]"
            src={logo}
            alt="Lws"
          />
        </a>
        <div className="w-full flex justify-center sm:flex-none sm:w-auto">
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
                  onClick={() => handleCategorySelect(category.toLowerCase())}
                >
                  {category}
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
