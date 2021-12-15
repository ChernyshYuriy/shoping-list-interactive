import { createSlice } from "@reduxjs/toolkit";

const productList = createSlice({
  name: "productList",
  initialState: {
    data: [],
  },
  reducers: {
    bugRequested: (data) => {
      console.log(2);
    },
  },
});

export default productList;
