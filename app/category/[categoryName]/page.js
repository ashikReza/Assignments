"use client";

import { useState } from "react";

import { getProducts } from "@/lib/getProducts";
import Link from "next/link";
export default function CategoryPage({ params: { categoryName } }) {
  const products = getProducts();

  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || "All"
  );

  // Define categories and their handlers
  const categories = [
    { name: "All", handler: () => setSelectedCategory("All") },
    { name: "Smartphones", handler: () => setSelectedCategory("smartphones") },
    { name: "Laptops", handler: () => setSelectedCategory("laptops") },
    { name: "Fragrances", handler: () => setSelectedCategory("fragrances") },
    { name: "Skincare", handler: () => setSelectedCategory("skincare") },
    { name: "Groceries", handler: () => setSelectedCategory("groceries") },
  ];

  // Filter products based on the selected category
  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory
  );

  return (
    <section className="w-11/12 lg:w-10/12 max-w-7xl mx-auto py-0 lg:py-10 lg:flex justify-between items-start">
      <div className="w-full flex items-center justify-between lg:block lg:w-2/12 my-10 lg:my-0 lg:mt-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`hover:border-b border-black block h-6 box-border mt-${
              index === 0 ? "4" : "5"
            } ${
              selectedCategory.toLowerCase() === category.name.toLowerCase()
                ? "font-bold"
                : ""
            }`}
            onClick={category.handler}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="sticky top-0 right-0 w-full lg:w-10/12 grid grid-cols-2 gap-4 lg:grid-cols-3 my-4 lg:my-10">
        {filteredProducts.map((product, index) => (
          <div key={index}>
            <div
              className="relative delay-150 w-180px lg:w-[270px] h-[205px] lg:h-[310px] bg-[#f8f8f8] bg-cover bg-center transition-all duration-3000 ease-in-out transform"
              style={{ backgroundImage: `url(${product.thumbnail})` }}
            ></div>
            <h2 className="text-sm lg:text-base mt-2">
              <Link
                className="text-base font-bold"
                href={`/products/${product.id}`}
              >
                {product.title}
              </Link>
              <span className="text-[#919090]">
                <Link href={`/category/${product.category}`}>
                  ({product.category})
                </Link>
              </span>
            </h2>
            <p className="text-[#919090] text-sm ">{product.description}</p>

            {/* Calculate discounted price */}
            {product.discountPercentage && (
              <p className="text-rose-600 text-sm mt-4">
                <span className="text-rose-600 opacity-60 line-through">
                  ${product.price}
                </span>{" "}
                $
                {(
                  (product.price * (100 - product.discountPercentage)) /
                  100
                ).toFixed(2)}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
