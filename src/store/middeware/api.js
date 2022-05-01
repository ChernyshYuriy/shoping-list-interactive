// import axios from "axios";
import * as actions from "../api";
import { changeRequestCounter } from "../appConfigData";

const Parse = require("parse");
Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  "eAwXaCiwVn3wFXmGiPoyfH1x8tIKBkFq27QkQac9", // This is your Application ID
  "EpchqXPAHbXhvVnfgHHAltVB5aEKPook25vZkK74" // This is your Javascript key
);

let apiResponse = {};

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const {
      url,
      method = "get",
      data = {},
      id,
      // isLogin = false,
      requestParams = [],
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

    dispatch(changeRequestCounter(1))


    try {
      await (async () => {
        if (method === "post") {
          const myNewObject = new Parse.Object(url);
          // myNewObject.set('myCustomKey1Name', 'myCustomKey1Value');
          // myNewObject.set('myCustomKey2Name', 'myCustomKey2Value');
          Object.keys(data).forEach((parameter) => {
            myNewObject.set(parameter, data[parameter]);
          });
          try {
            const result = await myNewObject.save();
            // Access the Parse Object attributes using the .GET method
            apiResponse = {
              ...data,
              objectId: result.id,
            };
          } catch (error) {
            console.error("Error while creating ParseObject: ", error);
          }
        } else if (method === "get") {

          const userShoppingLists = Parse.Object.extend(url);
          const query = new Parse.Query(userShoppingLists);

          if (requestParams.length) {
            requestParams.forEach(parameter => {
              const {method, data, key} = parameter
              query[method](key, data);
            })
          }
          // You can also query by using a parameter of an object
          // query.equalTo('objectId', 'xKue915KBG');
          try {
            const results = await query.find();
            apiResponse = JSON.stringify(results)
            for (const object of results) {
              // Access the Parse Object attributes using the .GET method
              const listProducts = object.get('listProducts')
              console.log(listProducts);
            }
          } catch (error) {
            console.error('Error while fetching userShoppingLists', error);
          }
          
          // (async () => {
          //   const Request = Parse.Object.extend(url);
          //   const query = new Parse.Query(Request);
          //   // You can also query by using a parameter of an object
          //   console.log(1);
          //   if (!!isLogin) {
          //     console.log(data, 'data');
          //     query.equalTo('nickName', data.nickName);
          //     query.equalTo('pinCode', data.pinCode);
          //   }
          //   console.log(2);
          //   try {
          //     const results = await query.find();
          //     console.log(results, 'results 3');
          //     console.log(results,  JSON.stringify(results), 'apiResponse apiResponse apiResponse apiResponse apiResponse apiResponse apiResponse');
          //     console.log(JSON.stringify(results));
          //     for (const object of results) {
          //       // Access the Parse Object attributes using the .GET method
          //       console.log(object, 'objectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobject');
          //       const nickName = object.get('nickName')
          //       const pinCode = object.get('pinCode')
          //       const settings = object.get('settings')
          //       const userProductsList = object.get('userProductsList')
          //       const userShoppingLists = object.get('userShoppingLists')
          //       console.log(nickName);
          //       console.log(pinCode);
          //       console.log(settings);
          //       console.log(userProductsList);
          //       console.log(userShoppingLists);
          //     }
          //     apiResponse = results
          //   } catch (error) {
          //     console.error('Error while fetching UserData', error);
          //   }
          // })();
          // // // // // if (!!isLogin) {
          // // // // //   (async () => {
          // // // // //     const user = new Parse.User();
          // // // // //     user.set("username", data.nickName);
          // // // // //     user.set("email", "haraternyky@gmail.com");
          // // // // //     user.set("password", data.pinCode);
          // // // // //     user.set("settings", { title: false, data: [1, 2, 5] });
          // // // // //     try {
          // // // // //       let userResult = await user.signUp();
          // // // // //       console.log("User signed up", userResult);
          // // // // //     } catch (error) {
          // // // // //       console.error("Error while signing up user", error);
          // // // // //     }
          // // // // //   })();
          // // // // // }
        } else if (method === "put") {
          // (async () => {})();
            const query = new Parse.Query(url);
            try {
              // here you put the objectId that you want to update
              const object = await query.get(id);

              Object.keys(data).forEach((parameter) => {
                object.set(parameter, data[parameter]);
              });

              // object.set("myCustomKey1Name", "new value");
              try {
                const response = await object.save();
                apiResponse = JSON.stringify(response)
                // You can use the "get" method to get the value of an attribute
                // Ex: response.get("<ATTRIBUTE_NAME>")
                // Access the Parse Object attributes using the .GET method
                // console.log(response.get("myCustomKey1Name"));
              } catch (error) {
                console.error("Error while updating ", error);
              }
            } catch (error) {
              console.error("Error while retrieving object ", error);
            }
          
        } else if (method === "delete") {
          const query = new Parse.Query(url);
          try {
            // here you put the objectId that you want to delete
            const object = await query.get(id);
            try {
              const response = await object.destroy();
              apiResponse = JSON.stringify(response)

            } catch (error) {
              console.error('Error while deleting ParseObject', error);
            }
          } catch (error) {
            console.error('Error while retrieving ParseObject', error);
          }
        }

        // const response = await axios.request({
        //   baseURL:
        //     "https://eu-api.backendless.com/55189587-2BE3-358A-FF03-8187FFA64A00/A055944A-95C6-42F2-B4EC-211B19FA6486/data/",
        //   url,
        //   method,
        //   data,
        // });
        dispatch(actions.apiCallSuccess(apiResponse));
        if (onSuccess) {
          await dispatch({ type: onSuccess, payload: apiResponse });
        }
        // if (onSuccess && onSuccess === "appConfigData/changeLoadingStatus") {
        //   console.log(response.data, 'response.data');
        //   dispatch({
        //     type: onSuccess,
        //     payload: { status: true, message: loadingMassage },
        //   });
        // } else if (onSuccess)
        //   dispatch({ type: onSuccess, payload: response.data });
      })();
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
      dispatch(changeRequestCounter(0))
      // if (onFinish && isThisLastAPI)
      //   dispatch({
      //     type: onFinish,
      //     payload: { status: false, message: "Data processing" },
      //   });
    }
  };
export default api;
