// // This custom hook fetches news articles based on selected categories and search queries,
// // providing loading states, error handling, and a list of available categories.

// import { useState, useEffect } from "react";
// import { useNewsContext } from "../contexts/NewsContext.jsx";

// const useNewsQuery = () => {
//   const { selectedCategory, searchQuery } = useNewsContext();

//   // State variables for news data, loading status, error message, and available categories
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);

//   // Effect to fetch news data based on selected category and search query
//   useEffect(() => {
//     // Async function to fetch news data
//     const fetchData = async () => {
//       setLoading(true); // Set loading state to true while fetching data
//       setError(null); // Reset error state on each fetch

//       try {
//         // Fetching categories from the news API
//         const categoryResponse = await fetch(
//           `https://newsapi.org/v2/sources?apiKey=${
//             import.meta.env.VITE_NEWS_API_KEY
//           }`
//         );
//         const categoryData = await categoryResponse.json();

//         // Extracting category names from the API response and removing duplicates
//         const categoryNames = categoryData.sources.map(
//           (source) => source.category
//         );
//         const uniqueCategories = [...new Set(categoryNames)].filter(
//           (category) => category !== null
//         );
//         setCategories(uniqueCategories);

//         // Constructing URL for fetching news articles based on selected category and search query
//         let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
//           import.meta.env.VITE_NEWS_API_KEY
//         }`;
//         if (selectedCategory) {
//           url += `&category=${selectedCategory}`;
//         }
//         if (searchQuery) {
//           url += `&q=${encodeURIComponent(searchQuery)}`;
//         }

//         // Fetching news articles from the constructed URL
//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error("Failed to fetch news"); // Handling fetch errors
//         }

//         const data = await response.json(); // Parsing response data
//         setNews(data.articles); // Updating news state with fetched articles
//       } catch (error) {
//         setError(error.message); // Updating error state with error message
//       } finally {
//         setLoading(false); // Setting loading state to false after fetch completes
//       }
//     };

//     fetchData(); // Calling fetchData function when selected category or search query changes
//   }, [selectedCategory, searchQuery]);

//   // Returning news data, loading state, error message, and available categories
//   return { news, loading, error, categories };
// };

// export default useNewsQuery;

// =================================

// useNewsQuery.js
import { useState, useEffect } from "react";
import { useNewsContext } from "../contexts/NewsContext.jsx";

const useNewsQuery = () => {
  const { selectedCategory, searchQuery } = useNewsContext();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let url;
        if (searchQuery) {
          url = `http://localhost:8000/v2/search?q=${searchQuery}`;
        } else {
          url = `http://localhost:8000/v2/top-headlines`;
          if (selectedCategory) {
            url += `?category=${selectedCategory}`;
          }
        }

        const newsResponse = await fetch(url);
        const newsData = await newsResponse.json();

        setNews(newsData.articles);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedCategory, searchQuery]);

  return { news, loading, error };
};

export default useNewsQuery;

