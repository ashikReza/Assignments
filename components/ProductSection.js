/* eslint-disable react/no-unescaped-entities */
import useProducts from "@/lib/useProducts";
import ProductCard from "./ProductCard";

export default function ProductSection() {
  const { products } = useProducts(12);

  console.log(products);

  return (
    <main>
      {/* <!-- Product section start --> */}
      <section className="w-11/12 lg:w-10/12 max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 my-4 lg:my-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      {/* <!-- Product section start --> */}
      <section className="bg-[#ced3ca] py-5 lg:py-16">
        <div className="w-10/12 lg:w-4/12 mx-auto">
          <h1 className="italic text-xl lg:text-3xl font-serif my-5 text-center">
            Get the inside scoop
          </h1>
          <p className="text-center text-sm lg:text-base">
            Sign up for new product drops, behind-the-scenes content, and
            monthly "5 Things I'm Digging" emails
          </p>
          <form action="#" className="mb-5">
            <input
              type="text"
              className="p-3 mt-10 border border-black focus:outline-none w-full"
              placeholder="Enter your email"
            />
            <button className="w-full bg-[#1a1a1a] hover:bg-[#3a3a3a] text-center py-2 mt-2 text-white">
              See what we're doing
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
