import {
  USER_POST_FAILURE,
  USER_POST_REQUEST,
  USER_POST_SUCCESS,
} from "../constants/types";

const initialState = {
  error: null,
  postData: [],
};

export const userPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_POST_REQUEST:
      return {
        ...state,
        startStatusLoading: true,
      };
    case USER_POST_SUCCESS:
      return {
        ...state,
        postData: action?.payload?.postData,
        error: null,
      };
    case USER_POST_FAILURE:
      return {
        ...state,
        error: action?.payload?.error,
      };
    default:
      return state;
  }
};
