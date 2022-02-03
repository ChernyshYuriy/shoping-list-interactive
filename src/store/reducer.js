import { combineReducers } from "redux";
import appConfigData from "./appConfigData";

import shoppingList from "./shoppingList";
import users from "./userInfo";

export default combineReducers({
  'appData': combineReducers({
    shoppingList: shoppingList.reducer,
    users: users.reducer
  }),
  'appConfig': appConfigData.reducer,
})
