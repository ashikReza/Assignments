/* eslint-disable react/no-unescaped-entities */

import Footer from "../components/Footer";
import { Link } from "react-router-dom";

/* eslint-disable react/no-unknown-property */
export default function Login() {
  return (
    <div className="w-full h-screen bg-[#030317]">
      <section className="container mx-auto bg-[#030317] flex justify-center ">
        {/* <!-- Login Form into a box center of the page --> */}
        <div className=" md:w-1/2 mx-auto bg-[#030317] text-white p-6 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form action="">
            <div className="mb-6">
              <label for="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label for="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Login
              </button>
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
