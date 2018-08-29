import { combineReducers } from "redux";

import user from "./userReducer";
import cleaningListsReducer from "./cleaningListsReducer"

export const rootReducer = combineReducers({
  cleaningListsReducer,
  user
});
