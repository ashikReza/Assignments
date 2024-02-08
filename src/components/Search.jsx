/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useCallback } from "react";
import { RiSearchLine, RiCloseCircleLine } from "react-icons/ri";
import styles from "../styles/Search.module.css";
import { useNewsContext } from "../contexts/NewsContext.jsx";
import debounce from "lodash.debounce";

function Search() {
  const { searchQuery, setSearchQuery } = useNewsContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef(null);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  // Memoize the handleSearchChange function using useCallback
  const handleSearchChange = useCallback(
    debounce(() => {
      // Use the inputRef to access the input value
      setSearchQuery(inputRef.current.value);
    }, 300),
    []
  );

  // Function to clear the search query
  const clearSearchQuery = () => {
    setSearchQuery("");
    inputRef.current.value = "";
  };

  return (
    <div className={`${styles.inputBox} ${isOpen ? styles.open : ""} `}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
        onChange={handleSearchChange}
        defaultValue={searchQuery}
        ref={inputRef}
      />

      <span onClick={toggleSearch} className={styles.search}>
        <RiSearchLine className={styles.searchIcon} />
      </span>
      <span
        onClick={() => {
          clearSearchQuery();
        }}
        className={`${styles.closeIcon} ${isOpen ? styles.open : ""}`}
      >
        <RiCloseCircleLine className={styles.closeIcon} />
      </span>
    </div>
  );
}

export default Search;
