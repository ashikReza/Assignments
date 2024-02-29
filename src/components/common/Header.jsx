import { useState } from "react";
import logo from "../../assets/logo.svg";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import CreateBlogModal from "../CreateBlogModal.jsx";
import SearchModal from "../SearchModal.jsx";

import { useAuth } from "../../hooks/useAuth.js";

import Logout from "../Logout.jsx";

export default function Header() {
  const [showCreateBlogModal, setShowCreateBlogModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const { auth } = useAuth();

  const toggleCreateBlogModal = () => {
    setShowCreateBlogModal(!showCreateBlogModal);
  };

  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  return (
    <header className="w-full bg-black">
      <nav className="container mx-auto bg-black flex flex-col md:flex-row items-center justify-between px-1 py-5 ">
        {/* <!-- Logo --> */}
        <div className="">
          <Link to="/">
            <img className="w-32" src={logo} alt="lws" />
          </Link>
        </div>

        {/* <!-- Actions - Login, Write, Home, Search --> */}
        {/* <!-- Notes for Developers --> */}
        {/* <!-- For Logged in User - Write, Profile, Logout Menu --> */}
        {/* <!-- For Not Logged in User - Login Menu --> */}
        <div>
          <ul className="flex items-center space-x-5">
            {auth.user && (
              <>
                <li>
                  <button
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    onClick={toggleCreateBlogModal}
                  >
                    Write
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={toggleSearchModal}
                  >
                    <FcSearch size={30} />
                    <span className=" text-white">Search</span>
                  </button>
                </li>
              </>
            )}

            <li>
              {auth.user ? (
                <>
                  <Logout />{" "}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Login
                  </Link>
                </>
              )}
            </li>

            {auth.user ? (
              <li className="flex items-center">
                {/* <!-- Circular Div with background color --> */}
                <div className="avater-img bg-orange-600 text-white">
                  <span className="">S</span>
                  {/* <!-- User's first name initial --> */}
                </div>

                {/* <!-- Logged-in user's name --> */}
                <Link to="/profile">
                  <span className="text-white ml-2">
                    {auth?.user?.firstName + " " + auth?.user?.lastName}
                  </span>
                </Link>
                {/* <!-- Profile Image --> */}
              </li>
            ) : (
              <li>
                <Link
                  to="/register"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {showCreateBlogModal && (
        <CreateBlogModal onClose={toggleCreateBlogModal} />
      )}
      {showSearchModal && <SearchModal onClose={toggleSearchModal} />}
    </header>
  );
}
