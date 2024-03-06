/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import ActionMenuModal from "./ActionMenuModal.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import useToken from "../../hooks/useToken.js";
import { useBlogs } from "../../hooks/useBlogs.js";
import { actions } from "../../actions/index.js";
import { toast } from "react-toastify";

export default function BlogsContent() {
  const [openBlogId, setOpenBlogId] = useState(null);
  const [hasMore, setHasMore] = useState(true); // Track if there are more blogs to load
  const sentinelRef = useRef(null);
  const [page, setPage] = useState(1); // Track the current page number

  const toggleModal = (blogId) => {
    setOpenBlogId(blogId === openBlogId ? null : blogId);
  };

  const { api } = useToken();
  const { auth } = useAuth();
  const { state, dispatch } = useBlogs();

  useEffect(() => {
    dispatch({ type: actions.blogs.FETCH_BLOGS_REQUEST });
    fetchBlogs(page); // Fetch the first page of blogs
  }, [api, dispatch]);

  const fetchBlogs = async (page) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=${page}&limit=10`
      );
      if (response.status === 200) {
        dispatch({
          type: actions.blogs.FETCH_BLOGS_SUCCESS,
          blogs: response.data.blogs,
          page: page, // Pass the current page to the reducer
        });
        // Check if there are more blogs to load
        setHasMore(response.data.blogs.length > 0);
        // Check if all blogs are loaded and show toast message
        if (!response.data.blogs.length) {
          toast.success("All blogs loaded");
        }
        // Increase the page number for the next fetch
        setPage(page + 1);
      }
    } catch (error) {
      dispatch({
        type: actions.blogs.FETCH_BLOGS_FAILURE,
        error: error.message,
      });
    }
  };

  const fetchMoreBlogs = () => {
    // Fetch the next page of blogs
    fetchBlogs(page);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const sentinel = entries[0];
        if (sentinel.isIntersecting && hasMore) {
          fetchMoreBlogs();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [hasMore, page]);

  // Define custom loader component
  const CustomLoader = () => {
    return (
      <div className="blog-card animate-pulse p-4 py-16 border border-gray-300 rounded-lg">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3 md:col-span-5">
      {state.blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <Link to={`/singleBlog/${blog.id}`}>
            <img
              className="blog-thumb"
              src={`${import.meta.env.VITE_SERVER_BLOG_URL}/${blog.thumbnail}`}
              alt=""
            />
          </Link>
          <div className="mt-2 relative">
            <Link to={`/singleBlog/${blog.id}`}>
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                {blog.title}
              </h3>

              <p className="mb-6 text-base text-slate-500 mt-1">
                {blog.content}
              </p>
            </Link>
            <div className="flex justify-between items-center">
              {auth.user.id === blog.author.id ? (
                <Link to={`/profile`}>
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
                        {blog.author.firstName} {blog.author.lastName}
                      </h5>
                      <div className="flex items-center text-xs text-slate-700">
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
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
                      {blog.author.firstName} {blog.author.lastName}
                    </h5>
                    <div className="flex items-center text-xs text-slate-700">
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              )}

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
                  {openBlogId === blog.id && (
                    <ActionMenuModal blogId={blog.id} />
                  )}
                </div>

                {/* <!-- action dot ends --> */}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
      <div ref={sentinelRef}></div>
      {hasMore && <CustomLoader />}
    </div>
  );
}
