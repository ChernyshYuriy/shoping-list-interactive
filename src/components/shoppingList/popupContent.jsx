import React from "react";
import { Link } from "react-router-dom";
import { t } from "i18next";

function PopupContent(props) {
  // /activePopup, presentSelectedProducts
  const addProduct = (
    <form
      id="add-product-form"
      className="form"
      onSubmit={(e) =>
        this.state.editingProductId
          ? this.saveEditProductResults(e)
          : this.onAddProduct(e)
      }
    >
      <input id="product_name" type="text" placeholder="Name product" />
      <input id="product_desc" type="text" placeholder="Description" />
      {this.state.popupValidation}
      {this.state.editingProductId ? (
        <button className="">Edit</button>
      ) : (
        <button className="">Add product</button>
      )}
    </form>
  );

  const endShopping = (
    <React.Fragment>
      <div>
        <span>
          {t("Not taken products")}
          {
            `${(props.presentSelectedProducts * 100).toFixed(2)}%`
            // (selectedProducts.length / this.state.productList.length)
          }
        </span>
        <Link to="/">{t("main page")}</Link>
      </div>

      {/* {dontSelectedProducts.map((product) => {
            return <div key={product.id}>{product.title}</div>;
          })} */}
    </React.Fragment>
  );

  return props.activePopup !== 'addProduct' ? endShopping : addProduct;
}

// popupContent = () => {
//     // const { selectedProducts, dontSelectedProducts } =
//     //   this.productsSplicedByStatus();

//     return (

//     );
//   };

export default PopupContent;
