/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { IoIosCloseCircleOutline } from "react-icons/io";

export default function CreateBlog({ onClose }) {
  return (
    <>
      <section className="h-screen flex justify-center fixed top-0 left-0 w-full bg-slate-800/50 backdrop-blur-sm z-50 ">
        <div className="container bg-black text-white rounded m-4 sm:top-32">
          {/* <!-- Form Input field for creating Blog Post --> */}
          <form action="#" method="POST" className="createBlog">
            <button
              className="fixed top-6 sm:top-10 right-6 sm:right-36 cursor-pointer"
              onClick={onClose}
            >
              <IoIosCloseCircleOutline className="size-10" />
            </button>

            <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
              <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
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
                <p>Upload Your Image</p>
              </div>
            </div>
            <div className="mb-6">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter your blog title"
              />
            </div>

            <div className="mb-6">
              <input
                type="text"
                id="tags"
                name="tags"
                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              />
            </div>

            <div className="mb-6">
              <textarea
                id="content"
                name="content"
                placeholder="Write your blog content"
                rows="8"
              ></textarea>
            </div>

            <a
              href="./createBlog.html"
              className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Create Blog
            </a>
          </form>
        </div>
      </section>
    </>
  );
}
