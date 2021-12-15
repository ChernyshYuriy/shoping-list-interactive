import { createSelector, createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";
import { apiCallBegan } from "./api";
import { changeLoading } from "./appConfigData";

const user = createSlice({
  name: "user",
  initialState: {
    shortUserList: [],
    name: "",
    userShoppingListsId: [],
    userProductsList: [],
    objectId: null,
    nickName: "",
    settings: {},
  },
  reducers: {
    // bugRequested: (data) => {
    //   console.log(1);
    // },
    afterLogin: (user, action) => {
      // user = Object.assign(user, action.payload);
      console.log(action.payload, "action.payload", user, "user");
      user.objectId = action.payload.objectId;
      user.nickName = action.payload.nickName;
      if (!!action.payload.userShoppingListsId && action.payload.userShoppingListsId.length > 0) user.userShoppingListsId = action.payload.userShoppingListsId
      if (!!action.payload.userProductsList && action.payload.userProductsList.length > 0) user.userProductsList = action.payload.userProductsList
      if (!!action.payload.settings && Object.keys(action.payload.settings).length > 0) user.settings = action.payload.settings

      localStorage.setItem('nickName', JSON.stringify(action.payload.nickName))
    },
    setShortUserList: (user, action) => {
      console.log(user.shortUserList, action.payload, "user");
      user.shortUserList = action.payload;
    }
  },
});


const { afterLogin, setShortUserList } = user.actions;

export const getShortUserList = () =>
  apiCallBegan({
    url: "shortLoginSystem",
    method: "get",
    onSuccess: setShortUserList.type,
    // onStart: changeLoading.type,
    // onFinish: changeLoading.type,
  });

export const createAccount = (formData) =>
  apiCallBegan({
    url: "UsersData",
    method: "post",
    data: formData,
    onSuccess: afterLogin.type,
    // onStart: changeLoading.type,
    // onFinish: changeLoading.type,
  });

export const loginUser = (id) =>
  apiCallBegan({
    url: `UsersData/${id}`,
    method: "get",
    onSuccess: afterLogin.type,
    // onStart: changeLoading.type,
    // onFinish: changeLoading.type,
  });

export const createShortAccount = (formData) =>
  apiCallBegan({
    url: "shortLoginSystem",
    method: "post",
    data: formData,
    // onStart: changeLoading.type,
    // onFinish: changeLoading.type,
  });

  // export const isUserAlreadyHaveAccount  = this.props.shortUserList.filter((user) => {
  //   if (user.nickName === "DADA!@22") {
  //     return user;
  //   }
  // });


  export const isUserAlreadyHaveAccount = (nickName, userList) => {
    console.log(userList, 'shortUserList');
    return userList.filter(user => user.nickName === nickName);
  }
// export const getShortUserList = (formData) =>

export default user;
