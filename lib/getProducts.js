import productsData from "../utils/products.json";

// Utility function to get products with an optional limit
export const getProducts = (limit = null) => {
  return limit === null
    ? productsData.products
    : productsData.products.slice(0, limit);
};
