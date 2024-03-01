import { useRef } from "react";

import { useProfile } from "../../hooks/useProfile";
import { MdOutlineEdit } from "react-icons/md";

import { actions } from "../../actions/index.js";
import usetoken from "../../hooks/useToken.js";

import { useAuth } from "../../hooks/useAuth.js";

export default function ProfileImg() {
  const { state, dispatch } = useProfile();
  const { api } = usetoken();

  const { auth } = useAuth();

  const fileUploaderRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth?.authToken}`, // Include authorization header
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data.user,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.PROFILE_DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
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

        <form id="form" encType="multipart/form-data">
          <button
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
            onClick={handleImageUpload}
            type="submit"
          >
            <MdOutlineEdit color="white" />
          </button>
          <input id="file" type="file" ref={fileUploaderRef} hidden />
        </form>
      </div>
    </div>
  );
}
