import { t } from "i18next";
import React, { Component } from "react";
import { connect } from "react-redux";
import Styles from "../../css/productListEdit.module.css";
import { changeLoading, changePopup } from "../../store/appConfigData";
import { changeProductList } from "../../store/userInfo";

class BottomActionBtn extends Component {

  buttonRender = () => {
    const addProduct = this.props.config.addProduct ? (
      <button
        className={`${Styles["btn"]} ${Styles["btn-create"]} ${Styles["btn-create--offset-bottom"]}`}
        onClick={this.props.openAddProductPopup}
      >
        {t("Add product")}
      </button>
    ) : null;

    const saveChange = this.props.config.saveChanges ? (
      <button
        onClick={this.props.saveChange}
        className={`${Styles["btn"]} ${Styles["btn-save"]} ${Styles["btn-save--offset-bottom"]}`}
      >
        {t("Save changes")}
      </button>
    ) : null;
    const createList = this.props.config.createList ? (
      <button
        onClick={this.props.onCreateShoppingList}
        className={`${Styles["btn"]} ${Styles["btn-save"]} ${Styles["btn-save--offset-bottom"]}`}
      >
        {t("Create shopping list")}
      </button>
    ) : null;

    const endShopping = this.props.config.endShopping ? (
      <button
        className={`${Styles["btn"]} ${Styles["btn-save"]} ${Styles["btn-save--offset-bottom"]}`}
        onClick={() => this.props.changePopup({ visibility: true })}
      >
        {t("End shopping")}
      </button>
    ) : null;

    const editShopping = this.props.config.editShopping ? (
      <button
        className={`${Styles["btn"]} ${Styles["btn-save"]} ${Styles["btn-save--offset-bottom"]}`}
        onClick={this.props.onEditShoppingList}
      >
        {t("Save changes for shopping list")}
      </button>
    ) : null;

    // return `${addProduct} ${saveChange}`
    return (
      <div className={Styles["bottom-btn-group"]}>
        {addProduct} {saveChange} {createList} {endShopping} {editShopping}
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>{this.buttonRender()}</React.Fragment>
      //   <div className={Styles["bottom-btn-group"]}>
      //     1111111111
      //     {this.buttonRender()}
      //     {/* <button
      //       className={`${Styles["btn"]} ${Styles["btn-create"]}`}
      //       onClick={() => this.props.changePopup({ visibility: true })}
      //     >
      //       {t("Add product")}
      //     </button>
      //     <button
      //       onClick={this.saveChange}
      //       className={`${Styles["btn"]} ${Styles["btn-save"]}`}
      //     >
      //       {t("Save changes")}
      //     </button>
      //     {this.props.isShoppingList ? (
      //       <button
      //         onClick={this.createShoppingList}
      //         className={`${Styles["btn"]} ${Styles["btn-save"]}`}
      //       >
      //         {t("Create shopping list")}
      //       </button>
      //     ) : null} */}
      //   </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProductsList: state.appData.users.userProductsList,
    userId: state.appData.users.objectId,
    userShoppingList: state.appData.users.userShoppingLists,
  };
}

export default connect(mapStateToProps, {
  changePopup,
  changeLoading,
  changeProductList,
  // addProductToList,
  // createNewProductList,
  // updateShoppingListInUserData,
})(BottomActionBtn);
