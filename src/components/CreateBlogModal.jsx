/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState, useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";
import { useBlogs } from "../hooks/useBlogs.js";
import { useProfile } from "../hooks/useProfile";
import useToken from "../hooks/useToken.js";
import { actions } from "../actions/index.js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateBlog({ onClose }) {
  const { auth } = useAuth();
  const { dispatch } = useBlogs();
  const { api } = useToken();
  const { state: profile } = useProfile();

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

  const handleModalClick = (e) => {
    if (e.target.classList.contains("Modal")) {
      onClose();
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setImageUploaded(true);
  };

  const handlePostSubmit = async (formData) => {
    dispatch({ type: actions.blogs.FETCH_BLOGS_REQUEST });

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

        onClose();
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
    <section
      className="h-screen flex justify-center fixed top-0 left-0 w-full bg-slate-800/50 backdrop-blur-sm z-50 Modal"
      onClick={handleModalClick}
    >
      <div className="container bg-black text-white rounded m-4 sm:top-32 popup-animation">
        <form className="createBlog" onSubmit={handleSubmit(handlePostSubmit)}>
          <button
            className="fixed top-6 sm:top-10 right-6 sm:right-36 cursor-pointer"
            onClick={onClose}
          >
            <IoIosCloseCircleOutline className="size-10" />
          </button>

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
          <div className="mb-6">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter your blog title"
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
          </div>

          <div className="mb-6">
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              {...register("tags", { required: true })}
            />
            {errors.tags && <span>This field is required</span>}
          </div>

          <div className="mb-6">
            <textarea
              {...register("content", { required: true })}
              id="content"
              name="content"
              placeholder="Write your blog content"
              rows="8"
            ></textarea>
            {errors.content && <span>This field is required</span>}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Create Blog
          </button>
        </form>
      </div>
    </section>
  );
}
