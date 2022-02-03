import React, { Component } from "react";
import ProductListEdit from "../components/productsListEdit";

class CreateProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductListEdit
          config={{
            showTitle: true,
            editTitle: true,
            showCheckbox: true,
            activeButtons: {
              addProduct: true,
              saveChanges: true,
              createList: true
            },
          }}
        />
      </React.Fragment>
    );
  }
}

export default CreateProductList;
