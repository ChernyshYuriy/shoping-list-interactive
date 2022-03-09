import React, { Component } from "react";
import { connect } from "react-redux";
import ProductsListEdit from "../components/productsListEdit";
// import Checkbox from '../components/ui/checkbox';
// import shoppingList from './../store/shoppingList';
class ShoppingList extends Component {
  // componentDidMount(){
  //     console.log(window.location, 'window.location');
  // }
  render() {
    return (
      <React.Fragment>
        {/* <ProductsListEdit
          config={{ isShoppingList: true }}
          list={this.props.activeShoppingList}
        /> */}
        <ProductsListEdit
          lang={this.props.language}
          config={{
            showTitle: true,
            editTitle: false,
            useActiveShoppingList: true,
            showCheckbox: true,
            dividedByStatus: true,
            activeButtons: {
              endShopping: true,
            },
          }}
          list={this.props.activeShoppingList}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeShoppingList: state.appData.shoppingList.activeShoppingList,
    language: state.appConfig.language,
  };
}

export default connect(mapStateToProps)(ShoppingList);
