import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

export default function ActionMenusModal() {
  return (
    <div className="action-modal-container popup-animation">
      <button className="action-menu-item hover:text-lwsGreen">
        <MdOutlineEdit />
        Edit
      </button>
      <button className="action-menu-item hover:text-red-500">
        <RiDeleteBinLine />
        Delete
      </button>
    </div>
  );
}
