import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/types";

export const UserRegisterAction = (val, response) => {
  return async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const res = await fetch(`https://tugoserver.com/api/posts/${val?.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${val?.token}`,
        },
      }).then((res) => res?.json());
      if (res) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: { userRegisterData: res },
          error: false,
        });
        response();
      } else {
        dispatch({
          type: USER_REGISTER_FAILURE,
          payload: { error: true },
        });
        response();
      }
    } catch (error) {
      response();
      console.error("USER_REGISTER_FAILURE", error);
      dispatch({ type: USER_REGISTER_FAILURE, payload: { error: true } });
    }
  };
};
