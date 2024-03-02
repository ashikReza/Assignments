/* eslint-disable react/no-unknown-property */
// import likeIcon from "../assets/icons/like.svg";
// import heartIcon from "../assets/icons/heart.svg";
// import commentIcon from "../assets/icons/comment.svg";

import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

import { FaRegMessage } from "react-icons/fa6";

export default function FloatingActions() {
  return (
    <div class="floating-action">
      <ul class="floating-action-menus">
        <li>
          <AiOutlineLike size={20} color="white" />
          <AiFillLike size={20} color="white" />
          <span className="text-white">10</span>
        </li>

        <li>
          {/* <!-- There is heart-filled.svg in the icons folder --> */}
          <FaRegHeart size={20} color="white" />
          <FaHeart size={20} color="red" />
        </li>
        <a href="#comments">
          <li>
            <FaRegMessage size={20} color="white" />

            <span className="text-white">3</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
