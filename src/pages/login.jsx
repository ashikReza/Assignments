/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

import { useForm } from "react-hook-form";

import { FiEye, FiEyeOff } from "react-icons/fi";

import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import axios from "axios";
import { toast } from "react-toastify";
import LogoutTimeHeader from "../components/LogoutTimeHeader";

/* eslint-disable react/no-unknown-property */
export default function Login() {
  // initialize the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  // handle form submit
  const SubmitForm = async (fromdata, e) => {
    try {
      e.preventDefault();

      console.log(fromdata);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        fromdata
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.accessToken;
          const refreshToken = token.refreshToken;

          // console.log(`Login time auth: ${authToken}`);

          setAuth({ user, authToken, refreshToken });

          toast.success("Login successful.");
          navigate("/");

          reset();
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `User with email ${fromdata.email} is not found`,
      });

      toast.error(`User with email ${fromdata.email} is not found`);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <>
      <LogoutTimeHeader/>

      <div className="w-full h-screen bg-[#030317] flex flex-col justify-center ">
        <section className="container mx-auto bg-[#030317] flex justify-center ">
          {/* <!-- Login Form into a box center of the page --> */}
          <div className=" md:w-1/2 mx-auto bg-[#030317] text-white p-6 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={(e) => handleSubmit(SubmitForm)(e)}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email is invalid",
                    },
                  })}
                  className={`w-full p-3 bg-[#030317] border ${
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.password ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  />
                  {/* add a button element to the right of the input */}
                  <button
                    type="button"
                    className=" absolute right-0 top-0 bottom-0 w-12 flex justify-center items-center"
                    onClick={(e) => {
                      e.stopPropagation();
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
                <Link
                  to="/register"
                  className="text-indigo-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
