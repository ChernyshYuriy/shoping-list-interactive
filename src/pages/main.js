import React, { Component } from "react";
import { connect } from "react-redux";
import LoginUser from "../components/loginUser";
class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <LoginUser />
        {this.props.userNickName ? this.props.userNickName : null}{" "}
        saffsafas safsa 
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
