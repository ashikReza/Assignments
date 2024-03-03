/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useAuth } from "../../hooks/useAuth.js";

import { useState } from "react";
import useToken from "../../hooks/useToken.js";// Import Axios

export default function Comments({ blogData }) {
  // Extract comments from blogData
  const { comments } = blogData;

  const { auth } = useAuth();
  const { api } = useToken();

  const myAvatar = auth.user.avatar;

  const [commentContent, setCommentContent] = useState(""); 
  const [commentsState, setComments] = useState(comments); 

  const handleAddComment = async () => {
    try {
      const response = await api.post(
        `http://localhost:3000/blogs/${blogData.id}/comment`,
        {
          content: commentContent, // Pass the content of the new comment in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`, 
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the response contains the updated comments array
      // Update the comments state with the new array of comments
      setComments(response.data.comments);

      // Clear the comment input after adding the comment
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <section id="comments" className="bg-[#030317] text-white py-1">
      <div className="mx-auto w-full md:w-10/12 container px-4">
        <h2 className="text-3xl font-bold my-8">Comments {comments.length}</h2>
        <div className="flex items -center space-x-4">
          {myAvatar ? (
            <img
              className="avater-img"
              src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${myAvatar}`}
              alt=""
            />
          ) : (
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">S</span>
            </div>
          )}

          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)} // Update the comment content state
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                onClick={handleAddComment} // Call the handleAddComment function when the button is clicked
              >
                Comment
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Comment --> */}
        {commentsState.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4 my-8 ">
            {comment.author.avatar ? (
              <img
                className="avater-img"
                src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${
                  comment.author.avatar
                }`}
                alt=""
              />
            ) : (
              <div className="avater-img bg-orange-600 text-white">
                <span>{comment.author.firstName.charAt(0)}</span>
              </div>
            )}

            <div className="w-full">
              <h5 className="text-slate-500 font-bold">{`${comment.author.firstName} ${comment.author.lastName}`}</h5>
              <p className="text-slate-300">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
