import "./App.css";
import { Routes, Route } from "react-router-dom";
import Preloader from "./components/Layouts/Preloader";
import { withNamespaces } from "react-i18next";
import { Provider, useDispatch } from "react-redux";
import store from "./store/configStore";
// import Popup from "./components/ui/popup";
import MainPage from "./pages/main";
import MainLayout from "./components/Layouts/MainLayout";
import ShoppingList from "./pages/shoppingList";
import EditProducts from "./pages/editProducts";
import { getUserData } from "./store/userInfo";
import './App.css'
import { changePopup } from "./store/appConfigData";
import CreateProductList from "./pages/createShoppingList";
import { useEffect } from "react";
import EditShoppingList from './pages/editShoppingList';
// afterLogin loginUser changeLoading
function App({ t }) {
  // const Parse = require("parse");

  // Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
  // // Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
  // Parse.initialize(
  //   "eAwXaCiwVn3wFXmGiPoyfH1x8tIKBkFq27QkQac9", // This is your Application ID
  //   "EpchqXPAHbXhvVnfgHHAltVB5aEKPook25vZkK74" // This is your Javascript key
  // );

  // (async () => {
  //   const myNewObject = new Parse.Object('UserData');
  //   myNewObject.set('nickName', 'A string');
  //   myNewObject.set('pinCode', 'A string');
  //   myNewObject.set('settings', { foo: 'bar' });
  //   myNewObject.set('userProductsList', [1, 'a string']);
  //   myNewObject.set('userShoppingLists', [1, 'a string']);
  //   try {
  //     const result = await myNewObject.save();
  //     // Access the Parse Object attributes using the .GET method
  //     console.log('UserData created', result);
  //   } catch (error) {
  //     console.error('Error while creating UserData: ', error);
  //   }
  // })();

  // (async () => {
  //   const UserData = Parse.Object.extend('UserData');
  //   const query = new Parse.Query(UserData);
  //   // You can also query by using a parameter of an object
  //   query.equalTo('nickName', 'DimaR');
  //   query.equalTo('pinCode', 'KEIGHDIIIIKYQF');
  //   try {
  //     const results = await query.find();
  //     console.log(JSON.stringify(results));
  //     for (const object of results) {
  //       // Access the Parse Object attributes using the .GET method
  //       console.log(object);
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
  //   } catch (error) {
  //     console.error('Error while fetching UserData', error);
  //   }
  // })();

  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(!!userData , !!userData.objectId ,!!userData.username, '!!userData && !!userData.objectId && !!userData.nickName');
  const loginUserAuto = async () => {
    if (!!userData && !!userData.objectId && !!userData.username) {
      // await dispatch(changeLoading({ status: true, message: "getUserData" }));
      // await dispatch(loginUser(userData.objectId));
      // await dispatch(
      //   changeLoading({ status: false, message: "Data_processing" })
      // );
      await dispatch(getUserData(userData.objectId));
      dispatch(changePopup({ visibility: false }));
    } else {
      dispatch(changePopup({ visibility: true }));
    }
  };
  useEffect(() => {
    loginUserAuto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(store.getState(), "store");

  return (
    <div className="App">
      <Provider store={store}>
        <Preloader />
        {/*<Popup>
          <div>
            <h1>@test!@</h1>
            <div>
              asfasfh asmofymasofm yasofh asuif
              giasgfasigfiasgssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
              23456 gasiofgasof gasofgasoyasfasgyfyu gyio asf
            </div>
            !!!!!!!!!!!!asf
          </div>
        </Popup> */}
        <MainLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/edit-shopping-list" element={<EditShoppingList />} />
            <Route path="/edit-products" element={<EditProducts />} />
            <Route
              path="/create-product-list"
              element={<CreateProductList />}
            />
            <Route
              path="/shopping-list"
              element={
                <ShoppingList
                  activeListId={
                    store.getState().appData.shoppingList.activeListId
                  }
                />
              }
              
            />
            {/* edit-shopping-list */}
          </Routes>
        </MainLayout>
      </Provider>
    </div>
  );
}

export default withNamespaces()(App);
