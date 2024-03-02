import { actions } from "../actions";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.blogs.FETCH_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.blogs.FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.blogs,
        error: null,
      };
    case actions.blogs.FETCH_BLOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    // Handle other actions
    default:
      return state;
  }
};

export { initialState, blogsReducer };
