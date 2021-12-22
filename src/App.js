import "./App.css";
import { Routes, Route } from "react-router-dom";
import Preloader from "./components/Layouts/Preloader";
import { withNamespaces } from "react-i18next";
import { Provider } from "react-redux";
import store from "./store/configStore";
// import Popup from "./components/ui/popup";
import MainPage from "./pages/main";
import MainLayout from "./components/Layouts/MainLayout";
import ShoppingList from "./pages/shoppingList";
import EditProducts from "./pages/editProducts";


function App({ t }) {
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
            <Route path="/edit-list" element={<ShoppingList />} />
            <Route path="/edit-product-list" element={<EditProducts />} />
          </Routes>
        </MainLayout>
      </Provider>
    </div>
  );
}

export default withNamespaces()(App);
