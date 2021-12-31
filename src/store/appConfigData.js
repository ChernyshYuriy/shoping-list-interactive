import { createSlice } from "@reduxjs/toolkit";

const appConfigData = createSlice({
  name: "appConfigData",
  initialState: {
    loading: {
      status: false,
      message: "Data_processing",
    },

    language: "en",
    popup: {
      visibility: false,
      validationError: '',
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
    setValidationError: (data, action) => {
      data.popup.validationError = JSON.parse(action.payload).message || JSON.parse(action.payload).error
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
  setValidationError: validationError,
} = appConfigData.actions;

export default appConfigData;
