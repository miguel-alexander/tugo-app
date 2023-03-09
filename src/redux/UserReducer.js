import { removeUserSession } from "../utlitities/commons";
import { resetNavigationStack } from "../utlitities/commons";
import { ActionTypes } from "./ActionTypes";

const initialState = {
  session: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.setLogout: {
      resetNavigationStack(action.payload, "LogIn Page");
      removeUserSession();
      return { ...state, ...{ session: action.payload } };
    }
    case ActionTypes.setSession:
      return { ...state, ...{ session: action.payload } };
  }
  return state;
};
