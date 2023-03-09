import { ActionTypes } from "./ActionTypes";

export const setLogout = (payload) => ({
  type: ActionTypes.setLogout,
  payload: payload,
});

export const setSession = (payload) => ({
  type: ActionTypes.setSession,
  payload: payload,
});
