// hooks/useNewsQuery.js
import { useState, useEffect } from "react";

const useNewsQuery = (category = "", searchQuery = "") => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state

      try {
        // Fetch categories
        const categoryResponse = await fetch(
          `https://newsapi.org/v2/sources?apiKey=${
            import.meta.env.VITE_NEWS_API_KEY
          }`
        );
        const categoryData = await categoryResponse.json();
        // Extract category names from the API response
        const categoryNames = categoryData.sources.map(
          (source) => source.category
        );
        // Remove duplicate categories and filter out null values
        const uniqueCategories = [...new Set(categoryNames)].filter(
          (category) => category !== null
        );
        setCategories(uniqueCategories);

        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`;

        if (category) {
          url += `&category=${category}`;
        }
        if (searchQuery) {
          url += `&q=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, searchQuery]);

  return { news, loading, error, categories };
};

export default useNewsQuery;
