import { LOAD_POSTER_FAILURE, LOAD_POSTER_REQUEST, LOAD_POSTER_SUCCESS } from "../constants/types";


  
  const initialState = {
    error: null,
    loadPoster: [],
  };
  
  export const loadPosterReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_POSTER_REQUEST:
        return {
          ...state,
          startStatusLoading: true,
        };
      case LOAD_POSTER_SUCCESS:
        return {
          ...state,
          loadPoster: action?.payload?.loadPoster,
          error: null,
        };
      case LOAD_POSTER_FAILURE:
        return {
          ...state,
          error: action?.payload?.error,
        };
      default:
        return state;
    }
  };
  