import { LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS } from "../constants/types";

  
  export const LoadUserAction = (val, response) => {
    return async (dispatch) => {
      dispatch({ type: LOAD_USER_REQUEST });
      try {
        const res = await fetch(
          `https://tugoserver.com/api/get-user?email=${val?.email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${val?.token}`,
            },
          }
        ).then((res) => res?.json());
        if (res) {
          dispatch({
            type: LOAD_USER_SUCCESS,
            payload: { loadUser: res },
            error: false,
          });
          response()

        } else {
          dispatch({
            type:LOAD_USER_FAILURE,
            payload: { error: true },
          });
          response()

        }
      } catch (error) {
        response()

        console.error("LOAD_USER_FAILURE", error);
        dispatch({ type: LOAD_USER_FAILURE, payload: { error: true } });
      }
    };
  };
  