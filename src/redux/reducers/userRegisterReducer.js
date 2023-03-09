import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/types";

const initialState = {
  error: null,
  userRegisterData: [],
};

export const userRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        startStatusLoading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userRegisterData: action?.payload?.userRegisterData,
        error: null,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        error: action?.payload?.error,
      };
    default:
      return state;
  }
};
