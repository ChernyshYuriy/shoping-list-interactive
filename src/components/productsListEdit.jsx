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
// import Checkbox from "./ui/checkbox";
import BottomActionBtn from "./shoppingList/bottomActionBtn";
import { editShoppingList, getShoppingList, setActiveListId } from "./../store/shoppingList";
import { Link } from "react-router-dom";
import Styles_End_Shopping from "../css/popupEndShopping.module.css";
import Styles_Product_Edit from "../css/popupAddProduct.module.css";
import SelectedProduct from "./shoppingList/selectedProduct";
import NotSelectedProduct from "./shoppingList/NotSelectedProduct";
class ProductListEdit extends Component {
  constructor(props) {
    super(props);

    console.log("constructor");
    console.log(props.params);
    this.title = React.createRef();
    this.product_name = React.createRef();
    this.product_desc = React.createRef();
  }

  state = {
    productList: [],
    activeLaters: [],
    popupValidation: "",
    editingProductId: null,
    extraParams: [],
  };
  async componentDidMount() {
    const getPathId = (thePath) =>
      thePath.substring(thePath.lastIndexOf("/") + 1);
    console.log(getPathId(window.location.href), "safasfafs");
    if (
      (this.props.config && this.props.config.useActiveShoppingList) ||
      this.props.config.combineActiveShoppingList
    ) {
      await this.props.changeLoading({
        status: true,
        message: "attach to account shopping list",
      });
      await this.props.setActiveListId(getPathId);

      await this.props.getShoppingList([
        { method: "equalTo", data: getPathId, key: "objectId" },
      ]);
    }
    await this.productConstructor();
  }

