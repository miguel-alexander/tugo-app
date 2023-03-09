import {
  LOAD_POSTER_FAILURE,
  LOAD_POSTER_REQUEST,
  LOAD_POSTER_SUCCESS,
} from "../constants/types";

export const LoadPosterAction = (val, response) => {
  return async (dispatch) => {
    dispatch({ type: LOAD_POSTER_REQUEST });
    try {
      const res = await fetch(
        `https://tugoserver.com/api/get/users?id=${val.poster}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${val?.token}`,
          },
        }
      ).then((res) => res?.json());
      if (res) {
        dispatch({
          type: LOAD_POSTER_SUCCESS,
          payload: { loadPoster: res },
          error: false,
        });
        response();
      } else {
        dispatch({
          type: LOAD_POSTER_FAILURE,
          payload: { error: true },
        });
        response();
      }
    } catch (error) {
      response();
      console.error("LOAD_POSTER_FAILURE", error);
      dispatch({ type: LOAD_POSTER_FAILURE, payload: { error: true } });
    }
  };
};
