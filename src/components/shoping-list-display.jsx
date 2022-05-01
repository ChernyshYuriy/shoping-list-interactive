import React, { Component } from "react";
import { connect } from "react-redux";
import {
  // createList,
  updateShoppingListInUserData,
  deleteProductList,
} from "../store/userInfo";

import Styles from "../css/shopping-lists.module.css";
import { Link } from "react-router-dom";
// import { getShoppingList } from "../store/shoppingList";
import ShoppingListBlock from "./shopping-list-block";
import { t } from "i18next";
import { changeLoading } from "../store/appConfigData";
import { setActiveListId, getShoppingList } from "../store/shoppingList";

class ShoppingListDisplay extends Component {
  // const nav = useNavigate();

  // changePage = (isEditList, id = null) =>  {
  //   alert(isEditList);
  //   nav(isEditList);
  // }
  // handleCreateList = () => {
  //     this.props.createList()
  // }
  // handlerCreateNewList = () => {};

  // handlerOpenShoppingList = async (id) => {
  //   // await this.props.getShoppingList({method: 'equalTo', data: id})
  //   // const nav = this.props.useNavigate();
  // };
  // componentDidMount () {
  // }

  state = {
    nextPageUrl: "/",
  };

  // componentDidMount() {
  //   console.log(this.props.list, this.props.id, "this.props.list");
  // }
  async componentDidUpdate(prevProps) {
    if (
      prevProps.shoppingList !== this.props.shoppingList &&
      !!this.props.shoppingList.length
    ) {
      // console.log(
      //   this.state.nextPageUr,
      //   this.props.shoppingList,
      //   "this.props.shoppingList 111111111"
      // );
      // console.log(
      //   this.props.userShoppingListId,
      //   this.state.nextPageUrl,
      //   "changeID"
      // );
      // console.log(history, 'history');
      // await history.push(`/product-list?listId=${this.props.userShoppingListId}`)
      // let id = !this.state.nextPageIsEdit ? this.props.userShoppingListId : "";
      // console.log("REDIRECT");
      // alert("!!!!!" + this.state.nextPageUrl);


      // this.props.nav(this.state.nextPageUrl);
      
      
      // console.log("REDIRECT END");
    }
    // if (prevProps !== this.props) {
    //   console.log(this.props.shoppingList, "this.props");
    // }
    if (prevProps.userShoppingList !== this.props.userShoppingList) {
      console.log("userShoppingList IS CHANGED");
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
  }

  deleteShoppingList = async (e, id) => {
    e.stopPropagation(); //  this.props.updateShoppingListInUserData(this.props.userId, {userShoppingLists: []})
    try {
      await this.props.changeLoading({
        status: true,
        message: "attach to account shopping list",
      });

      await this.props.deleteProductList(id);
      await this.props.changeLoading({
        status: true,
        message: "attach to account shopping list",
      });

      await this.props.updateShoppingListInUserData(this.props.userId, {
        userShoppingLists: this.props.userShoppingList.filter(
          (list) => list.id !== id
        ),
      });
    } finally {
      // this.props.changeLoading({ status: false, message: "Data_processing" });
    }
  };

  handlerOpenShoppingList = async (e, id, url) => {
    // console.log(e, "event");
    // new Promise((resolve) => {    });
    e.stopPropagation();
    // await dispatch(
    await this.setState({ nextPageUrl: url });
    // alert(this.state.nextPageUrl);
    await this.props.changeLoading({
      status: true,
      message: "attach to account shopping list",
    });
    await this.props.setActiveListId(id);

    await this.props.getShoppingList([
      { method: "equalTo", data: id, key: "objectId" },
    ]);
    // );
    // console.log(dispatch(setActiveListId(id)));
  };

  render() {

    return (
      <React.Fragment>
        <div className={Styles["lists-grid"]}>
          <div className={Styles.list}>
            <Link
              to={"/create-product-list"}
              className={`${Styles.content} ${Styles["content--offset-bottom"]} ${Styles.title}`}
            >
              <div className={Styles["icon-cross"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="50px"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 50 50"
                  width="50px"
                >
                  <rect fill="none" height="50" width="50" />
                  <line
                    fill="none"
                    stroke="#000000"
                    // stroke-miterlimit="10"
                    // stroke-width="4"
                    x1="9"
                    x2="41"
                    y1="25"
                    y2="25"
                  />
                  <line
                    fill="none"
                    stroke="#000000"
                    // stroke-miterlimit="10"
                    // stroke-width="4"
                    x1="25"
                    x2="25"
                    y1="9"
                    y2="41"
                  />
                </svg>
              </div>
              <div>{t("Create new list")}</div>
            </Link>
          </div>

          {/* <div className="list">Create new list</div>
    
            <div className="list">Create new list</div>
    
            <div className="list">Create new list</div>
    
            <div className="list">Create new list</div>
    
            <div className="list">Create new list</div>
    
            <div className="list">Create new list</div> */}

          {/* <div>{this.props.userShoppingListId}</div> */}
          {this.props.userShoppingList
            ? this.props.userShoppingList.map((list) => {
                return (
                  <div key={list.id}>
                    <ShoppingListBlock
                      lang={this.props.language}
                      key={list.id}
                      onDeleteShoppingList={this.deleteShoppingList}
                      onOpenShoppingList={this.handlerOpenShoppingList}
                      list={list}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </React.Fragment>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     userShoppingList: state.appData.users.userShoppingLists,
//   };
// }

// export default connect(mapStateToProps, {
//   createList,
//   // getShoppingList,
// })(ShoppingListDisplay);
function mapStateToProps(state) {
  return {
    userShoppingListId: state.appData.shoppingList.activeListId,
    shoppingList: state.appData.shoppingList.activeShoppingList,
    userId: state.appData.users.objectId,
    userShoppingList: state.appData.users.userShoppingLists,
    language: state.appConfig.language,
  };
}
export default connect(mapStateToProps, {
  changeLoading,
  updateShoppingListInUserData,
  deleteProductList,
  setActiveListId,
  getShoppingList,
})(ShoppingListDisplay);
