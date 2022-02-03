import React, { Component } from "react";
import { connect } from "react-redux";
import LoginUser from "../components/loginUser";
import ShoppingListDisplay from "../components/shoping-list-display";
import { changePopup } from "../store/appConfigData";
import ShoppingListContainer from './../components/shoping-lists-container';
class MainPage extends Component {
  componentDidMount(){
    console.log(this.props.userId, 'this.props.userId');
    if (this.props.userId) {
      this.props.changePopup({ visibility: false });
    }
  }
  render() {
    return (
      <div className="main-page">
        <LoginUser />
        {/* {this.props.userNickName ? this.props.userNickName : null}{" "} */}
        <ShoppingListContainer />
        {/* <ShoppingListDisplay userShoppingList={this.props.userShoppingList} /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.appData.users.objectId,
    userNickName: state.appData.users.nickName,
    userShoppingList: state.appData.users.userShoppingLists,
  };
}

export default connect(mapStateToProps, { changePopup })(MainPage);
