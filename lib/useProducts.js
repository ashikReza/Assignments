"use client";

import { useState } from "react";
import productsData from "../utils/products.json";

const useProducts = (initialLimit = null) => {
  const [limit, setLimit] = useState(initialLimit);

  const updateLimit = (newLimit) => {
    setLimit(newLimit);
  };

  const getProducts = () => {
    if (limit === null) {
      return productsData.products; // Return all products if limit is null
    } else {
      return productsData.products.slice(0, limit); // Otherwise, slice products based on limit
    }
  };

  return {
    products: getProducts(),
    updateLimit,
  };
};

export default useProducts;
