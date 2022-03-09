import React, { Component } from "react";
import "../../css/dropDown.css";

class DropDown extends Component {
  render() {
    return (
      <div className={`drop-down drop-down${this.props.status?'--open':'--close'}`}>
          {this.props.list.map((item) => {
            return (
              <div
              className="drop-down__item"
                key={item[this.props.idKey]}
                onClick={() => this.props.clickEvent(item[this.props.idKey])}
              >
                {item[this.props.titleKey]}
              </div>
            );
          })}
      </div>
    );
  }
}

export default DropDown;
