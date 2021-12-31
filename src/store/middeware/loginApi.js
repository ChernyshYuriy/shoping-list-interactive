import * as actions from "../apiLogin";

const Parse = require("parse");
Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  "eAwXaCiwVn3wFXmGiPoyfH1x8tIKBkFq27QkQac9", // This is your Application ID
  "EpchqXPAHbXhvVnfgHHAltVB5aEKPook25vZkK74" // This is your Javascript key
);

let apiResponse = null;
let apiError = '';
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

              console.log("User signed up", userResult);
            } catch (error) {
              console.error("Error while signing up user", error);
              apiError = error
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
              apiError = error
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

              console.log("User found", user);
            } catch (error) {
              console.error("Error while fetching user", error);
            }
            break;

          case "updateUser":
            // const User = new Parse.User();
            // const query = new Parse.Query(User);

            try {
              // Finds the user by its ID
              let user = await query.get(userId);
              // Updates the data we want
              const dataKeys = Object.keys(data);
              dataKeys.forEach((key) => {
                console.log(key, data[key], "key, data[key]");
                user.set(key, data[key]);
              });
              // user.set("username", nickName);
              // user.set("email", email);
              // user.set("settings", setting);
              try {
                // Saves the user with the updated data
                let response = await user.save();
                console.log(data, "data");
                if (data.userProductsList) apiResponse = data.userProductsList;
                console.log("Updated user", response);
              } catch (error) {
                console.error("Error while updating user", error);
              }
            } catch (error) {
              // alert(error)
              // console.log(error);
              if (onError) dispatch({ type: onError, payload: error.massage });
            }
            break;

          default:
            return;
        }
        console.log(onSuccess , !apiError ,onSuccess && !apiError, 'onSuccess && !apiError');
        console.log(JSON.stringify(apiError) , 'apiError , onError');

        if (onSuccess && !apiError && apiResponse !== null) {
          console.log(await apiResponse, "apiResponse");
          await dispatch({ type: onSuccess, payload: apiResponse });
        }
        console.log(apiError, 'apiError');
        if (apiError && onError) {
          console.log(apiError, 'apiError');
          dispatch({ type: onError, payload: JSON.stringify(apiError) });
        }
        apiResponse = null;
        apiError = '';
      })();
    // } catch (error) {

    // }
  };

export default apiLogin;
