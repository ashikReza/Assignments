import { useState, useEffect } from "react";
import { useNewsContext } from "../contexts/NewsContext.jsx";

const useNewsQuery = () => {
  const { selectedCategory, searchQuery } = useNewsContext();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Define fetchData function to fetch news data
      setLoading(true);
      setError(null);

      try {
        // Try block to handle potential errors during data fetching
        let url;
        if (searchQuery) {
          // Check if there is a search query
          url = `${import.meta.env.VITE_REACT_APP_SEARCH_API_URL}?q=${encodeURIComponent(
            searchQuery
          )}`;
        } else {
          // If there is no search query
          url = `${import.meta.env.VITE_REACT_APP_TOP_HEADLINES_API_URL}`; // Set URL for fetching top headlines
          if (selectedCategory) {
            // Check if a category is selected
            url += `?category=${selectedCategory}`;
          }
        }

        const newsResponse = await fetch(url); // Fetch news data from the constructed URL
        const newsData = await newsResponse.json(); // Convert response to JSON format

        if (newsData.result) {
          setNews(newsData.result); // Update news state with result data
        } else {
          setNews(newsData.articles); // Update news state with articles data
        }
      } catch (err) {
        // Catch block to handle any errors during data fetching
        setError(err.message); // Update error state with error message
      }
      setLoading(false); // Set loading state to false once data fetching is complete
    };

    fetchData(); // Call fetchData function when there is a change in selectedCategory or searchQuery
  }, [selectedCategory, searchQuery]);
  return { news, loading, error }; // Return news data, loading state, and error state
};

export default useNewsQuery;
