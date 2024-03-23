"use client";
import Image from "next/image";

import useProducts from "@/lib/useProducts";

export default function productPage({ params: { id } }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { products } = useProducts();


  // Find the product that matches the provided id
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    // Handle case when product is not found
    return <h1>Product not found</h1>;
  }

  return (
    <section className="bg-[#fafaf2] h-full py-20">
      <div className="w-11/12 lg:w-8/12 max-w-7xl mx-auto flex flex-col gap-12 lg:flex-row items-center justify-between">
        <div className="w-full lg:w-7/12 border border-slate-500/20 p-4">
          <Image
            src={product.images[0]} // Assuming the first image is the main product image
            className="w-[400px] h-[500px] mx-auto object-cover"
            alt=""
            width={400}
            height={500}
          />

          <div className="flex gap-4 mt-4">
            {product.images.slice(1, 5).map((image, index) => (
              <Image
                key={index}
                src={image}
                className="w-[100px] h-[100px] mx-auto border object-cover"
                alt=""
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-5/12">
          <h1 className="italic text-xl lg:text-3xl font-serif font-semibold">
            {product.title}
          </h1>
          <span className="text-[#919090] my-3">{product.category}</span>
          <div className="mt-3 flex items-center justify-start gap-1">
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                src="/star.svg"
                width={20} // Changed from "20px" to 20
                height={20}
                alt=""
              />
            ))}
          </div>
          <hr className="my-5 bg-black" />

          <div>
            <p className="my-3">
              <span className="text-rose-600 opacity-60 line-through">
                ${product.price}
              </span>
              <span className="font-bold text-2xl">
                $
                {(
                  product.price *
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            </p>
          </div>
          <div>
            <p className="leading-7">{product.description}</p>

            <button className="w-full bg-[#1a1a1a] hover:bg-[#3a3a3a] text-center py-3 mt-5 text-white rounded-full">
              Add To Cart - $
              {(product.price * (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
