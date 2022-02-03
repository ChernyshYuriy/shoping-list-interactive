import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const shoppingList = createSlice({
  name: "shoppingList",
  initialState: {
    activeShoppingList: [],
    activeListId: null,
    activeListTitle: "New shopping list",
    lastEdit: 0,
  },
  reducers: {
    setActiveListId: (data, action) => {
      data.activeListId = action.payload;
      console.log("setActiveListId is set");
    },
    setNewShoppingList: (data, action) => {
      // activeListTitle = action.payload)[0].title
      // lastEdit = action.payload)[0].lastEdit
      // console.log(action.payload, 'actionactionactionactionactionactionactionactionactionactionactionactionactionactionactionactionactionactionactionactionactionactionaction');
      // console.log(JSON.parse(action.payload), "action.payload");
      const { listProducts, lastEdit, title } = JSON.parse(action.payload)[0] || JSON.parse(action.payload);
      console.log(JSON.parse(action.payload)[0] || JSON.parse(action.payload), 'JSON.parse(action.payload)[0] || JSON.parse(action.payload)');
      data.activeShoppingList = listProducts;
      data.activeListTitle = title;
      data.lastEdit = lastEdit;
    },
  },
});

export const { setActiveListId, setNewShoppingList } = shoppingList.actions;

export const getShoppingList = (data) =>
  apiCallBegan({
    url: "userShoppingLists",
    method: "get",
    requestParams: data,
    onSuccess: setNewShoppingList.type,
  });

  export const editShoppingList = (data, id) =>
  apiCallBegan({
    url: "userShoppingLists",
    id,
    method: "put",
    data,
    onSuccess: setNewShoppingList.type,
  });

export default shoppingList;
