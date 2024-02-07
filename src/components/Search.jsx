/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { RiSearchLine, RiCloseCircleLine } from "react-icons/ri";
import styles from "../styles/Search.module.css";

function Search() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.inputBox} ${isOpen ? styles.open : ""} `}>
      <input type="text" placeholder="Search..." className={styles.input} />
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
