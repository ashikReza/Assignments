/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { HiDotsVertical } from "react-icons/hi";
import ActionMenuModal from "../../components/ActionMenuModal";

import { useAuth } from "../../hooks/useAuth.js";
import useToken from "../../hooks/useToken.js";

import { useBlogs } from "../../hooks/useBlogs.js";
import { actions } from "../../actions/index.js";

export default function BlogsContent() {
  const [openBlogId, setOpenBlogId] = useState(null);

  const toggleModal = (blogId) => {
    setOpenBlogId(blogId === openBlogId ? null : blogId);
  };

  const { api } = useToken();
  const { auth } = useAuth();

  const { state, dispatch } = useBlogs(); // Using useBlogs hook

  useEffect(() => {
    dispatch({ type: actions.blogs.FETCH_BLOGS_REQUEST }); // Dispatching action to fetch blogs
    const fetchBlogs = async () => {
      try {
        const response = await api.get(
          "http://localhost:3000/blogs?page=1&limit=5"
        );
        if (response.status === 200) {
          dispatch({
            type: actions.blogs.FETCH_BLOGS_SUCCESS,
            blogs: response.data.blogs,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.blogs.FETCH_BLOGS_FAILURE,
          error: error.message,
        });
      }
    };

    fetchBlogs();
  }, [api, dispatch]);

  if (state.loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <div className="space-y-3 md:col-span-5">
      {state.blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <img
            className="blog-thumb"
            src={`${import.meta.env.VITE_SERVER_BLOG_URL}/${blog.thumbnail}`}
            alt=""
          />
          <div className="mt-2 relative">
            <Link to={`/singleBlog/${blog.id}`}>
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                {blog.title}
              </h3>
            </Link>

            <p className="mb-6 text-base text-slate-500 mt-1">{blog.content}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center capitalize space-x-2">
                {blog.author.avatar ? (
                  <img
                    src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${
                      blog.author.avatar
                    }`}
                    alt=""
                    className="avater-img"
                  />
                ) : (
                  <div className="avater-img bg-blue-600 text-white">
                    {blog.author.firstName
                      ? blog.author.firstName[0].toUpperCase()
                      : " "}
                  </div>
                )}

                <div>
                  <h5 className="text-slate-500 text-sm">
                    <Link to={`/author/${blog.author.id}`}>
                      {blog.author.firstName} {blog.author.lastName}
                    </Link>
                  </h5>
                  <div className="flex items-center text-xs text-slate-700">
                    <span>{/* date formatting */}</span>
                  </div>
                </div>
              </div>

              <div className="text-sm px-2 py-1 text-slate-700">
                <span>{blog.likes.length} Likes</span>
              </div>
            </div>

            {auth.user.id === blog.author.id ? (
              <>
                {/* <!-- action dot --> */}
                <div className="absolute right-0 top-0">
                  <button onClick={() => toggleModal(blog.id)}>
                    <HiDotsVertical color="white" />
                  </button>

                  {/* <!-- Action Menus Popup --> */}
                  {openBlogId === blog.id && <ActionMenuModal />}
                </div>

                {/* <!-- action dot ends --> */}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
