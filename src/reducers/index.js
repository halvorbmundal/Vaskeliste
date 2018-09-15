import { combineReducers } from 'redux';

import user from './userReducer';
import cleaningListsReducer from './cleaningListsReducer';
import commonReducer from './commonReducer';

export const rootReducer = combineReducers({
  cleaningListsReducer,
  commonReducer,
  user
});
