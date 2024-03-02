import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Load from "../assets/load.gif";

import Comments from "../components/Comments";
import FloatingActions from "../components/FloatingActions";
import Footer from "../components/common/Footer";

import useToken from "../hooks/useToken.js";

export default function SingleBlog() {
  const { id } = useParams();
  const { api } = useToken();

  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await api.get(`http://localhost:3000/blogs/${id}`);
        if (response.status === 200) {
          const data = response.data;

          setBlogData(data);
          setLoading(false);
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch blog data");
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [api, id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center mt-28">
        <img src={Load} alt="Loading..." className=" size-60" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogData) {
    return <p>No data available for this blog</p>;
  }

  return (
    <>
      <section className="bg-[#030317] text-white px-4">
        <div className="w-full flex flex-col justify-center text-center py-8">
          <h1 className="font-bold text-3xl md:text-5xl">{blogData.title}</h1>
          <div className="flex justify-center items-center my-4 gap-4">
            <div className="flex items-center capitalize space-x-2">
              {blogData.author.avatar ? (
                <>
                  <div className="avater-img bg-indigo-600 text-white">
                    <img
                      src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${
                        blogData.author.avatar
                      }`}
                      alt=""
                      className=" rounded-full"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="avater-img bg-indigo-600 text-white">
                    <span className="">
                      {blogData.author.firstName[0].toUpperCase()}
                    </span>
                  </div>
                </>
              )}

              <h5 className="text-slate-500 text-sm">
                {blogData.author.firstName} {blogData.author.lastName}
              </h5>
            </div>
            <span className="text-sm text-slate-700 dot">
              {new Date(blogData.createdAt).toLocaleDateString()}
            </span>
            <span className="text-sm text-slate-700 dot">
              {blogData.likes.length} Likes
            </span>
          </div>
          <img
            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96 rounded"
            src={`${import.meta.env.VITE_SERVER_BLOG_URL}/${
              blogData.thumbnail
            }`}
            alt=""
          />

          {/* <!-- Tags --> */}
          {Array.isArray(blogData.tags) &&
            blogData.tags.map((tag, index) => <li key={index}>{tag}</li>)}

          {/* <!-- Content --> */}
          <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
            {blogData.content}
          </div>
        </div>
      </section>

      <FloatingActions />

      <Comments />

      <Footer />
    </>
  );
}
