import React, { Component } from "react";
import ProductListEdit from "../components/productsListEdit";

class EditProducts extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductListEdit
          config={{
            showTitle: false,
            editTitle: false,
            showProductActions: true,
            activeButtons: {
              addProduct: true,
              saveChanges: true,
            },
          }}
        />
      </React.Fragment>
    );
  }
}

export default EditProducts;
