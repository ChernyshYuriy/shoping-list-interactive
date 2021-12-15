import { createSlice } from "@reduxjs/toolkit";
import user from "./userInfo";

const appConfigData = createSlice({
  name: "appConfigData",
  initialState: {
    loading: {
      status: false,
      message: "Data_processing",
    },

    language: "en",
    popup: {
      visibility: true,
      header: {
        isVisible: false,
        Title: "Popup",
      },
    },
  },
  reducers: {
    changeLoadingStatus: (data, action) => {
      const { status = data.loading.status, message = "Data_processing" } = action.payload;
      data.loading = { status, message };
    },
    changePopupParameters: (data, action) => {
      for (const key in action.payload) {
        data.popup[key] = action.payload[key];
      }
    },
  },
});

export const {
  changeLoadingStatus: changeLoading,
  changePopupParameters: changePopup,
} = appConfigData.actions;

export default appConfigData;
