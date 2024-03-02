import { useState } from "react";
import logo from "../../assets/logo.svg";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import CreateBlogModal from "../CreateBlogModal.jsx";
import SearchModal from "../SearchModal.jsx";
import Logout from "../Logout.jsx";

import { useAuth } from "../../hooks/useAuth.js";

export default function Header() {
  const [showCreateBlogModal, setShowCreateBlogModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const { auth } = useAuth();

  const user = auth?.user;

  const toggleCreateBlogModal = () => {
    setShowCreateBlogModal(!showCreateBlogModal);
  };

  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  return (
    <header className="w-full bg-black">
      <nav className="container mx-auto bg-black flex flex-col md:flex-row items-center justify-between px-1 py-5 ">
        <div>
          <Link to="/">
            <img className="w-32" src={logo} alt="lws" />
          </Link>
        </div>
        <div>
          <ul className="flex items-center space-x-5">
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
            <li>
              <Logout />
            </li>
            <li className="flex items-center">
              <div className=" ">
                {user.avatar ? (
                  <img
                    className="avater-img"
                    src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${
                      user.avatar
                    }`}
                    alt=""
                  />
                ) : (
                  <span className="avater-img bg-orange-600 text-white">
                    {user?.firstName ? user?.firstName[0] : ""}
                  </span>
                )}
              </div>
              <Link to="/profile">
                <span className="text-white ml-2">
                  {user?.firstName && user?.lastName
                    ? `${user?.firstName} ${user?.lastName}`
                    : ""}
                </span>
              </Link>
            </li>
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
