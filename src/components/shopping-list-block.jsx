import React, { Component } from "react";
import { connect } from "react-redux";
import { changeLoading } from "../store/appConfigData";
import { setActiveListId } from "../store/shoppingList";
import {
  updateShoppingListInUserData,
  deleteProductList,
} from "./../store/userInfo";
import "../css/button.css";
import Styles from "../css/shopping-lists.module.css";
import { t } from "i18next";
import { Link } from "react-router-dom";

class ShoppingListBlock extends Component {
  formattingDate(date) {
    const moonLanding = new Date(date);
    return <div className={Styles.timeEdit}>{moonLanding.toUTCString()}</div>;
  }

  render() {
    const { list } = this.props;
    const { id, title, lastEdit } = list;

    return (
      <div className={Styles.list}>
        <div className={Styles.content}>
          <Link to={`/shopping-list/${id}`} className={Styles["content-body"]}>
            <div className={Styles.title}>{title}</div>
            {this.formattingDate(lastEdit)}
          </Link>

          <div className={Styles["btn-group"]}>
            <Link
              to={`/edit-shopping-list?${id}`}
              className="btn btn-edit btn-link"
              onClick={(e) =>
                this.props.onOpenShoppingList(
                  e,
                  id,
                  `/edit-shopping-list?${id}`
                )
              }
            >
              {t("Edit")}
            </Link>
            <button
              className="btn btn-delete"
              onClick={(e) => this.props.onDeleteShoppingList(e, id)}
            >
              {t("Delete")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userShoppingListId: state.appData.shoppingList.activeListId,
    shoppingList: state.appData.shoppingList.activeShoppingList,
    userId: state.appData.users.objectId,
    userShoppingList: state.appData.users.userShoppingLists,
  };
}

export default connect(mapStateToProps, {
  setActiveListId,
  updateShoppingListInUserData,
  deleteProductList,
  changeLoading,
})(ShoppingListBlock);
