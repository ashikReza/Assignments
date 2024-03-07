/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState, useRef } from "react";

import { useAuth } from "../hooks/useAuth.js";
import { useBlogs } from "../hooks/useBlogs.js";
import { useProfile } from "../hooks/useProfile.js";
import useToken from "../hooks/useToken.js";
import { actions } from "../actions/index.js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CreateBlog() {
  const { auth } = useAuth();
  const { dispatch } = useBlogs();
  const { api } = useToken();
  const { state: profile } = useProfile();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageRequired, setImageRequired] = useState(false);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setImageUploaded(true);
    setImageRequired(false);
  };

  const handlePostSubmit = async (formData) => {
    dispatch({ type: actions.blogs.FETCH_BLOGS_REQUEST });

    if (!selectedImage) {
      setImageRequired(true);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("thumbnail", selectedImage);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("tags", formData.tags);

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        dispatch({
          type: actions.blogs.DATA_CREATED,
          data: response.data.blog,
        });

        toast.success("Blog created successfully");

        navigate(`/singleBlog/${response.data.blog.id}`);
      } else {
        dispatch({
          type: actions.blogs.FETCH_BLOGS_FAILURE,
          error: "Unexpected response status",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: actions.blogs.FETCH_BLOGS_FAILURE,
        error: error.message,
      });
    }
  };

  return (
    <motion.section
      className="h-full w-full flex justify-center absolute top-0 left-0 bg-slate-800/50 backdrop-blur-sm z-50 mt-32 sm:mt-24"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <div className="w-screen bg-black text-white rounded ">
        <form className="createBlog" onSubmit={handleSubmit(handlePostSubmit)}>
          <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
            <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
              <label htmlFor="imageInput">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </label>
              {imageUploaded ? (
                <p>Image Uploaded</p>
              ) : (
                <p onClick={handleImageUpload}>Upload Your Image</p>
              )}
              <input
                id="imageInput"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden" // Hide the file input
              />
            </div>
          </div>
          {imageRequired && (
            <span className="text-red-500">An image is required for the blog</span>
          )}
          {/* Step 3 */}
          <div className="mb-6">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter your blog title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Title is required for the blog</span>
            )}
          </div>

          <div className="mb-6">
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              {...register("tags", { required: true })}
            />
            {errors.tags && (
              <span className="text-red-500">Tags are required for the blog</span>
            )}
          </div>

          <div className="mb-6">
            <textarea
              {...register("content", { required: true })}
              id="content"
              name="content"
              placeholder="Write your blog content"
              rows="8"
            ></textarea>
            {errors.content && (
              <span className="text-red-500">Content is required for the blog</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Create Blog
          </button>
        </form>
      </div>
    </motion.section>
  );
}
