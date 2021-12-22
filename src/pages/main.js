import React, { Component } from "react";
import { connect } from "react-redux";
import LoginUser from "../components/loginUser";
import ShoppingListDisplay from "../components/shoping-list-display";
class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <LoginUser />
        {/* {this.props.userNickName ? this.props.userNickName : null}{" "} */}
        <ShoppingListDisplay />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.appData.users.objectId,
    userNickName: state.appData.users.nickName,
  };
}

export default connect(mapStateToProps)(MainPage);
