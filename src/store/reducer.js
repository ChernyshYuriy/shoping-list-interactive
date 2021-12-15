import { combineReducers } from "redux";
import appConfigData from "./appConfigData";

import productList from "./productLists";
import users from "./userInfo";

export default combineReducers({
  'appData': combineReducers({
    productList: productList.reducer,
    users: users.reducer
  }),
  'appConfig': appConfigData.reducer,
})
