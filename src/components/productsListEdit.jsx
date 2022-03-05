import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllFirstLater,
  isProductHaveCorrectTitle,
  transformedList,
} from "./mixins/transformListForSearch";
import "../css/list.css";
import Styles from "../css/productListEdit.module.css";
import { t } from "i18next";
import Popup from "./ui/popup";
import { changeLoading, changePopup } from "../store/appConfigData";
import {
  addProductToList,
  changeProductList,
  createNewProductList,
  updateShoppingListInUserData,
} from "../store/userInfo";
import "../css/button.css";
import SearchByLater from "./ui/searchByLater";
import Checkbox from "./ui/checkbox";
import BottomActionBtn from "./shoppingList/bottomActionBtn";
import { editShoppingList, getShoppingList } from "./../store/shoppingList";
import { Link } from "react-router-dom";
import Styles_End_Shopping from "../css/popupEndShopping.module.css";
import Styles_Product_Edit from "../css/popupAddProduct.module.css";

class ProductListEdit extends Component {
  // constructor(props) {
  //   super(props);
  //   props = {
  //     // config: {
  //     //   isShoppingList: (this.props.config && this.props.config.isShoppingList) || false,
  //     // },

  //     },
  //   };
  // }

  state = {
    productList: [],
    activeLaters: [],
    popupValidation: "",
    editingProductId: null,
  };
  async componentDidMount() {
    // console.log(this.props, "this.props");
    // console.log(this.props.userShoppingListId, "userShoppingListId");

    if (this.props.config && this.props.config.useActiveShoppingList) {
      await this.setState({ productList: this.props.shoppingList });

      // console.log(
      //   this.props.userShoppingListId,
      //   "this.props.userShoppingListId"
      // );
      // console.log(
      //   await this.props.getShoppingList([
      //     {
      //       method: "equalTo",
      //       data: this.props.userShoppingListId,
      //       key: "objectId",
      //     },
      //   ]),
      //   '      await this.props.getShoppingList([{ method: "equalTo", data: this.props.userShoppingListId, key: "objectId" }])'
      // );
      // //  setTimeout(() => {
      // console.log(this.props.shoppingList, "shoppingList");
      //  }, 3000);
      // await this.setState({ productList: this.props.list });
    } else if (
      this.props.config &&
      this.props.config.combineActiveShoppingList
    ) {
      await this.setState({ productList: this.props.userProductsList });
    } else {
      await this.setState({ productList: this.props.userProductsList });
    }
    await this.setState({
      productList: transformedList(this.state.productList),
    });
    // console.log(getAllFirstLater(this.state.productList), "getAllFirstLater");
    await this.setState({
      activeLaters: getAllFirstLater(this.state.productList),
    });
    if (this.props.config.showCheckbox === true) {
      if (this.props.config.combineActiveShoppingList) {
        await this.setState({
          productList: this.state.productList.map((item) => ({
            ...item,
            status: this.productComparator(item),
          })),
        });
      } else {
        await this.setState({
          productList: this.state.productList.map((item) => ({
            ...item,
            status: false,
          })),
        });
      }
    }
    if (this.props.config.combineActiveShoppingList) {
      document.getElementById("title").value = this.props.shoppingListTitle;
    }
  }

  productComparator = (product) => {
    product = {
      title: product.title,
      desc: product.desc,
    };
    console.log(
      this.props.shoppingList,
      !!this.props.shoppingList.filter((listProduct) => {
        if (
          listProduct.title === product.title &&
          listProduct.desc === product.desc
        ) {
          return true;
        } else {
          return false;
        }
      }).length,
      "this.props.shoppingList.includes(product)"
    );
    return !!this.props.shoppingList.filter((listProduct) => {
      if (
        listProduct.title === product.title &&
        listProduct.desc === product.desc
      ) {
        return true;
      } else {
        return false;
      }
    }).length;
  };

  openAddProductPopup = () => {
    this.setState({ editingProductId: null });
    this.props.changePopup({ visibility: true });
    // document.getElementById("add-product-form").reset()
  };

  saveEditProductResults = (e) => {
    e.preventDefault();
    const title = document.getElementById("product_name").value;
    const desc = document.getElementById("product_desc").value;

    this.setState({
      productList: this.state.productList.map((product) => {
        if (product.id === this.state.editingProductId) {
          return { ...product, title, desc };
        }
        return product;
      }),
    });
    this.props.changePopup({ visibility: false });
  };

