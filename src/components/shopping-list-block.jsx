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
import { setActiveListId, getShoppingList } from "../store/shoppingList";
import {
  updateShoppingListInUserData,
  deleteProductList,
} from "./../store/userInfo";
import Styles from "../css/shopping-lists.module.css";

class ShoppingListBlock extends Component {
  // .then(this.props.history.push(`/product-list?listId=${id}`));

  formattingDate(date) {
    const moonLanding = new Date(date);
    return <div className={Styles.timeEdit}>{moonLanding.toUTCString()}</div>;
  }

  render() {
    const { onOpenShoppingList, onDeleteShoppingList, list } = this.props;
    const { id, title, lastEdit } = list;

    return (
      <div className={Styles.list}>
        <div
          className={Styles.content}
          onClick={(e) => onOpenShoppingList(e, id, `/shopping-list?${id}`)}
        >
          <div className={Styles.title}>{title}</div>
          {this.formattingDate(lastEdit)}
          <div className={Styles["btn-group"]}>
            <button
            className={`${Styles.btn} ${Styles['btn-edit']}`}
              onClick={(e) =>
                onOpenShoppingList(e, id, `/edit-shopping-list?${id}`)
              }
            >
              Edit
            </button>
            <button
            className={`${Styles.btn} ${Styles['btn-delete']}`} onClick={(e) => onDeleteShoppingList(e, id)}>Delete</button>
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
  getShoppingList,
  setActiveListId,
  updateShoppingListInUserData,
  deleteProductList,
  changeLoading,
})(ShoppingListBlock);
