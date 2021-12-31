import { createSlice } from "@reduxjs/toolkit";
import { coder } from "../components/mixins/coder";
// import { useSelector } from "react-redux";
import { apiCallBegan } from "./api";
import { apiLoginCallBegan } from "./apiLogin";
import { validationError } from "./appConfigData";

const user = createSlice({
  name: "user",
  initialState: {
    shortUserList: [],
    name: "",
    userShoppingLists: [],
    userProductsList: [],
    objectId: null,
    nickName: "",
    userEmail: "",
    settings: {},
  },
  reducers: {
    // bugRequested: (data) => {
    //   console.log(1);
    // },
    afterLogin: (user, action) => {
      const userData = JSON.parse(action.payload);
      console.log(
        action.payload,
        "action.payload action.payload action.payload action.payload action.payload"
      );
      // user = Object.assign(user, action.payload);
      // console.log(action.payload, "action.payload", user, "user");
      // const userData = JSON.parse(action.payload)
      user.objectId = userData.objectId;
      user.nickName = userData.username;
      user.email = userData.email;

      if (!!userData.userShoppingLists && userData.userShoppingLists.length > 0)
        user.userShoppingListsId = userData.userShoppingLists;
      if (!!userData.userProductsList && userData.userProductsList.length > 0)
        user.userProductsList = userData.userProductsList;
      if (!!userData.settings && Object.keys(userData.settings).length > 0)
        user.settings = userData.settings;
      localStorage.setItem("userInfo", JSON.stringify(userData));
    },
    logout: (user) => {
      user.objectId = null;
      user.nickName = "";
      user.email = "";

      user.userShoppingListsId = [];
      user.userProductsList = [];
      user.settings = {};
      localStorage.removeItem("userInfo");
    },

    setNewProductsList(user, action) {
      user.userProductsList = action.payload.userProductsList;
    },
    addProductToList(user, action) {
      console.log(action.payload, "action.payload");
      user.userProductsList = [...user.userProductsList, action.payload];
    },
    // setShortUserList: (user, action) => {
    //   console.log(user.shortUserList, action.payload, "user");
    //   user.shortUserList = action.payload;
    // },
  },
});

export const {
  afterLogin,
  // setShortUserList,
  setNewProductsList,
  addProductToList,
  logout
} = user.actions;

// export const getShortUserList = () =>
//   apiCallBegan({
//     url: "shortLoginSystem",
//     method: "get",
//     onSuccess: setShortUserList.type,
//   });

export const createAccount = (nickName, password, email) =>
  apiLoginCallBegan({
    method: "createAccount",
    nickName,
    password,
    email,
    onSuccess: afterLogin.type,
    onError: validationError,
  });

// export const loginUser = (id) =>
//   apiCallBegan({
//     url: `UsersData/${id}`,
//     method: "get",
//     onSuccess: afterLogin.type,
//   });

export const loginUser = (nickName, password) =>
  apiLoginCallBegan({
    // url: `UserData`,
    method: "loginUser",
    // data: loginData,
    nickName,
    password,
    // isLogin: true,
    onSuccess: afterLogin.type,
    onError: validationError,
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
  apiLoginCallBegan({
    method: "updateUser",
    userId: id,
    data: list,
    onSuccess: setNewProductsList.type,
  });

export const getUserData = (id) =>
  apiLoginCallBegan({
    method: "readingUser",
    userId: id,
    onSuccess: afterLogin.type,
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