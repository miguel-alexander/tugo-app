import {
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
} from "../constants/types";

const initialState = {
  error: null,
  loadUser: [],
};

export const loadUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        startStatusLoading: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loadUser: action?.payload?.loadUser,
        error: null,
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        error: action?.payload?.error,
      };
    default:
      return state;
  }
};
