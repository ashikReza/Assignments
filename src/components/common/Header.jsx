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
            {auth && auth.user ? (
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
                <li>
                  <Logout />
                </li>
                <li className="flex items-center">
                  <div className="avater-img bg-orange-600 text-white">
                    <span className="">
                      {auth.user.firstName && auth.user.firstName[0]}
                    </span>
                  </div>
                  <Link to="/profile">
                    <span className="text-white ml-2">
                      {auth.user.firstName && auth.user.lastName
                        ? `${auth.user.firstName} ${auth.user.lastName}`
                        : ""}
                    </span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Register
                  </Link>
                </li>
              </>
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
