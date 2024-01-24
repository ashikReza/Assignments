/* eslint-disable react-hooks/rules-of-hooks */

import { useTaskContext } from "../context/context";

import { toast } from "react-toastify";

export default function TaskAction() {
  const { state, dispatch } = useTaskContext();

  const { tasks } = state;

  const handleAddClick = () => {
    dispatch({ type: "SHOW_TASK_MODAL" });
  };

  const handleDeleteAllClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (isConfirmed) {
      dispatch({ type: "DELETE_ALL_TASKS" });

      toast.success("All tasks deleted successfully ");
      return;
    }
  };
  return (
    <>
      <button
        className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
        onClick={handleAddClick}
      >
        Add Task
      </button>
      <button
        className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
        onClick={handleDeleteAllClick}
        disabled={tasks.length === 0}
      >
        Delete All
      </button>
    </>
  );
}
