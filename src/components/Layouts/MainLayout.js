import React, { Component } from "react";
import AppHeader from "./header";
import '../../css/mainLayout.css'

class MainLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <AppHeader></AppHeader>
        <div className="container">{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default MainLayout;
