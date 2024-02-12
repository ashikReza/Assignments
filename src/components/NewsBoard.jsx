/* eslint-disable no-unused-vars */
import React from "react";
import useNewsQuery from "../hooks/useNewsQuery.js";
import { useNewsContext } from "../contexts/NewsContext.jsx";

import Load from "../assets/load.gif";

const NewsBoard = () => {
  const { searchQuery } = useNewsContext();
  const { news, loading } = useNewsQuery();
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center mt-28">
        <img src={Load} alt="Loading..." className=" size-60" />
      </div>
    );
  }

  if (!news || (news.length === 0 && searchQuery !== "")) {
    return (
      <div className="w-full h-screen flex justify-center mt-28 ">
        <h1>
          No results found for
          <span className="text-green-400">{" " + searchQuery}</span>
        </h1>
      </div>
    );
  }

  // Calculate the midpoint index of the news array
  const midpoint = Math.ceil(news.length / 2);

  // Split the news array into left and right
  const leftNews = news.slice(0, midpoint);
  const rightNews = news.slice(midpoint);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <main className="my-10 lg:my-14 mx-4 sm:mx-0">
      <div className="container mx-auto grid grid-cols-12 gap-8">
        {/* left */}
        <div className="col-span-12 grid grid-cols-12 gap-6 self-start xl:col-span-8">
          {/* news items */}
          {leftNews.map((article, index) => (
            <div
              key={index}
              className={`col-span-12 ${
                index === 0 ? "lg:col-span-12" : "lg:col-span-4 md:col-span-6"
              }`}
            >
              {/* news item */}
              <div
                className={`col-span-12 grid grid-cols-12 gap-4  ${
                  index === 0 ? "" : ""
                }`}
              >
                {/* thumb */}
                <div
                  className={`col-span-12 lg:col-span-8 ${
                    index === 0 ? "hidden" : "w-full flex justify-center "
                  }`}
                >
                  <img
                    className={`w-full ${index === 0 ? "hidden" : "w-full"}`}
                    src={article.urlToImage}
                    alt=""
                  />
                </div>
                {/* info */}
                <div
                  className={`col-span-12 lg:col-span-12  ${
                    index === 0 ? "col-span-12 lg:col-span-4" : ""
                  }`}
                >
                  <a href={article.url}>
                    <h3 className="mb-2.5 text-xl font-bold lg:text-2xl hover:text-green-400">
                      {article.title}
                    </h3>
                  </a>
                  <p className="text-base text-[#292219]">
                    {article.description}
                  </p>
                  <p className="mt-5 text-base text-[#94908C]">
                    Published: {formatDate(article.publishedAt)}
                  </p>
                </div>

                {/* thumb */}
                <div
                  className={`col-span-12 lg:col-span-8 ${
                    index === 0 ? "" : "hidden"
                  }`}
                >
                  <img className="w-full" src={article.urlToImage} alt="" />
                  <p className="mt-5 text-base text-[#94908C]">
                    Illustration: {article.author}
                  </p>
                </div>
              </div>
              {/* news item ends */}
            </div>
          ))}
        </div>
        {/* right */}
        <div className="col-span-12 self-start xl:col-span-4">
          <div className="space-y-6 divide-y-2 divide-[#D5D1C9]">
            {rightNews.map((article, index) => (
              <>
                <div key={index} className="col-span-12 mb-6 md:col-span-8">
                  {" "}
                  <hr className={` my-3 ${index === 0 ? "hidden" : ""}`} />
                  <img
                    className="w-full"
                    src={article.urlToImage}
                    alt="thumb"
                  />
                  <div className="col-span-12 mt-6 md:col-span-4">
                    <a href="#">
                      <h3 className="mb-2.5 text-xl font-bold lg:text-[20px] hover:text-green-400">
                        {article.title}
                      </h3>
                    </a>
                    <p className="text-base text-[#292219]">
                      {article.description}
                    </p>
                    <p className="mt-5 text-base text-[#94908C]">
                      Published: {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsBoard;