  deleteProduct = (id) => {
    this.setState({
      productList: this.state.productList.filter(
        (product) => product.id !== id
      ),
    });
    this.setState({ editingProductId: null });
  };

  async onAddProduct(e) {
    e.preventDefault();
    const form = document.getElementById("add-product-form");
    const name = document.getElementById("product_name").value;
    const desc = document.getElementById("product_desc").value;
    const newProduct = { title: name, desc };
    const isElementCreated = this.state.productList.filter(
      (product) =>
        product.title.toLowerCase() === newProduct.title.toLowerCase() &&
        product.desc === newProduct.desc
    );
    // console.log(isElementCreated, "isElementCreated");
    // console.log(
    //   newProduct.title !== "" &&
    //     !!newProduct.title &&
    //     isElementCreated.length === 0 &&
    //     isProductHaveCorrectTitle(newProduct.title),
    //   'newProduct.title !== "" && !!newProduct.title && isElementCreated.length === 0 && isProductHaveCorrectTitle(newProduct.title)'
    // );
    if (
      newProduct.title !== "" &&
      !!newProduct.title &&
      isElementCreated.length === 0 &&
      isProductHaveCorrectTitle(newProduct.title)
    ) {
      this.setState({
        productList: transformedList([...this.state.productList, newProduct]),
      });

      form.reset();
      await this.props.addProductToList(newProduct);
      await this.props.changePopup({ visibility: false });
    } else if (!isProductHaveCorrectTitle(newProduct.title)) {
      this.setState({
        popupValidation:
          "title_must_start_from_number_or_latin_or_cyrillic_later ",
      });
    } else if (isElementCreated.length > 0) {
      this.setState({ popupValidation: "this_product_is_already_added" });
    }
  }

  saveChange = async () => {
    // const newProductList = this.state.productList.map((product) => ({
    //   title: product.title,
    //   desc: product.desc,
    // }));
    // newProductList = JSON.stringify(newProductList)
    this.props.changeLoading({
      status: true,
      message: "checkingIsAccountCreated",
    });
    await this.props.changeProductList(this.props.userId, {
      userProductsList: this.state.productList.map((product) => ({
        title: product.title,
        desc: product.desc,
      })),
    });
    this.props.changeLoading({ status: false, message: "Data_processing" });
  };

