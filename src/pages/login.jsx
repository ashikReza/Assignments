/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

import { useForm } from "react-hook-form";

import { FiEye, FiEyeOff } from "react-icons/fi";

import Footer from "../components/Footer";
import { Link } from "react-router-dom";

/* eslint-disable react/no-unknown-property */
export default function Login() {
  // initialize the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Destructure the reset function from useForm
  } = useForm();

  // handle form submit
  const onSubmit = (data, e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // do something with the form data
    console.log(data);

    // Reset the form after successful submission
    reset();
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="w-full h-screen bg-[#030317]">
      <section className="container mx-auto bg-[#030317] flex justify-center ">
        {/* <!-- Login Form into a box center of the page --> */}
        <div className=" md:w-1/2 mx-auto bg-[#030317] text-white p-6 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                // register the input with React Hook Form and use the required and pattern rules
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email is invalid",
                  },
                })}
                className={`w-full p-3 bg-[#030317] border ${
                  // change the border color to red if there is an error
                  errors.email ? "border-red-500" : "border-white/20"
                } rounded-md focus:outline-none focus:border-indigo-500`}
              />
              {/* display the error message if any */}
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  // use the showPassword state variable to change the type prop
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  // register the input with React Hook Form and use the required and minLength rules
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className={`w-full p-3 bg-[#030317] border ${
                    // change the border color to red if there is an error
                    errors.password ? "border-red-500" : "border-white/20"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {/* add a button element to the right of the input */}
                <button
                  type="button" // Add type="button" to prevent default form submission behavior
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "3rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className=""
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from propagating to the form
                    togglePassword();
                  }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {/* display the error message if any */}
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
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
