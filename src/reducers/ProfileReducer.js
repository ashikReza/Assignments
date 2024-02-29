import { actions } from "../actions";

const initialState = {
  user: null,
  blogs: [],
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.profile.PROFILE_DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action.user,
        blogs: action.blogs,
      };
    }

    case actions.profile.PROFILE_DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.profile.TOGGLE_BLOG_CONTENT_DISPLAY: {
      return {
        ...state,
        blogs: state.blogs.map(blog =>
          blog.id === action.blogId
            ? { ...blog, showFullContent: !blog.showFullContent }
            : blog
        )
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, profileReducer };
