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
          url = `http://localhost:8000/v2/search?q=${encodeURIComponent(
            searchQuery
          )}`;
        } else {
          url = "http://localhost:8000/v2/top-headlines";
          if (selectedCategory) {
            url += `?category=${selectedCategory}`;
          }
        }

        const newsResponse = await fetch(url);
        const newsData = await newsResponse.json();

        if (newsData.result) {
          setNews(newsData.result);
        } else {
          setNews(newsData.articles); 
        }
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
