import * as actions from "../apiLogin";
import { changeRequestCounter } from "../appConfigData";

const Parse = require("parse");
Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  "eAwXaCiwVn3wFXmGiPoyfH1x8tIKBkFq27QkQac9", // This is your Application ID
  "EpchqXPAHbXhvVnfgHHAltVB5aEKPook25vZkK74" // This is your Javascript key
);

let apiResponse = null;
let apiError = "";
const apiLogin =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiLoginCallBegan.type) return next(action);
    const {
      // url,
      method,
      data,
      // isLogin = false,
      nickName,
      password,
      email,
      // setting,
      userId,
      // onStart,
      // onFinish,
      onSuccess,
      onError,
      // loadingMassage = "Data_processing",
    } = action.payload;

    dispatch(changeRequestCounter(1));

    // try {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    (async () => {
      const expr = method;
      switch (expr) {
        case "createAccount":
          const user = new Parse.User();
          user.set("username", nickName);
          user.set("email", email);
          user.set("password", password);

          try {
            let userResult = await user.signUp();
            apiResponse = JSON.stringify(userResult);
          } catch (error) {
            console.error("Error while signing up user", error);
            apiError = error;
          }
          console.log(`Sorry, we are out of ${expr}.`);
          break;
        case "loginUser":
          try {
            // Pass the username and password to logIn function
            let user = await Parse.User.logIn(nickName, password);
            apiResponse = JSON.stringify(user);
            // Do stuff after successful login
            // console.log("Logged in user",apiResponse);
          } catch (error) {
            console.error("Error while logging in user", error);
            apiError = error;
          }
          break;

        case "passwordReset":
          try {
            // Pass the username and password to logIn function
            let result = await Parse.User.requestPasswordReset(email);
            apiResponse = JSON.stringify(result);

            // Password reset request was sent successfully
            console.log("Reset password email sent successfully");
          } catch (error) {
            console.error(
              "Error while creating request to reset user password",
              error
            );
          }
          break;

        case "retrievingUser":
          try {
            let user = await Parse.User.logIn(nickName, password);
            const currentUser = Parse.User.current();
            apiResponse = JSON.stringify(user);

            console.log("Current logged in user", currentUser);
          } catch (error) {
            console.error("Error while logging in user", error);
          }
          break;

        case "readingUser":
          // const User = new Parse.User();
          // const query = new Parse.Query(User);

          try {
            let user = await query.get(userId);
            apiResponse = JSON.stringify(user);
          } catch (error) {
            console.error("Error while fetching user", error);
          }
          break;

        case "updateUser":
          // const User = new Parse.User();
          // const query = new Parse.Query(User);

          // console.log(userId,
          //   Object.keys(data),
          //   data,
          //   "datdatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadataa"
          // );

          try {
            // Finds the user by its ID
            // console.log(1);
            let user = await query.get(userId);
            // console.log(2);
            // Updates the data we want

            const dataKeys = Object.keys(data);
            dataKeys.forEach((key) => {
              user.set(key, data[key]);
            });
            // user.set("username", nickName);
            // user.set("email", email);
            // user.set("settings", setting);
            // Saves the user with the updated data
            // let response = await user.save();
            if (data.userProductsList) apiResponse = data.userProductsList;
            // console.log("Updated user", response);
          } catch (error) {
            // alert(error)
            // console.log(error);
            if (onError) dispatch({ type: onError, payload: error.massage });
          }
          break;

        default:
          return;
      }

      if (onSuccess && !apiError && apiResponse !== null) {
        await dispatch({ type: onSuccess, payload: apiResponse });
      }
      if (apiError && onError) {
        dispatch({ type: onError, payload: JSON.stringify(apiError) });
      }
      apiResponse = null;
      apiError = "";
      dispatch(changeRequestCounter(0));
    })();
    // } catch (error) {

    // }
  };

export default apiLogin;
