// function ShoppingListBlock(props) {
//   //   to={}
//   const nav = useNavigate();
//   const dispatch = useDispatch();

//   // const handlerOpenShoppingList = async (id) => {
//   //   // await dispatch(
//   //   //   await getShoppingList([{ method: "equalTo", data: id, key: "objectId" }])
//   //   // );
//   //   await dispatch(await setActiveListId(id));

//   //   await nav(`/product-list?listId=${props.id}`);
//   // };

//   const handlerOpenShoppingList = (id) =>
//     new Promise((resolve, reject) => {
//       // await dispatch(
//       //   await getShoppingList([{ method: "equalTo", data: id, key: "objectId" }])
//       // );
//       // console.log(dispatch(setActiveListId(id)));
//       dispatch(setActiveListId(id));
//       resolve();
//     }).then(nav(`/product-list?listId=${id}`));

//   return (
//     <div
//       onClick={() => handlerOpenShoppingList(props.id)}
//       key={props.id}
//       className="list"
//     >
//       {props.id}
//     </div>
//   );
// }

// export default ShoppingListBlock;

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
  // .then(this.props.history.push(`/product-list?listId=${id}`));

  formattingDate(date) {
    const moonLanding = new Date(date);
    return <div className={Styles.timeEdit}>{moonLanding.toUTCString()}</div>;
  }

  render() {
    const { list } = this.props;
    const { id, title, lastEdit } = list;

    return (
      <div className={Styles.list}>
        <div
          className={Styles.content}
          // onClick={(e) => onOpenShoppingList(e, id, `/shopping-list?${id}`)}
        >
          <Link to={`/shopping-list/${id}`} className={Styles['content-body']}>
            <div className={Styles.title}>{title}</div>
            {this.formattingDate(lastEdit)}
          </Link>

          <div className={Styles["btn-group"]}>
            <Link
            to={`/edit-shopping-list?${id}`}
              className="btn btn-edit btn-link"
              // onClick={(e) =>
              //   onOpenShoppingList(e, id, `/edit-shopping-list?${id}`)
              // }
            >
              {t("Edit")}
            </Link>
            <button
              className="btn btn-delete"
              // onClick={(e) => onDeleteShoppingList(e, id)}
            >
              {t("Delete")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// ShoppingListBlock.propTypes = {};

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
