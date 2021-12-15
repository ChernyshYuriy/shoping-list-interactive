import { combineReducers } from "redux";
import appConfigData from "./appConfigData";

import productList from "./productLists";
import users from "./userInfo";

// import bugsReducer from './bugs'
// import projectReducer from './project'
// import users from "./user";





export default combineReducers({
  appConfigData: appConfigData.reducer,
  productList: productList.reducer,
  users: users.reducer
})
