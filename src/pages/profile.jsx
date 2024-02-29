import { useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useProfile } from "../hooks/useProfile.js";
import { actions } from "../actions";

import useToken from "../hooks/useToken";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { state, dispatch } = useProfile();

  const { api } = useToken();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const profileResponse = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        dispatch({
          type: actions.profile.PROFILE_DATA_FETCHED,
          user: profileResponse?.data,
          blogs: profileResponse?.data?.blogs,
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.PROFILE_DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, [api, auth?.user?.id, dispatch]);

  // Function to toggle blog content display
  const toggleContentDisplay = (blogId) => {
    dispatch({
      type: actions.profile.TOGGLE_BLOG_CONTENT_DISPLAY,
      blogId: blogId,
    });
  };

  return (
    <div className="bg-black w-full py-10">
      <div className="container mx-auto ">
        {/* <!-- profile info --> */}
        <div className="flex flex-col items-center py-8 px-4 text-center">
          {/* <!-- profile image --> */}
          <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
              {state.user?.avatar ? (
                <img
                  src={`${import.meta.env.VITE_SERVER_AVATAR_URL}/${
                    state.user.avatar
                  }`}
                  className="rounded-full"
                />
              ) : (
                <div className="w-full h-full text-white bg-orange-600 flex items-center justify-center rounded-full">
                  <span className="text-5xl">
                    {state.user?.firstName ? state.user.firstName[0] : ""}
                  </span>
                </div>
              )}
              <button className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
                <MdOutlineEdit color="white" />
              </button>
            </div>

            <button className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
              <MdOutlineEdit color="white" />
            </button>
          </div>
          {/* <!-- name , email --> */}
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {state.user?.firstName} {state.user?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg text-white">
              {state.user?.email}
            </p>
          </div>

          {/* <!-- bio --> */}
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
                {state.user?.bio}
              </p>
            </div>
            {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
            <button className="flex-center h-7 w-7 rounded-full">
              <MdOutlineEdit color="white" />
            </button>
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        {/* <!-- end profile info --> */}

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        <div className="my-6 space-y-4">
          {/* <!-- Blog Card Start --> */}
          {state.blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <img
                className="blog-thumb"
                src={`${import.meta.env.VITE_SERVER_BLOG_URL}/${
                  blog.thumbnail
                }`}
                alt=""
              />
              <div className="mt-2">
                <h3 className="text-slate-300 text-xl lg:text-2xl">
                  {blog.title}
                </h3>
                {/* Conditional rendering for content */}
                {blog.showFullContent ? (
                  <p className="mb-6 text-base text-slate-500 mt-1">
                    {blog.content}
                  </p>
                ) : (
                  <p
                    className="mb-6 text-base text-slate-500 mt-1"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {blog.content}
                  </p>
                )}
                {/* Read more button */}
                <button
                  className="text-slate-400 hover:text-slate-200 relative bottom-5"
                  onClick={() => toggleContentDisplay(blog.id)}
                >
                  {blog.showFullContent ? "Read Less" : "Read More"}
                </button>

                {/* <!-- Meta Informations --> */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center capitalize space-x-2">
                    <div className="">
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
                    </div>
                    <div>
                      <h5 className="text-slate-500 text-sm">{`${blog.author.firstName} ${blog.author.lastName}`}</h5>
                      <div className="flex items-center text-xs text-slate-700">
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm px-2 py-1 text-slate-700">
                    <span>{blog.likes.length} Likes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* <!-- Blog Card End --> */}
        </div>
      </div>
    </div>
  );
}
