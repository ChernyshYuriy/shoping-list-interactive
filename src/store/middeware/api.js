import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const {
      url,
      method,
      data,
      onStart,
      onFinish,
      onSuccess,
      onError,
      loadingMassage = "Data_processing",
    } = action.payload;
    if (onStart && onStart === "appConfigData/changeLoadingStatus") {
      dispatch({
        type: onStart,
        payload: { status: true, message: loadingMassage },
      });
    } else if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await axios.request({
        baseURL:
          "https://eu-api.backendless.com/55189587-2BE3-358A-FF03-8187FFA64A00/A055944A-95C6-42F2-B4EC-211B19FA6486/data/",
        url,
        method,
        data,
      });
      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess) {
        await dispatch({ type: onSuccess, payload: response.data });
      }
      // if (onSuccess && onSuccess === "appConfigData/changeLoadingStatus") {
      //   console.log(response.data, 'response.data');
      //   dispatch({
      //     type: onSuccess,
      //     payload: { status: true, message: loadingMassage },
      //   });
      // } else if (onSuccess)
      //   dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch(actions.apiCallFailed(error.massage));
      // if (onError) {
      //   dispatch({ type: onError, payload: error.massage });
      // }
      if (onError && onError === "appConfigData/changeLoadingStatus") {
        dispatch({
          type: onError,
          payload: { status: true, message: loadingMassage },
        });
      } else if (onError) dispatch({ type: onError, payload: error.massage });
    } finally {
      if (onFinish && onFinish === "appConfigData/changeLoadingStatus") {
        dispatch({
           type: onFinish,
           payload: { status: false, message: "Data processing" },
        });
      } else if (onFinish) dispatch();
      // if (onFinish && isThisLastAPI)
      //   dispatch({
      //     type: onFinish,
      //     payload: { status: false, message: "Data processing" },
      //   });
    }
  };
export default api;
