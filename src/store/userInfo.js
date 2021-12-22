import { createSlice } from "@reduxjs/toolkit";
import { coder } from "../components/mixins/coder";
// import { useSelector } from "react-redux";
import { apiCallBegan } from "./api";

const user = createSlice({
  name: "user",
  initialState: {
    shortUserList: [],
    name: "",
    userShoppingLists: [],
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
      if (
        !!action.payload.userShoppingLists &&
        action.payload.userShoppingLists.length > 0
      )
        user.userShoppingListsId = action.payload.userShoppingLists;
      if (
        !!action.payload.userProductsList &&
        action.payload.userProductsList.length > 0
      )
        user.userProductsList = action.payload.userProductsList;
      if (
        !!action.payload.settings &&
        Object.keys(action.payload.settings).length > 0
      )
        user.settings = action.payload.settings;

      localStorage.setItem("nickName", JSON.stringify(action.payload.nickName));
    },
    setNewProductsList(user, action) {
      user.userProductsList = action.payload.userProductsList;
    },
    setShortUserList: (user, action) => {
      console.log(user.shortUserList, action.payload, "user");
      user.shortUserList = action.payload;
    },
  },
});

const { afterLogin, setShortUserList, setNewProductsList } = user.actions;

export const getShortUserList = () =>
  apiCallBegan({
    url: "shortLoginSystem",
    method: "get",
    onSuccess: setShortUserList.type,
  });

export const createAccount = (formData) =>
  apiCallBegan({
    url: "UsersData",
    method: "post",
    data: formData,
    onSuccess: afterLogin.type,
  });

export const loginUser = (id) =>
  apiCallBegan({
    url: `UsersData/${id}`,
    method: "get",
    onSuccess: afterLogin.type,
  });

export const createShortAccount = (formData) =>
  apiCallBegan({
    url: "shortLoginSystem",
    method: "post",
    data: formData,
  });

export const createList = (list) =>
  apiCallBegan({
    url: "usersLists",
    method: "post",
    data: list,
  });

export const changeProductList = (id, list) =>
  apiCallBegan({
    url: `UsersData/${id}`,
    method: "put",
    data: list,
    onSuccess: setNewProductsList.type,
  });

// export const isUserAlreadyHaveAccount  = this.props.shortUserList.filter((user) => {
//   if (user.nickName === "DADA!@22") {
//     return user;
//   }
// });

export const isUserAlreadyHaveAccount = (nickName, pinCode, userList) => {
  console.log(userList, "shortUserList");

  return userList
    ? userList.filter(
        (user) =>
          user.nickName === nickName && coder(user.pinCode, true) === pinCode
      )
    : [];
};
// export const getShortUserList = (formData) =>

export default user;
