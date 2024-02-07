/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { RiSearchLine, RiCloseCircleLine } from "react-icons/ri";
import styles from "../styles/Search.module.css";
import { useNewsContext } from "../contexts/NewsContext.jsx";
import debounce from "lodash.debounce";

function Search() {
  const { searchQuery, setSearchQuery } = useNewsContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = debounce((event) => {
    setSearchQuery(event.target.value);
  }, 300);

  return (
    <div className={`${styles.inputBox} ${isOpen ? styles.open : ""} `}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
        onChange={handleSearchChange}
        value={searchQuery}
      />
      <span onClick={toggleSearch} className={styles.search}>
        <RiSearchLine className={styles.searchIcon} />
      </span>
      <span
        onClick={toggleSearch}
        className={`${styles.closeIcon} ${isOpen ? styles.open : ""}`}
      >
        <RiCloseCircleLine className={styles.closeIcon} />
      </span>
    </div>
  );
}

export default Search;
