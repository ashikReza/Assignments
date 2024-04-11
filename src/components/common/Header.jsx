import logo from "../../assets/BlogioLogo.png";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import SearchModal from "../SearchModal.jsx";
import Logout from "../Logout.jsx";

import { useAuth } from "../../hooks/useAuth.js";
import usePortal from "../../hooks/usePortal.js";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();

  const { auth } = useAuth();
  const { showPortal, togglePortal } = usePortal();

  const user = auth?.user;

  const handleWriteButtonClick = () => {
    if (!user) {
      // User is not logged in, show toast message
      toast.error("Please login to create a blog.");
    } else {
      // User is logged in, navigate to createBlog page
      navigate("/createBlog");
    }
  };

  return (
    <header className="w-full bg-black">
      <nav className="container mx-auto bg-black flex flex-col md:flex-row items-center justify-between px-1 py-3 ">
        <div>
          <Link to="/">
            <img className="w-14" src={logo} alt="lws" />
          </Link>
        </div>
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <button
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-all duration-200"
                onClick={handleWriteButtonClick}
              >
                Write
              </button>
            </li>

            {!user && (
              <Link to="login">
                <li className=" font-semibold cursor-pointer">Login</li>
              </Link>
            )}

            {user && (
              <li>
                <button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={togglePortal}
                >
                  <FcSearch size={30} />
                  <span className=" text-white">Search</span>
                </button>
              </li>
            )}

            {user && (
              <li>
                <Link to="/login">
                  <Logout />
                </Link>
              </li>
            )}

            {user && (
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
                      {user?.firstName ? user?.firstName[0].toUpperCase() : ""}
                    </span>
                  )}
                </div>
                <Link to={`/profile/${auth?.user?.id}`}>
                  <span className="text-white ml-2">
                    {user?.firstName && user?.lastName
                      ? `${user?.firstName} ${user?.lastName}`
                      : ""}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {showPortal && <SearchModal onClose={togglePortal} />}
    </header>
  );
}
