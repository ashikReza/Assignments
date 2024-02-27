/* eslint-disable react/no-unknown-property */
import likeIcon from "../assets/icons/like.svg";
import heartIcon from "../assets/icons/heart.svg";
import commentIcon from "../assets/icons/comment.svg";

export default function FloatingActions() {
  return (
    <div class="floating-action">
      <ul class="floating-action-menus">
        <li>
          <img src={likeIcon} alt="like" />
          <span>10</span>
        </li>

        <li>
          {/* <!-- There is heart-filled.svg in the icons folder --> */}
          <img src={heartIcon} alt="Favourite" />
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>3</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
