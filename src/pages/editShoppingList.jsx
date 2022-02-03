import React, { Component } from "react";
import ProductsListEdit from "../components/productsListEdit";
class EditShoppingList extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductsListEdit
          config={{
            showTitle: true,
            editTitle: true,
            combineActiveShoppingList: true,
            showCheckbox: true,
            // dividedByStatus: true,
            activeButtons: {
              editShopping: true,
            },
          }}
          list={this.props.activeShoppingList}
        />
      </React.Fragment>
    );
  }
}

export default EditShoppingList;
