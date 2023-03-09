import {
  USER_POST_FAILURE,
  USER_POST_REQUEST,
  USER_POST_SUCCESS,
} from "../constants/types";

export const UserPostAction = (val) => {
  return async (dispatch) => {
    dispatch({ type: USER_POST_REQUEST });
    try {
      const res = await fetch(
        `https://tugoserver.com/api/community-posts?id=${val?.id}&email=${val?.email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${val?.token}`,
          },
        }
      ).then((res) => res?.json());
      if (res) {
        dispatch({
          type: USER_POST_SUCCESS,
          payload: { postData: res },
          error: false,
        });
      } else {
        dispatch({
          type: USER_POST_FAILURE,
          payload: { error: true },
        });
      }
    } catch (error) {
      console.error("USER_POST_FAILURE", error);
      dispatch({ type: USER_POST_FAILURE, payload: { error: true } });
    }
  };
};
