import { createSlice } from "@reduxjs/toolkit";

const appConfigData = createSlice({
  name: "appConfigData",
  initialState: {
    loading: {
      status: false,
      message: "Data_processing",
    },
    requestsInProcess: 0,
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
    changeRequestCounter: (data, action) => {
      console.log(data.requestsInProcess, 'data.requestsInProcess');
      if (!!action.payload) {
        data.requestsInProcess += 1
      }else{
        data.requestsInProcess -= 1
        if (!data.requestsInProcess && !!data.loading.status) {
          console.log(data.requestsInProcess, 'data.requestsInProcess');
          data.loading = {
            status: false,
            message: "Data_processing",
          }
        }
        else if (!!data.requestsInProcess && !data.loading.status) {
          data.loading.status = true;
        }
      }
      
    },
    changeLanguage: (data, action) => {
      data.language = action.payload
    },
  },
});

export const {
  changeLoadingStatus: changeLoading,
  changePopupParameters: changePopup,
  setValidationError: validationError,
  changeLanguage,
  changeRequestCounter
} = appConfigData.actions;

export default appConfigData;
