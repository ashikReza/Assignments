/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import React, { useState } from "react";

import BookSearch from "./BookSearch";
import BookSort from "./BookSort";

import star from "../assets/star.svg";
import booksData from "../booksData";

export default function Booklists() {
  const [results, setResults] = useState(booksData);
  const [sortOption, setSortOption] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleSearch = (searchTerm) => {
    const filteredBooks = booksData.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    setResults(filteredBooks);
  };

  const handleSort = (selectedSortOption) => {
    // Implement sorting logic based on selected sort option
    const sortedBooks = sortBooks(results, selectedSortOption);
    setResults(sortedBooks);
    setSortOption(selectedSortOption);
  };

  // Function to sort books based on the selected option
  const sortBooks = (books, sortOption) => {
    switch (sortOption) {
      case "name_asc":
        return books.slice().sort((a, b) => a.name.localeCompare(b.name));
      case "name_desc":
        return books.slice().sort((a, b) => b.name.localeCompare(a.name));
      case "year_asc":
        return books
          .slice()
          .sort((a, b) => a.publisher_year - b.publisher_year);
      case "year_desc":
        return books
          .slice()
          .sort((a, b) => b.publisher_year - a.publisher_year);
      default:
        return books;
    }
  };

  const handleToggleFavorite = (bookId) => {
    const updatedFavorites = favorites.includes(bookId)
      ? favorites.filter((id) => id !== bookId)
      : favorites.concat(bookId);
  
    setFavorites(updatedFavorites);
  };
  
  const isFavorite = (bookId) => favorites.includes(bookId);

  return (
    <main className="my-10 lg:my-14">
      {/* <!-- header --> */}
      <header className="mb-8 lg:mb-10 mx-auto max-w-7xl">
        <div className="mx-auto flex items-end justify-between max-md:max-w-[95%] max-md:flex-col max-md:items-start max-md:space-y-4">
          {/* <!-- info , title  --> */}
          <div>
            <h6 className="mb-2 text-base lg:text-xl">Trending on 2021</h6>
            <h2 className="mb-6 font-['Playfair_Display'] text-3xl font-bold lg:text-4xl">
              Trending Books of the Year
            </h2>
            <BookSearch onSearch={handleSearch} />
          </div>

          <BookSort onSort={handleSort} />
        </div>
      </header>

      {/* <!-- Book Grid --> */}
      <div className="container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6">
        {/* Book Item */}
        {results.map((book) => (
          <div key={book.id} className="space-y-3">
            <div className="flex items-center justify-center rounded-md border border-[#324251]/30 bg-white p-4">
              <img className="max-w-[144px]" src={book.img} alt={book.name} />
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-bold lg:text-xl">{book.name}</h4>
              <p className="text-xs lg:text-sm">
                By: <span>{book.author}</span>
              </p>
              <h3 className="">Published: {book.publisher_year}</h3>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold lg:text-xl">{book.price}</h4>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: book.rating }, (_, index) => (
                    <img key={index} src={star} alt="star" />
                  ))}

                  <span className="text-xs lg:text-sm">
                    ({book.rating} Star)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs lg:text-sm">
                <button className="flex min-w-[132px] items-center justify-center gap-1 rounded-md bg-[#1C4336] py-1.5 text-white transition-all hover:opacity-80 lg:py-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  Add to Cart
                </button>

                {/* Favourite button */}

                <button
                  onClick={() => handleToggleFavorite(book.id)}
                  className={`flex min-w-[132px] items-center justify-center gap-1 rounded-md ${isFavorite(book.id)
                    ? "bg-[#DC2954]/[14%] text-[#DC2954] hover:bg-[#DC2954]/[24%]"
                    : "bg-[#1C4336]/[14%] text-[#1C4336] hover:bg-[#1C4336]/[24%]"} py-1.5 transition-all lg:py-1.5`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  Favourite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