  productConstructor = async () => {
    if (this.props.config && this.props.config.useActiveShoppingList) {
      await this.setState({ productList: this.props.shoppingList });
    } else if (
      this.props.config &&
      this.props.config.combineActiveShoppingList
    ) {
      await this.setState({ productList: this.props.userProductsList });
    } else {
      await this.setState({ productList: this.props.userProductsList });
    }
    // console.log(
    //   this.state.productList,
    //   "this.props.userProductsList this.props.userProductsList this.props.userProductsList this.props.userProductsList this.props.userProductsList"
    // );
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
      this.title.current.value = this.props.shoppingListTitle;
      // document.getElementById("title").value = this.props.shoppingListTitle;
    }
  };

  productComparator = (product) => {
    product = {
      title: product.title,
      desc: product.desc,
      extraParams: product.extraParams,
    };
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
    this.setState({ extraParams: [] });
    this.props.changePopup({ visibility: true });
    // console.log(this.product_name.current, 'this.product_name.current');
    // document.getElementById("add-product-form").reset()
  };

  saveEditProductResults = (e) => {
    e.preventDefault();
    const title = this.product_name.current.value;
    const desc = this.product_desc.current.value;
    const getValueFromInput = (id) => {
      return document.getElementById(id).value;
    };
    const extraParamsData = this.state.extraParams.map((parameter) => {
      return {
        id: parameter.id,
        key: getValueFromInput(`${parameter.id}-key`) || "Parameter",
        value: getValueFromInput(`${parameter.id}-value`),
      };
    });
    // console.log(
    //   extraParamsData,
    //   "extraParamsData extraParamsData extraParamsData"
    // );
    this.setState({
      productList: this.state.productList.map((product) => {
        if (product.id === this.state.editingProductId) {
          return { ...product, title, desc, extraParams: extraParamsData };
        }
        return product;
      }),
    });
    // console.log(
    //   this.state.productList.map((product) => {
    //     if (product.id === this.state.editingProductId) {
    //       return { ...product, title, desc, extraParams: extraParamsData };
    //     }
    //     return product;
    //   })
    // );
    this.props.changePopup({ visibility: false });
  };

  addAdditionalParameters = () => {
    let newId = String(new Date() / 1000);
    this.setState({
      extraParams: [
        ...this.state.extraParams,
        { id: newId, key: "", value: "" },
      ],
    });
    // console.log(this.state.extraParams, "this.state.extraParams");
    // this.state.editingProductId
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
    const name = this.product_name.current.value;
    const desc = this.product_desc.current.value;
    const getValueFromInput = (id) => {
      return document.getElementById(id).value;
    };
    const extraParamsData = this.state.extraParams.map((parameter) => {
      return {
        id: parameter.id,
        key: getValueFromInput(`${parameter.id}-key`) || "Parameter",
        value: getValueFromInput(`${parameter.id}-value`),
      };
    });
    const newProduct = { title: name, desc, extraParams: extraParamsData };

    const isElementCreated = this.state.productList.filter(
      (product) =>
        product.title.toLowerCase() === newProduct.title.toLowerCase() &&
        product.desc === newProduct.desc
    );
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
      this.setState({
        popupValidation: "",
      });
      await this.props.changePopup({ visibility: false });
    } else if (!isProductHaveCorrectTitle(newProduct.title)) {
      this.setState({
        popupValidation:
          "title_must_start_from_number_or_latin_or_cyrillic_later",
      });
    } else if (isElementCreated.length > 0) {
      this.setState({ popupValidation: "this_product_is_already_added" });
    }
  }

  saveChange = async () => {
    this.props.changeLoading({
      status: true,
      message: "checkingIsAccountCreated",
    });
    await this.props.changeProductList(this.props.userId, {
      userProductsList: this.state.productList.map((product) => ({
        title: product.title,
        desc: product.desc,
        extraParams:
          product.extraParams !== undefined ? product.extraParams : [],
      })),
    });
    // this.props.changeLoading({ status: false, message: "Data_processing" });
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
    }
  };

  createShoppingList = async () => {
    const filteredProducts = this.state.productList
      .filter((product) => product.status === true)
      .map((product) => ({
        title: product.title,
        desc: product.desc,
        extraParams: product.extraParams,
      }));
    const title = this.title.current.value || "New shopping list";
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
      // this.props.changeLoading({ status: false, message: "Data_processing" });
    }
  };

  titleContent = () => {
    const titleInput = (
      <div className="column">
        <label htmlFor="title">{t("List name")}</label>
        <input
          className="input"
          id="title"
          type="text"
          ref={this.title}
          // placeholder={t("name_shopping_list")}
        />
      </div>
    );
    const titleNoEditing = (
      <div>{`${t("Name")}: ${this.props.shoppingListTitle}`}</div>
    );

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
    const title = this.title.current.value || "New shopping list";
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
      // this.props.changeLoading({ status: false, message: "Data_processing" });
    }
  };

  deleteExtraParameter = (id) => {
    this.setState({
      extraParams: this.state.extraParams.filter(
        (parameter) => parameter.id !== id
      ),
    });
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
          ref={this.product_name}
          autoFocus
        />
        <input
          className={`${Styles_Product_Edit.input} input`}
          id="product_desc"
          type="text"
          placeholder="Description"
          ref={this.product_desc}
        />
        {this.state.extraParams.map((parameter) => {
          return (
            <div
              className={Styles_Product_Edit["extra-parameter"]}
              key={parameter.id}
            >
              <input
                className={`${Styles_Product_Edit["extra-parameter__input"]}`}
                type="text"
                name=""
                defaultValue={parameter.key}
                id={`${parameter.id}-key`}
                placeholder={t("Name")}
              />
              {" : "}
              <input
                className={`${Styles_Product_Edit["extra-parameter__input"]}`}
                type="text"
                name=""
                defaultValue={parameter.value}
                id={`${parameter.id}-value`}
                placeholder={t("Value")}
              />
              <svg
                className="clickable"
                onClick={() => this.deleteExtraParameter(parameter.id)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
              {/* <span onClick={() => this.deleteExtraParameter(parameter.id)}>
                {t('Delete')}
              </span> */}
            </div>
          );
        })}
        {t(this.state.popupValidation)}
        <div
          className={`${Styles_Product_Edit["add-parameter"]}`}
          onClick={this.addAdditionalParameters}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 50 50"
            width="24px"
          >
            <rect fill="none" height="50" width="50"></rect>
            <line
              fill="none"
              stroke="#000000"
              x1="9"
              x2="41"
              y1="25"
              y2="25"
            ></line>
            <line
              fill="none"
              stroke="#000000"
              x1="25"
              x2="25"
              y1="9"
              y2="41"
            ></line>
          </svg> */}
          {t("Add costume parameters")}
        </div>
        {/* {Object.keys(this.state.extraParams).map(
          (parameter) => {
            return (
              <div>
                <input
                  className={`${Styles_Product_Edit.input} input`}
                  id={parameter.id}
                  type="text"
                  placeholder="Description"
                  value={parameter}
                />
                <input
                  className={`${Styles_Product_Edit.input} input`}
                  id={this.state.extraParams[parameter]}
                  type="text"
                  placeholder="Description"
                  value={
                    this.state.extraParams[parameter]
                  }
                />
              </div>
            );
          }
        )} */}
        {this.state.editingProductId ? (
          <button
            className={`${Styles_Product_Edit["action-btn"]} btn btn-edit`}
          >
            {t("Edit")}
          </button>
        ) : (
          <button
            className={`${Styles_Product_Edit["action-btn"]} btn btn-save`}
          >
            {t("Add product")}
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
        // this.props.changeLoading({ status: false, message: "Data_processing" });
      }
    }

    if (prevState.productList !== this.state.productList) {
      await this.setState({
        activeLaters: getAllFirstLater(this.state.productList),
      });
    }

    if (prevState.shoppingList !== this.state.shoppingList) {
      this.productComparator();
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
    this.setState({ extraParams: [] });
    await this.setState({ editingProductId: product.id });
    await this.props.changePopup({ visibility: true });
    this.product_name.current.value = product.title || "";
    this.product_desc.current.value = product.desc || "";
    // const extraParamsKeys =
    //   product.extraParams !== undefined
    //     ? Object.keys(product.extraParams)
    //     : [];
    // console.log(product, " product 12 product");
    this.setState({ extraParams: product.extraParams || [] });
    // if (extraParamsKeys.length > 1) {
    //   extraParamsKeys.forEach((key) => {
    //     document.getElementById(key).value = key;
    //     document.getElementById(product.extraParams[key]).value =
    //       product.extraParams[key];
    //   });
    // }
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
    // console.log(
    //   this.state.productList,
    //   productList,
    //   "productList productList productList productList productList"
    // );
    return (
      <React.Fragment>
        <SearchByLater productList={productList} />
        {this.titleContent()}
        {this.state.activeLaters.map((later) => {
          return (
            <div key={later}>
              <h3 className={Styles["later-title"]}>
                <a data-id={later} id={`#${later}`} href={`#${later}`}>
                  {later.toUpperCase()}
                </a>
              </h3>
              <div>
                {/* {this.state.productList */}
                {productList
                  .filter((product) => product.searchLater === later)
                  .map((product) => {
                    return (
                      <NotSelectedProduct
                        key={product.id}
                        product={product}
                        config={this.props.config}
                        changeStatusProduct={this.changeStatusProduct}
                        setEditingProduct={this.setEditingProduct}
                        deleteProduct={this.deleteProduct}
                      />
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
                <SelectedProduct
                  product={product}
                  showCheckbox={this.props.config.showCheckbox}
                  changeStatusProduct={this.changeStatusProduct}
                />
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
    addProductListParams: false,
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
  editShoppingList,
  setActiveListId,
getShoppingList
})(ProductListEdit);