  changeStatusProduct = async (id) => {
    await this.setState({
      productList: this.state.productList.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            status: !product.status,
          };
        } else {
          return product;
        }
      }),
    });

    if (this.props.config.dividedByStatus) {
      await this.setState({
        activeLaters: getAllFirstLater(
          this.state.productList.filter((product) => product.status === false)
        ),
      });
      console.log(
        getAllFirstLater(
          this.state.productList.filter((product) => product.status === false)
        ),
        this.state.productList.filter((product) => product.status === false),
        `activeLaters: getAllFirstLater(
        this.state.productList.filter((product) => product.status === false)
      ),`
      );
    }
  };

  createShoppingList = async () => {
    const filteredProducts = this.state.productList
      .filter((product) => product.status === true)
      .map((product) => ({ title: product.title, desc: product.desc }));

    console.log(filteredProducts);
    const title = document.getElementById("title").value || "New shopping list";
    const lastEdit = Date.now();
    try {
      if (filteredProducts.length) {
        await this.props.changeLoading({
          status: true,
          message: "creatingShoppingList",
        });

        await this.props.createNewProductList({
          title,
          lastEdit,
          listProducts: filteredProducts,
        });
      }
    } finally {
      this.props.changeLoading({ status: false, message: "Data_processing" });
    }
  };

  titleContent = () => {
    const titleInput = (
      <div className="column">
        <label htmlFor="title">List name</label>
        <input
          className="input"
          id="title"
          type="text"
          placeholder={t("name_shopping_list")}
        />
      </div>
    );
    const titleNoEditing = <div>{`Name: ${this.props.shoppingListTitle}`}</div>;

    if (this.props.config.showTitle) {
      if (this.props.config.editTitle) {
        return titleInput;
      } else {
        return titleNoEditing;
      }
    } else {
      return null;
    }
  };

  editShoppingList = async () => {
    const filteredProducts = this.state.productList
      .filter((product) => product.status === true)
      .map((product) => ({ title: product.title, desc: product.desc }));

    // console.log(filteredProducts);
    const title = document.getElementById("title").value || "New shopping list";
    const lastEdit = Date.now();

    try {
      await this.props.changeLoading({
        status: true,
        message: "creatingShoppingList",
      });
      await this.props.editShoppingList(
        {
          title,
          lastEdit,
          listProducts: filteredProducts,
        },
        this.props.userShoppingListId
      );
    } finally {
      this.props.changeLoading({ status: false, message: "Data_processing" });
    }
  };

  popupContent = () => {
    const { selectedProducts, dontSelectedProducts } =
      this.productsSplicedByStatus();
    const addProduct = (
      <form
        id="add-product-form"
        className="form"
        onSubmit={(e) =>
          this.state.editingProductId
            ? this.saveEditProductResults(e)
            : this.onAddProduct(e)
        }
      >
        <input
          className={`${Styles_Product_Edit.input} input`}
          id="product_name"
          type="text"
          placeholder="Name product"
        />
        <input
          className={`${Styles_Product_Edit.input} input`}
          id="product_desc"
          type="text"
          placeholder="Description"
        />
        {this.state.popupValidation}
        {this.state.editingProductId ? (
          <button
            className={`${Styles_Product_Edit["action-btn"]} btn btn-edit`}
          >
            Edit
          </button>
        ) : (
          <button
            className={`${Styles_Product_Edit["action-btn"]} btn btn-save`}
          >
            Add product
          </button>
        )}
      </form>
    );

    const endShopping = (
      <React.Fragment>
        <div className={Styles_End_Shopping.header}>
          <span>
            {t("Products taken from list")}
            {`: ${(
              (selectedProducts.length / this.state.productList.length) *
              100
            ).toFixed(2)}%`}
          </span>
          <Link className={Styles_End_Shopping.link} to="/">
            {t("Main page")}
          </Link>
        </div>
        <div>
          {dontSelectedProducts.length
            ? `${t("Not taken products list")}:`
            : null}
        </div>
        <div className={Styles_End_Shopping["product-list"]}>
          {dontSelectedProducts.slice(0, 10).map((product) => {
            return <div key={product.id}>{product.title}</div>;
          })}
        </div>
        <div>
          {dontSelectedProducts.length > 10
            ? `${t("And else")} ${dontSelectedProducts.length - 10} products`
            : null}
        </div>
      </React.Fragment>
    );

    return (
      <Popup>
        {this.props.config.activeButtons.saveChanges ? addProduct : endShopping}
      </Popup>
    );
  };

  async componentDidUpdate(prevProps, prevState) {
    // if (!prevState.productList.length && !this.props.userProductsList.length) {
    //   await this.setState({productList: this.props.userProductsList})
    // }

    if (prevProps.userShoppingList !== this.props.userShoppingList) {
      try {
        await this.props.changeLoading({
          status: true,
          message: "attach to account shopping list",
        });

        await this.props.updateShoppingListInUserData(this.props.userId, {
          userShoppingLists: this.props.userShoppingList,
        });
      } finally {
        this.props.changeLoading({ status: false, message: "Data_processing" });
      }
    }

    if (prevState.productList !== this.state.productList) {
      // console.log(
      //   this.state,
      //   "this.state",
      //   this.state.activeLaters,
      //   "this.state.activeLaters"
      // );
      await this.setState({
        activeLaters: getAllFirstLater(this.state.productList),
      });
    }
  }

  productsSplicedByStatus = () => {
    return {
      selectedProducts:
        this.state.productList.filter((product) => product.status === true) ||
        [],
      dontSelectedProducts:
        this.state.productList.filter((product) => product.status === false) ||
        [],
    };
  };

  setEditingProduct = async (product) => {
    await this.setState({ editingProductId: product.id });
    console.log(this.state.editingProductId);

    await this.props.changePopup({ visibility: true });
    document.getElementById("product_name").value = product.title || "";
    document.getElementById("product_desc").value = product.desc || "";

    // console.log(this.state.editingProductId);
    // editingProductId
  };

  render() {
    // console.log(this.props.userProductsList, "this.props.userProductsList");
    const { selectedProducts, dontSelectedProducts } =
      this.productsSplicedByStatus();
    const productList = this.props.config.dividedByStatus
      ? dontSelectedProducts
      : this.state.productList;
    const productListNotSelected = this.props.config.dividedByStatus
      ? selectedProducts
      : [];
    return (
      <React.Fragment>
        <SearchByLater />
        {this.titleContent()}
        {this.state.activeLaters.map((later) => {
          return (
            <div key={later}>
              <h3 className={Styles["later-title"]}>
                <a id={`#${later}`} href={`#${later}`}>
                  {later.toUpperCase()}
                </a>
              </h3>
              <div>
                {/* {this.state.productList */}
                {productList
                  .filter((product) => product.searchLater === later)
                  .map((product) => {
                    return (
                      <div className={Styles["product"]} key={product.id}>
                        <div className="row">
                          {this.props.config.showCheckbox ? (
                            <div
                              className={Styles["checkbox-container"]}
                              onClick={() =>
                                this.changeStatusProduct(product.id)
                              }
                            >
                              <Checkbox status={product.status} />
                            </div>
                          ) : null}
                          <div>
                            <div className={Styles["product-title"]}>
                              {product.title}
                            </div>
                            {product.desc ? (
                              <div className={Styles["product-description"]}>
                                desc: {product.desc}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {this.props.config.showProductActions ? (
                          <div className={Styles["product-btn-group"]}>
                            <button
                              className="btn btn-edit btn-edit--shopping-list"
                              onClick={() => this.setEditingProduct(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-delete btn-delete--shopping-list"
                              onClick={() => this.deleteProduct(product.id)}
                            >
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
        {productListNotSelected.length > 0 ? (
          <div className={Styles["group-selected-products"]}>
            <div className={Styles["group-selected-products__title"]}>
              {t("Selected products")}
            </div>
            {productListNotSelected.map((product) => {
              return (
                <div
                  className={`${Styles.product} ${Styles["product--selected"]}`}
                  key={product.id}
                >
                  {this.props.config.showCheckbox ? (
                    <div
                      className={Styles["checkbox-container"]}
                      onClick={() => this.changeStatusProduct(product.id)}
                    >
                      <Checkbox status={product.status} alternativeColor={true} />
                    </div>
                  ) : null}
                  <span>
                    <div className={Styles["product-title"]}>
                      {product.title}
                    </div>
                    {product.desc ? (
                      <div className={Styles["product-description"]}>
                        desc: {product.desc}
                      </div>
                    ) : null}
                  </span>
                </div>
              );
            })}
          </div>
        ) : null}

        <BottomActionBtn
          config={this.props.config.activeButtons}
          saveChange={this.saveChange}
          openAddProductPopup={this.openAddProductPopup}
          onCreateShoppingList={this.createShoppingList}
          onEditShoppingList={this.editShoppingList}
        />
        {/* 
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
          {this.props.isShoppingList ? (
            <button
              onClick={this.createShoppingList}
              className={`${Styles["btn"]} ${Styles["btn-save"]}`}
            >
              {t("Create shopping list")}
            </button>
          ) : null}
        </div> */}
        {this.popupContent()}
      </React.Fragment>
    );
  }
}

ProductListEdit.defaultProps = {
  config: {
    useActiveShoppingList: false,
    dividedByStatus: false,
    showCheckbox: false,
    showProductActions: false,
    activeButtons: {
      addProduct: false,
      saveChanges: false,
      createList: false,
      endShopping: false,
    },
  },
};

function mapStateToProps(state) {
  return {
    userProductsList: state.appData.users.userProductsList,
    userId: state.appData.users.objectId,
    userShoppingList: state.appData.users.userShoppingLists,
    userShoppingListId: state.appData.shoppingList.activeListId,
    shoppingList: state.appData.shoppingList.activeShoppingList,
    shoppingListTitle: state.appData.shoppingList.activeListTitle,
  };
}

export default connect(mapStateToProps, {
  changePopup,
  changeLoading,
  changeProductList,
  addProductToList,
  createNewProductList,
  updateShoppingListInUserData,
  getShoppingList,
  editShoppingList,
})(ProductListEdit);
