import { LOAD_REGISTRANT_FAILURE, LOAD_REGISTRANT_REQUEST, LOAD_REGISTRANT_SUCCESS } from "../constants/types";


const initialState = {
  error: null,
  registrantData: [],
};

export const loadRegistrantReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REGISTRANT_REQUEST:
      return {
        ...state,
        startStatusLoading: true,
      };
    case LOAD_REGISTRANT_SUCCESS:
      return {
        ...state,
        registrantData: action?.payload?.registrantData,
        error: null,
      };
    case LOAD_REGISTRANT_FAILURE:
      return {
        ...state,
        error: action?.payload?.error,
      };
    default:
      return state;
  }
};
