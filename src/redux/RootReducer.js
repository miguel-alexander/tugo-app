import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { ActionTypes } from "./ActionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { userPostReducer } from "./reducers/UserPosts";
import { loadUserReducer } from "./reducers/loadUserReducer";
import { loadPosterReducer } from "./reducers/loadPosterReducer";
import { userRegisterReducer } from "./reducers/userRegisterReducer";
import { loadRegistrantReducer } from "./reducers/loadRegistrantReducer";
import allReducers from "./reducers/AllReducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const AppReducers = combineReducers({
  userReducer: persistReducer(persistConfig, userReducer),
  userPostReducer: userPostReducer,
  loadUserReducer: loadUserReducer,
  loadPosterReducer: loadPosterReducer,
  userRegisterReducer: userRegisterReducer,
  loadRegistrantReducer: loadRegistrantReducer,
  allReducers: allReducers,
});

const RootReducer = (state, action) => {
  if (action.type === ActionTypes.setLogout) {
    return AppReducers(undefined, action);
  } else {
    return AppReducers(state, action);
  }
};

export default AppReducers;
