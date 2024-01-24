/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */

import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext();

const initialState = {
  tasks: [],
  showAddModal: false,
  taskToUpdate: null,
  searchQuery: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        showAddModal: false,
        taskToUpdate: null,
      };
      case "UPDATE_TASK":
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id
              ? {
                  ...task,
                  title: action.payload.title,
                  description: action.payload.description,
                  priority: action.payload.priority,
                  tags: action.payload.tags, 
                }
              : task
          ),
          showAddModal: false,
          taskToUpdate: null,
        };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "DELETE_ALL_TASKS":
      return {
        ...state,
        tasks: [],
      };
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isFavorited: !task.isFavorited }
            : task
        ),
      };
    case "SHOW_TASK_MODAL":
      return {
        ...state,
        showAddModal: true,
        taskToUpdate: action.payload || null,
      };
    case "CLOSE_TASK_MODAL":
      return {
        ...state,
        showAddModal: false,
        taskToUpdate: null,
      };
    case "SET_SEARCH_TASK":
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => useContext(TaskContext);
