import React, { Component } from "react";
import { connect } from "react-redux";
import { createList } from "../store/userInfo";
import '../css/shopping-list-display.css'

class ShoppingListDisplay extends Component {
  // handleCreateList = () => {
  //     this.props.createList()
  // }

  render() {
    return (
      <React.Fragment>
        <div className="lists-grid">
          <div className="list">Create new list</div>
          <div className="list">Create new list</div>

          <div className="list">Create new list</div>

          <div className="list">Create new list</div>

          <div className="list">Create new list</div>

          <div className="list">Create new list</div>

          <div className="list">Create new list</div>

          {/* <div>{this.props.userShoppingListId}</div> */}
          {this.props.userShoppingList
            ? this.props.userShoppingList.map((list) => {
                return <div>{list.title}</div>;
              })
            : null}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userShoppingList: state.appData.users.userShoppingLists,
  };
}

export default connect(mapStateToProps, {
  createList,
})(ShoppingListDisplay);
