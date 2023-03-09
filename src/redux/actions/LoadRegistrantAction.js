import {
  LOAD_REGISTRANT_FAILURE,
  LOAD_REGISTRANT_REQUEST,
  LOAD_REGISTRANT_SUCCESS,
} from "../constants/types";

export const LoadRegistrantAction = (val, response) => {
  return async (dispatch) => {
    dispatch({ type: LOAD_REGISTRANT_REQUEST });
    try {
      const res = await fetch(
        `https://tugoserver.com/api/get-post-registrants?id=${val?.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${val?.token}`,
          },
        }
      ).then((res) => res?.json());
      if (res) {
        dispatch({
          type: LOAD_REGISTRANT_SUCCESS,
          payload: { registrantData: res },
          error: false,
        });
        response();
      } else {
        dispatch({
          type: LOAD_REGISTRANT_FAILURE,
          payload: { error: true },
        });
        response();
      }
    } catch (error) {
      response();

      console.error("LOAD_REGISTRANT_FAILURE", error);
      dispatch({ type: LOAD_REGISTRANT_FAILURE, payload: { error: true } });
    }
  };
};
