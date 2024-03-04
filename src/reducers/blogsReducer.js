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
    case actions.blogs.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.data],
      };
    }

    case actions.blogs.POST_DELETED: {
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((item) => item.id !== action.data), // Changed from posts to blogs
      };
    }

    case actions.blogs.DATA_EDITED: {
      if (!action.data || !action.data.id) {
        return state;
      }

      return {
        ...state,
        loading: false,
        blogs: state.blogs.map((blog) =>
          blog.id === action.data.id ? action.data : blog
        ),
      };
    }

    default:
      return state;
  }
};

export { initialState, blogsReducer };
