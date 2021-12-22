import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllFirstLater,
  isProductHaveCorrectTitle,
  transformedList,
} from "./mixins/transformListForSearch";
import "../css/list.css"
import Styles from "../css/productListEdit.module.css";
import { t } from "i18next";
import Popup from "./ui/popup";
import { changeLoading, changePopup } from "../store/appConfigData";
import { changeProductList } from "../store/userInfo";
import SearchByLater from "./ui/searchByLater";


class ProductListEdit extends Component {
  state = {
    productList: [],
    activeLaters: [],
    popupValidation: ''
  };
  async componentDidMount() {
    // console.log(
    //   transformedList(this.props.userProductsList)
    // );
    // await this.setState({
    //   productList: transformedList([
    //     { title: "       Asafsafgdaga", desc: "fsafsasa ffssfa fs" },
    //     { title: "Dsafsafgdaga" },
    //     { title: "Бsafsafgdaga       " },
    //     { title: " Asafsafgdaga  " },
    //     { title: "   Дsafsafgdag a   " },
    //   ]),
    // });
    await this.setState({productList: this.props.userProductsList})
    await this.setState({
      productList: transformedList(this.state.productList),
    });
    console.log(getAllFirstLater(this.state.productList), "getAllFirstLater");
    await this.setState({
      activeLaters: getAllFirstLater(this.state.productList),
    });
  }

  onAddProduct(e) {
    e.preventDefault();
    const form = document.getElementById("add-product-form");
    const name = document.getElementById("product_name").value;
    const desc = document.getElementById("product_desc").value;
    const newProduct = { title: name, desc }
    const isElementCreated = this.state.productList.filter(product => product.title === newProduct.title && product.desc === newProduct.desc)
    console.log(isElementCreated, 'isElementCreated');
    if (newProduct.title !== "" && !!newProduct.title && isElementCreated.length === 0 && isProductHaveCorrectTitle(newProduct.title)) {
      this.setState({
        productList: transformedList([
          ...this.state.productList,
          newProduct,
        ]),
      });

      form.reset();
      this.props.changePopup({ visibility: false });
    }else if (!isProductHaveCorrectTitle(newProduct.title)){
      this.setState({popupValidation: 'title_must_start_from_number_or_latin_or_cyrillic_later '})
    }else if (isElementCreated.length > 0){
      this.setState({popupValidation: 'this_product_is_already_added'})
    }
  }

   saveChange = async () => {
    const newProductList = this.state.productList.map((product) => ({
      title: product.title,
      desc: product.desc,
    }));
    // newProductList = JSON.stringify(newProductList)
    console.log(newProductList, "newProductList");
    this.props.changeLoading({ status: true, message: 'checkingIsAccountCreated' })
        await this.props.changeProductList(this.props.userId, {userProductsList: newProductList});
    this.props.changeLoading({ status: false, message: 'Data_processing' })
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.productList !== this.state.productList) {
      console.log(
        this.state,
        "this.state",
        this.state.activeLaters,
        "this.state.activeLaters"
      );
      await this.setState({
        activeLaters: getAllFirstLater(this.state.productList),
      });
    }
  }

  render() {
    console.log(this.props.userProductsList, "this.props.userProductsList");
    return (
      <React.Fragment>
        <SearchByLater />
        {this.state.activeLaters.map((later) => {
          return (
            <div key={later}>
              <h3 className={Styles["later-title"]}>
                <a id={`#${later}`} href={`#${later}`}>
                  {later.toUpperCase()}
                </a>
              </h3>
              <div>
                {this.state.productList
                  .filter((product) => product.searchLater === later)
                  .map((product) => {
                    return (
                      <div className={Styles["product"]} key={product.id}>
                        <div className={Styles["product-title"]}>
                          {product.title}
                        </div>
                        <div className={Styles["product-description"]}>
                          {product.desc}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
        <div className={Styles["bottom-btn-group"]}>
          <button
            className={`${Styles["btn"]} ${Styles["btn-create"]}`}
            onClick={() => this.props.changePopup({ visibility: true })}
          >
            {t("Add product")}
          </button>
          <button
            onClick={this.saveChange}
            className={`${Styles["btn"]} ${Styles["btn-save"]}`}
          >
            {t("Save changes")}
          </button>
        </div>
        <Popup>
          <form
            id="add-product-form"
            className="form"
            onSubmit={(e) => this.onAddProduct(e)}
          >
            <input id="product_name" type="text" placeholder="Name product" />
            <input id="product_desc" type="text" placeholder="Description" />
            {this.state.popupValidation}


            <button className="">Add product</button>
          </form>
        </Popup>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProductsList: state.appData.users.userProductsList,
    userId: state.appData.users.objectId,
  };
}

export default connect(mapStateToProps, { changePopup, changeLoading, changeProductList })(
  ProductListEdit
);
